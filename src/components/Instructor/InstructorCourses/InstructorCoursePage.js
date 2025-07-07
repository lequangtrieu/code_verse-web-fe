import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { formatCurrency } from "../../../common/helper";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { Form, Modal, message, Pagination, Input, Select, Progress, Tag, Table, Image, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment/moment";

const { Option } = Select;

const InstructorCoursesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRedirectToCreate = () => {
        navigate('/instructor-panel/courses/create');
    };

    const isCreatePage = location.pathname === '/instructor-panel/courses/create';
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingLearner, setLoadingLearner] = useState(true);
    const [learners, setLearners] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const user = useSelector((state) => state?.user?.user);

    const course_columns = [
        {
            title: "Image",
            dataIndex: "thumbnailUrl",
            key: "thumbnail",
            render: (url, record) => (
                <Image
                    width={80}
                    height={80}
                    src={url || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                    alt={record.title}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                />
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            align: "center",
            render: (price) => price === 0 ? <Tag color="green">Free</Tag> : formatCurrency(price),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "default";
                if (status === "PUBLISHED") color = "blue";
                else if (status === "DRAFT" || status === "PENDING") color = "red";

                return (
                    <Tag color={color} className="font-semibold">
                        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="space-x-2">
                    <Button
                        type="primary"
                        className="bg-yellow-400 hover:bg-yellow-500"
                        onClick={() => handleViewDetail(record.id)}
                    >
                        View Detail
                    </Button>
                    <Button
                        type="primary"
                        className="bg-yellow-400 hover:bg-yellow-500"
                        onClick={() => {
                            setSelectedCourse(record);
                            handleViewLearners(record.id);
                        }}
                    >
                        View Learners
                    </Button>
                </div>
            ),
        },
    ];

    const learner_columns = [
        {
            title: "Learner",
            dataIndex: ["learner", "name"],
            key: "name",
        },
        {
            title: "Completion",
            dataIndex: "completionPercentage",
            key: "completionPercentage",
            render: (val) => <Progress percent={Math.round(val || 0)} />,
        },
        {
            title: "Exp Gained",
            dataIndex: "totalExpGained",
            key: "exp",
        },
        {
            title: "Enrolled at",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (val) => moment(val).format("YYYY-MM-DD HH:mm"),
        },
        {
            title: "Last studied at",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (val) => moment(val).format("YYYY-MM-DD HH:mm"),
        },
        {
            title: "Completed at",
            dataIndex: "completedAt",
            key: "completedAt",
            render: (val) =>
                val ? (
                    <Tag color="green">{moment(val).format("YYYY-MM-DD")}</Tag>
                ) : (
                    <Tag color="default">In Progress</Tag>
                ),
        },
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line
    }, [searchQuery, selectedCategory, selectedStatus, courses]);

    const fetchCourses = async () => {
        try {
            const result = await axiosInstance.get(commonApi.instructorCourses.url, {
                params: { username: user.username },
            });
            setCourses(result.data.result);
        } catch (error) {
            message.error("Error when fetching course data.");
            setCourses([]);
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    const applyFilters = () => {
        let filtered = [...courses];

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((course) =>
                (course.title + course.description).toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== "all") {
            filtered = filtered.filter((course) => course.category === selectedCategory);
        }

        if (selectedStatus === "published") {
            filtered = filtered.filter((course) => course.status === "PUBLISHED");
        }
        if (selectedStatus === "draft") {
            filtered = filtered.filter((course) => course.status === "DRAFT");
        }
        if (selectedStatus === "pending") {
            filtered = filtered.filter((course) => course.status === "PENDING");
        }

        setTimeout(() => {
            setFilteredCourses(filtered);
        }, 500);
        setCurrentPage(1);
    };

    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const uniqueCategories = [...new Set(courses.map((c) => c.category))];

    const handleViewDetail = (courseId) => {
        navigate(`/instructor-panel/courses/${courseId}`);
    };

    const handleViewLearners = async (courseId) => {
        setIsModalOpen(true);
        setLoadingLearner(true);
        try {
            const result = await axiosInstance.get(commonApi.getLearners.url(courseId));
            setLearners(result.data.result);
        } catch (error) {
            message.error("Fetch data error.");
        } finally {
            setTimeout(() => {
                setLoadingLearner(false);
            }, 500);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Courses</h2>
            <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

            {!isCreatePage && (
                <div className="flex gap-4 mb-6">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={handleRedirectToCreate}
                    >
                        Create Course
                    </button>
                </div>
            )}
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                <Input
                    placeholder="Search by title or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                />
                <Select
                    placeholder="Filter by category"
                    className="w-52"
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                >
                    <Option value="all">All Categories</Option>
                    {uniqueCategories.map((cat) => (
                        <Option key={cat} value={cat}>{cat}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Filter by status"
                    className="w-52"
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                >
                    <Option value="all">All Status</Option>
                    <Option value="published">Published</Option>
                    <Option value="draft">Draft</Option>
                    <Option value="pending">Pending</Option>
                </Select>
            </div>
            {initialLoading && <LoadingOverlay />}
            <Table
                dataSource={paginatedCourses}
                columns={course_columns}
                rowKey="id"
                pagination={false}
            />

            <div className="flex justify-end mt-4">
                <Pagination
                    current={currentPage}
                    total={filteredCourses.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div>

            <Modal title={selectedCourse?.title}
                open={isModalOpen}
                onCancel={() => {setLearners([]); setIsModalOpen(false);}}
                footer={null}
                width={800}
                centered>
                <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                    <Table
                        dataSource={learners}
                        columns={learner_columns}
                        rowKey={(record) => record.learner?.id}
                        loading={loadingLearner}
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </Modal>


        </div>
    );
};

export default InstructorCoursesPage;
