import {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Divider, message, Modal, Row, Select, Statistic, Table, Tag} from "antd";
import {BookOutlined, DollarOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import RequestWithdrawalModal from "./RequestWithdrawalModal";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";

const {RangePicker} = DatePicker;

export function ManageBalanceDashboard() {
    const user = useSelector((state) => state?.user?.user);
    const instructorId = user?.id;

    const [withdrawals, setWithdrawals] = useState([]);
    const [incomeDetails, setIncomeDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const [totalEarning, setTotalEarning] = useState(0);
    const [instructorEarning, setInstructorEarning] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [hasPending, setHasPending] = useState(false);

    useEffect(() => {
        if (instructorId) {
            fetchData();
        }
    }, [instructorId]);

    useEffect(() => {
        filterWithdrawals();
        filterIncome();
    }, [selectedStatus, selectedCourse, selectedDateRange]);

    const fetchData = async () => {
        setLoading(true);
        try {
            console.log("Fetching for instructorId:", instructorId);

            // Gọi API lấy lịch sử rút tiền
            const withdrawRes = await axiosInstance.get(commonApi.withdrawal.getMyRequests.url(instructorId));
            const rawWithdrawals = withdrawRes.data;

            const withdrawals = rawWithdrawals.map(w => ({
                id: w.id,
                amount: w.amount,
                status: w.status,
                date: dayjs(w.createdAt).format("YYYY-MM-DD"),
                note: w.adminNote || ""
            }));

            const hasPendingRequest = rawWithdrawals.some(
                w => w.status === "PENDING" || w.status === "NEED_VERIFY"
            );

            setWithdrawals(withdrawals);
            setFilteredWithdrawals(withdrawals);
            setHasPending(hasPendingRequest);

            // Gọi API lấy thu nhập
            const incomeRes = await axiosInstance.get(commonApi.instructor.income.url(instructorId));
            const income = incomeRes.data.map(i => ({
                ...i,
                date: dayjs(i.date).format("YYYY-MM-DD")
            }));

            const total = income.reduce((sum, item) => sum + item.amount, 0);
            const instructorTotal = total * 0.7;

            // ⚠️ Sử dụng rawWithdrawals thay vì withdrawals (state chưa được cập nhật ngay)
            const withdrawnTotal = rawWithdrawals
                .filter(w => w.status === "APPROVED")
                .reduce((sum, w) => sum + w.amount, 0);

            setIncomeDetails(income);
            setFilteredIncome(income);
            setTotalEarning(total);
            setInstructorEarning(instructorTotal);
            setCurrentBalance(instructorTotal - withdrawnTotal);
        } catch (err) {
            console.error("❌ Error fetching instructor dashboard data:", err);
            message.error("Failed to load instructor dashboard data.");
        } finally {
            setLoading(false);
        }
    };


    const filterWithdrawals = () => {
        let data = [...withdrawals];
        if (selectedStatus) {
            data = data.filter(w => w.status === selectedStatus);
        }
        setFilteredWithdrawals(data);
    };

    const filterIncome = () => {
        let data = [...incomeDetails];
        if (selectedCourse) {
            data = data.filter(i => i.courseId === selectedCourse);
        }
        if (selectedDateRange) {
            const [start, end] = selectedDateRange;
            data = data.filter(i => {
                const d = dayjs(i.date);
                return d.isAfter(start.subtract(1, "day")) && d.isBefore(end.add(1, "day"));
            });
        }
        setFilteredIncome(data);
    };

    const handleCancelRequest = (requestId) => {
        Modal.confirm({
            title: "Cancel Withdrawal Request",
            content: `Are you sure you want to cancel request #${requestId}?`,
            okText: "Yes, Cancel",
            cancelText: "No",
            okType: "danger",
            onOk: async () => {
                try {
                    await axiosInstance.delete(commonApi.withdrawal.cancelRequest.url(instructorId, requestId));
                    message.success("Cancelled successfully.");
                    fetchData();
                } catch {
                    message.error("Failed to cancel.");
                }
            }
        });
    };

    const withdrawalColumns = [
        {title: "Date", dataIndex: "date", key: "date"},
        {
            title: "Amount (₫)",
            dataIndex: "amount",
            key: "amount",
            render: (amt) => amt.toLocaleString("vi-VN")
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (s) => {
                const map = {APPROVED: "green", REJECTED: "red", PENDING: "blue", "NEED VERIFY": "orange"};
                return <Tag color={map[s] || "default"}>{s}</Tag>;
            }
        },
        {title: "Note", dataIndex: "note", key: "note"},
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                ["PENDING", "NEED_VERIFY"].includes(record.status) ? (
                    <Button danger size="small" onClick={() => handleCancelRequest(record.id)}>Cancel</Button>
                ) : null
        }
    ];

    const incomeColumns = [
        {title: "Date", dataIndex: "date", key: "date"},
        {title: "Course", dataIndex: "courseTitle", key: "courseTitle"},
        {title: "Learner", dataIndex: "learner", key: "learner"},
        {
            title: "Amount (₫)",
            dataIndex: "amount",
            key: "amount",
            render: (amt) => (amt * 0.7).toLocaleString("vi-VN")
        }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Earnings Dashboard</h2>
            <Divider className="!mt-2 !mb-4 border-pink-500"/>

            <div className="flex justify-end">
                <Button type="primary" onClick={() => {
                    if (hasPending) {
                        message.warning("You already have a pending request.");
                    } else {
                        setShowModal(true);
                    }
                }}>
                    Request Withdrawal
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                {[{
                    title: "Total Course Revenue", value: totalEarning, color: "#000"
                }, {
                    title: "Instructor's Income (70%)", value: instructorEarning, color: "#3f8600"
                }, {
                    title: "Current Available Balance", value: currentBalance, color: "#1890ff"
                }].map((stat, i) => (
                    <Col xs={24} md={8} key={i}>
                        <Card loading={loading} className="shadow-md border border-gray-200 rounded-xl">
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={<DollarOutlined/>}
                                valueStyle={{color: stat.color}}
                                formatter={v => `${Number(v).toLocaleString("vi-VN")} ₫`}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card title="Withdrawal History" className="shadow-md" loading={loading}
                  extra={
                      <Select
                          placeholder="Filter by Status"
                          allowClear
                          value={selectedStatus}
                          onChange={setSelectedStatus}
                          style={{width: 180}}
                          options={["PENDING", "NEED_VERIFY", "APPROVED", "REJECTED"].map(s => ({value: s, label: s}))}
                      />
                  }>
                <Table dataSource={filteredWithdrawals} columns={withdrawalColumns}
                       rowKey="id" pagination={{pageSize: 5}}/>
            </Card>

            <Card title="Course Income Detail" className="shadow-md" loading={loading}
                  extra={
                      <div className="flex flex-wrap gap-2">
                          <Select
                              placeholder="Filter by Course"
                              allowClear
                              value={selectedCourse}
                              onChange={setSelectedCourse}
                              style={{width: 200}}
                              suffixIcon={<BookOutlined/>}
                              options={[...new Set(incomeDetails.map(i => i.courseTitle))].map(title => {
                                  const course = incomeDetails.find(i => i.courseTitle === title);
                                  return {label: title, value: course.courseId};
                              })}
                          />
                          <RangePicker onChange={setSelectedDateRange}/>
                      </div>
                  }>
                <Table dataSource={filteredIncome} columns={incomeColumns}
                       rowKey={(r, i) => `${r.courseId}-${r.date}-${i}`} pagination={{pageSize: 5}}/>
            </Card>

            <RequestWithdrawalModal
                open={showModal}
                onClose={() => setShowModal(false)}
                currentBalance={currentBalance}
                hasPending={hasPending}
                instructorId={instructorId}
            />
        </div>
    );
}
