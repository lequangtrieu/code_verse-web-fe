import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, Input, message, notification, Pagination, Select, Tag,} from "antd";
import {useNavigate} from "react-router-dom";
import scrollTop from "../../../config/scrollTop";
import LoadingOverlay from "../../../common/LoadingOverlay";
import axios from "axios";
import commonApi from "../../../common/api";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import Context from "../../../config/context/context";
import "../Courses/Courses.css";
import {formatDuration, getDiscountedPrice} from "../../../common/helper";
import {logoutUser} from "../../../config/store/userSlice";
import CourseCarousel from "./CourseCarousel";
import CourseList from "./CourseList";
import SidebarFilter from "./SidebarFilter";
import {SearchOutlined} from "@ant-design/icons";
import useDocumentTitle from "../../../common/useDocumentTitle";

const {Search} = Input;
const {Option} = Select;

const Courses = () => {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartCourseIds, setCartCourseIds] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [sortByPrice, setSortByPrice] = useState("none");
    const [sortByRating, setSortByRating] = useState("none");
    const [tempSearchQuery, setTempSearchQuery] = useState("");

    const user = useSelector((state) => state?.user?.user);
    const {fetchCartDetail, fetchCartItems} = useContext(Context);

    useDocumentTitle("Courses - CodeVerse");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCourse = await axios.get(commonApi.course.url);
                const responseCategory = await axios.get(commonApi.category.url);

                const courses = responseCourse.data.result || [];
                const cats = responseCategory.data.result || [];

                setAllCourses(courses);
                setCategories(["all", ...new Set(cats.map((cat) => cat.name))]);
                setFilteredCourses(courses);
            } catch (error) {
                message.error("Failed to fetch courses or categories");
            } finally {
                setTimeout(() => {
                    setInitialLoading(false);
                }, 450);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let results = allCourses;

        if (searchQuery) {
            results = results.filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (selectedCategory) {
            results = results.filter((course) => course.category === selectedCategory);
        }

        if (selectedRatings.length > 0) {
            results = results.filter((course) =>
                selectedRatings.some((r) => course.rating >= r)
            );
        }

        if (selectedDuration) {
            results = results.filter((course) => {
                const duration = course.totalDurations || 0;
                if (selectedDuration === "lt2") return duration < 120;
                if (selectedDuration === "2to10") return duration >= 120 && duration <= 600;
                if (selectedDuration === "gt10") return duration > 600;
                return true;
            });
        }

        if (selectedLevels.length > 0) {
            results = results.filter((course) => selectedLevels.includes(course.level));
        }

        if (selectedLanguages.length > 0) {
            results = results.filter((course) =>
                selectedLanguages.includes(course.language)
            );
        }

        if (selectedPrice) {
            results = results.filter((course) => {
                const discounted = getDiscountedPrice(course.price, course.discount);
                return selectedPrice === "free" ? discounted === 0 : discounted > 0;
            });
        }

        setFilteredCourses(results);
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedRatings, selectedDuration, selectedLevels, allCourses, selectedLanguages, selectedPrice]);

    useEffect(() => {
        setTempSearchQuery(searchQuery);
    }, [searchQuery]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const displayedCourses = useMemo(() => {
        let sorted = [...filteredCourses];

        if (sortByPrice !== "none") {
            sorted.sort((a, b) => {
                const priceA = getDiscountedPrice(a.price, a.discount);
                const priceB = getDiscountedPrice(b.price, b.discount);
                return sortByPrice === "asc" ? priceA - priceB : priceB - priceA;
            });
        }

        if (sortByRating !== "none") {
            sorted.sort((a, b) => {
                return sortByRating === "asc" ? a.rating - b.rating : b.rating - a.rating;
            });
        }

        return sorted.slice(startIndex, endIndex);
    },  [filteredCourses, sortByPrice, sortByRating]);


    const handlePriceChange = (value) => {
        setSelectedPrice((prev) => (prev === value ? null : value));
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings((prev) =>
            prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
        );
    };

    const handleDurationChange = (duration) => {
        setSelectedDuration(duration);
    };

    const handleLevelChange = (level) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((lvl) => lvl !== level) : [...prev, level]
        );
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguages((prev) =>
            prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
        );
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory(null);
        setSelectedRatings([]);
        setSelectedDuration(null);
        setSelectedLevels([]);
        setSelectedLanguages([]);
        setSelectedPrice(null);
    };

    const onPageChange = (page) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const courseSection = document.getElementById("course-section");
            if (courseSection) {
                const offset = courseSection.offsetTop - 80;
                window.scrollTo({top: offset, behavior: "smooth"});
            }
            setCurrentPage(page);
        }, 400);
    };

    const handleCourseClick = (id) => {
        scrollTop();
        navigate(`/course/${id}`);
    };

    const handleSearch = (value) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSearchQuery(value); // trigger useEffect lọc courseList
        }, 500);
    };

    const handleCategoryClick = (key) => {
        setSelectedCategory(key === "all" ? null : key);
    };

    const handleAddToCart = async (course) => {
        if (!user) {
            return notification.warning({
                message: "Login Required",
                description: "Please log in to add courses to your cart.",
                placement: "topLeft",
            });
        }

        const finalPrice = getDiscountedPrice(course.price, course.discount);
        if (finalPrice === 0) {
            return notification.info({
                message: "Free Course",
                description: `"${course.title}" is free and does not need to be added to the cart.`,
                placement: "bottomLeft",
            });
        }

        if (cartCourseIds.includes(course.id)) {
            return notification.info({
                message: "Course Already in Cart",
                description: `"${course.title}" is already in your cart.`,
                placement: "bottomLeft",
            });
        }

        try {
            const response = await axiosInstance.post(commonApi.addToCart.url, {
                username: user.username, courseId: course.id,
            });

            const result = response.data?.result;

            if (result === "Course already in cart") {
                notification.info({
                    message: "Course Already in Cart",
                    description: `"${course.title}" is already in your cart.`,
                    placement: "bottomLeft",
                });
                setCartCourseIds((prev) => [...prev, course.id]);
            } else if (result === "You already own this course") {
                notification.warning({
                    message: "Already Purchased",
                    description: `You have already purchased "${course.title}".`,
                    placement: "bottomLeft",
                });
            } else if (result === "Added to cart successfully") {
                notification.success({
                    message: "Course Added Successfully",
                    description: `"${course.title}" has been added to your cart.`,
                    placement: "bottomLeft",
                });
                fetchCartDetail();
                fetchCartItems();
                setCartCourseIds((prev) => [...prev, course.id]);
            } else if (result === "This course is free and doesn't need to be added to cart") {
                notification.info({
                    message: "Free Course",
                    description: `"${course.title}" is free and doesn't need to be added to the cart.`,
                    placement: "bottomLeft",
                });
            } else {
                notification.error({
                    message: "Failed to Add Course",
                    description: response.data?.message || "Unable to add course to cart. Please try again.",
                    placement: "bottomLeft",
                });
            }
        } catch (error) {
            notification.error({
                message: "Error Adding Course", description: error?.response?.data?.message, placement: "bottomLeft",
            });

            if (error?.response?.data?.code === 1010) {
                dispatch(logoutUser());
                navigate("/");
            }
        }
    };

    const handleAddToCartFree = async (course) => {
        if (!user) {
            return notification.warning({
                message: "Login Required",
                description: "Please log in to add courses to your cart.",
                placement: "topLeft",
            });
        }

        try {
            await axiosInstance.post(commonApi.addToCartFree.url, {
                username: user.username, courseId: course.id,
            });

            notification.success({
                message: "Enrollment Successful",
                description: `You have successfully enrolled in "${course.title}". Enjoy learning!`,
                placement: "bottomLeft",
            });
        } catch (error) {
            notification.error({
                message: "Enrollment Failed", description: error?.response?.data?.message, placement: "bottomLeft",
            });

            if (error?.response?.data?.code === 1010) {
                dispatch(logoutUser());
                navigate("/");
            }
        }
    };

    const renderCoursePopover = (course) => {
        const isFree = getDiscountedPrice(course.price, course.discount) === 0;

        return (<div className="w-80">
            <Tag color="processing" className="mb-1">
                {course.category}
            </Tag>

            <h3 className="text-base font-bold text-gray-800 mb-2">
                {course.title}
            </h3>

            <p className="text-sm text-gray-600 mb-3 line-clamp-4">
                {course.description}
            </p>

            <div className="flex items-center justify-evenly text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                    <span className="font-medium">{course.totalLessons}</span>
                    <span className="text-gray-500">Lessons</span>
                </div>
                <div className="w-px h-4 bg-gray-300 mx-2"></div>
                <div className="flex items-center gap-1">
            <span className="font-medium">
              {formatDuration(course.totalDurations)}
            </span>
                </div>
                <div className="w-px h-4 bg-gray-300 mx-2"></div>
                <div className="flex items-center gap-1">
                    <span className="font-medium">{course.totalStudents || 0}</span>
                    <span className="text-gray-500">Students</span>
                </div>
            </div>

            <ul className="text-sm text-gray-700 list-inside list-disc mb-4 space-y-1">
                <li>Get familiar with Scratch</li>
                <li>Master basic programming thinking</li>
                <li>Create simple and fun projects</li>
                <li>Develop logical thinking and confidence</li>
            </ul>

            {isFree ? (<Button
                type="primary"
                size="small"
                block
                onClick={() => handleAddToCartFree(course)}
            >
                Free Enrollment
            </Button>) : (<div className="flex justify-between">
                <Button
                    size="small"
                    type="primary"
                    className="text-white hover:bg-gray-800"
                    onClick={() => handleAddToCart(course)}
                >
                    Add to Cart
                </Button>
            </div>)}
        </div>);
    };

    return (
        <>
            {(initialLoading || loading) && <LoadingOverlay />}

            {!initialLoading && (
                <>
                    <CourseCarousel />

                    <div id="course-section" className="bg-gray-50 py-16">
                        <div className="max-w-7xl mx-auto px-4 space-y-10">

                            {/* Main Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    <SidebarFilter
                                        searchQuery={searchQuery}
                                        onSearch={handleSearch}
                                        selectedCategory={selectedCategory}
                                        onCategoryChange={handleCategoryClick}
                                        categories={categories}
                                        allCourses={allCourses}
                                        selectedRatings={selectedRatings}
                                        onRatingChange={handleRatingChange}
                                        selectedDuration={selectedDuration}
                                        onDurationChange={handleDurationChange}
                                        selectedLevels={selectedLevels}
                                        onLevelChange={handleLevelChange}
                                        filteredCourses={filteredCourses}
                                        selectedLanguages={selectedLanguages}
                                        onLanguageChange={handleLanguageChange}
                                        selectedPrice={selectedPrice}
                                        onPriceChange={handlePriceChange}
                                        onResetFilters={handleResetFilters}
                                    />
                                </div>

                                {/* Course List + Pagination */}
                                <div className="lg:col-span-3 flex flex-col space-y-6">
                                    {/* Search & Sort Controls */}

                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 flex-wrap">
                                        <Search
                                            placeholder="Search courses..."
                                            enterButton={<SearchOutlined />}
                                            value={tempSearchQuery}
                                            onChange={(e) => setTempSearchQuery(e.target.value)}r
                                            onSearch={handleSearch}
                                            className="w-full lg:w-[40%]"
                                        />

                                        <div className="flex flex-wrap items-start sm:items-center gap-4">
                                            {/* Sort by Rating */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">Sort by Rating:</span>
                                                <Select
                                                    value={sortByRating}
                                                    onChange={setSortByRating}
                                                    className="w-32"
                                                    size="small"
                                                >
                                                    <Option value="none">None</Option>
                                                    <Option value="asc">Low to High</Option>
                                                    <Option value="desc">High to Low</Option>
                                                </Select>
                                            </div>

                                            {/* Sort by Price */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">Sort by Price:</span>
                                                <Select
                                                    value={sortByPrice}
                                                    onChange={setSortByPrice}
                                                    className="w-32"
                                                    size="small"
                                                >
                                                    <Option value="none">None</Option>
                                                    <Option value="asc">Low to High</Option>
                                                    <Option value="desc">High to Low</Option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <CourseList
                                        courses={displayedCourses}
                                        renderCoursePopover={renderCoursePopover}
                                        handleCourseClick={handleCourseClick}
                                    />

                                    <div className="flex justify-center">
                                        <Pagination
                                            current={currentPage}
                                            total={filteredCourses.length}
                                            pageSize={pageSize}
                                            onChange={onPageChange}
                                            className="mt-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );

};

export default Courses;
