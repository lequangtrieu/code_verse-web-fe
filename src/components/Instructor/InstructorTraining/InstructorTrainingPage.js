import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { message, Pagination, Input, Select, Tag, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Option } = Select;

const InstructorTrainingsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRedirectToCreate = () => {
        navigate('/instructor-panel/trainings/create');
    };

    const isCreatePage = location.pathname === '/instructor-panel/trainings/create';
    const [initialLoading, setInitialLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const user = useSelector((state) => state?.user?.user);

    const course_columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: "30%"
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
            width: "15%"
        },
        {
            title: "Language",
            dataIndex: "language",
            key: "language",
            width: "25%"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "default";
                if (status === "TRAINING_PUBLISHED") {
                    status = "Published";
                    color = "blue";
                } 
                else if (status === "TRAINING_DRAFT") {
                    status = "Draft";
                    color = "red";
                }

                return (
                    <Tag color={color} className="font-semibold">
                        {status}
                    </Tag>
                );
            },
            width: "10%"
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="primary"
                    className="flex-1 min-w-[100px]"
                    onClick={() => handleViewDetail(record.id)}
                  >
                    View Detail
                  </Button>
                </div>
              ),              
            width: "20%"
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
    }, [searchQuery, selectedStatus, courses]);

    const fetchCourses = async () => {
        try {
            const result = await axiosInstance.get(commonApi.instructorTrainings.url);
            setCourses(result.data.result);
        } catch (error) {
            message.error("Error when fetching training data.");
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

        if (selectedStatus === "published") {
            filtered = filtered.filter((course) => course.status === "TRAINING_PUBLISHED");
        }
        if (selectedStatus === "draft") {
            filtered = filtered.filter((course) => course.status === "TRAINING_DRAFT");
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

    const handleViewDetail = (courseId) => {
        navigate(`/instructor-panel/trainings/${courseId}`);
    };

    return (
        <div>
            <div className="flex items-center mb-2">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Trainings</h2>
                    <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>
                </div>
                {!isCreatePage && (
                <div className="flex gap-4 mb-6 ml-6">
                    <Button
                        icon={<PlusOutlined />}
                        className="px-4 py-4 text-l"
                        onClick={handleRedirectToCreate}
                    >
                        New
                    </Button>
                </div>
            )}
            </div>
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                <Input
                    placeholder="Search by title or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                />
                <Select
                    placeholder="Filter by status"
                    className="w-52"
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                >
                    <Option value="all">All Status</Option>
                    <Option value="published">Published</Option>
                    <Option value="draft">Draft</Option>
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


        </div>
    );
};

export default InstructorTrainingsPage;
