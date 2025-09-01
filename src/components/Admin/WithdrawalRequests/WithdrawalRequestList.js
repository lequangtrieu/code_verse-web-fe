import { useEffect, useState } from "react";
import {
    Table,
    Tag,
    Select,
    Input,
    DatePicker,
    Card,
    Row,
    Col,
    Button,
    message,
    Modal
} from "antd";
import {
    SearchOutlined,
    CheckOutlined,
    CloseOutlined
} from "@ant-design/icons";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

export function WithdrawalRequestList() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchName, setSearchName] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [dateRange, setDateRange] = useState(null);

    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [currentQrCode, setCurrentQrCode] = useState(null);

    const [actionModal, setActionModal] = useState({
        open: false,
        type: null, // "approve" | "reject"
        request: null
    });
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        filterRequests();
    }, [searchName, statusFilter, dateRange, requests]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const params = {};
            if (searchName) params.name = searchName;
            if (statusFilter) params.status = statusFilter;
            if (dateRange) {
                params.start = dateRange[0].toISOString();
                params.end = dateRange[1].toISOString();
            }

            const res = await axiosInstance.get(commonApi.admin.withdrawals.getAll.url, { params });
            setRequests(res.data);
        } catch (err) {
            message.error("Failed to load withdrawal requests.");
        } finally {
            setLoading(false);
        }
    };

    const filterRequests = () => {
        let data = [...requests];

        if (searchName) {
            data = data.filter((r) =>
                r.instructorName.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (statusFilter) {
            data = data.filter((r) => r.status === statusFilter);
        }

        if (dateRange) {
            const [start, end] = dateRange;
            data = data.filter((r) => {
                const d = dayjs(r.createdAt);
                return d.isAfter(start.subtract(1, "day")) && d.isBefore(end.add(1, "day"));
            });
        }

        setFilteredRequests(data);
    };

    const handleOpenQrModal = (qrUrl) => {
        setCurrentQrCode(qrUrl);
        setIsQrModalOpen(true);
    };

    const handleCloseQrModal = () => {
        setIsQrModalOpen(false);
        setCurrentQrCode(null);
    };

    const openApproveModal = (record) => {
        setActionModal({ open: true, type: "approve", request: record });
    };

    const openRejectModal = (record) => {
        setActionModal({ open: true, type: "reject", request: record });
    };

    const handleActionConfirm = async () => {
        const { type, request } = actionModal;
        try {
            if (type === "approve") {
                await axiosInstance.post(commonApi.admin.withdrawals.approve.url(request.id));
                message.success("✅ Approved successfully");
            } else if (type === "reject") {
                if (!rejectReason.trim()) {
                    message.error("Please enter a reason for rejection.");
                    return;
                }
                await axiosInstance.post(commonApi.admin.withdrawals.reject.url(request.id), {
                    reason: rejectReason
                });
                message.warning("❌ Rejected successfully");
            }
            setActionModal({ open: false, type: null, request: null });
            setRejectReason("");
            fetchRequests();
        } catch (err) {
            message.error("Failed to process the request.");
        }
    };

    const columns = [
        {
            title: "Instructor",
            render: (r) => `${r.instructorName}`
        },
        {
            title: "Amount",
            dataIndex: "amount",
            align: "right",
            render: (amt) => amt.toLocaleString("vi-VN") + " ₫"
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            align: "center",
            render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm")
        },
        {
            title: "Status",
            dataIndex: "status",
            align: "center",
            render: (s) => {
                const map = {
                    APPROVED: "green",
                    PENDING: "blue",
                    REJECTED: "red",
                    CONFIRMED: "green"
                };
                return <Tag color={map[s]}>{s}</Tag>;
            }
        },
        {
            title: "Method",
            dataIndex: "paymentMethod",
            align: "center"
        },
        {
            title: "Note",
            dataIndex: "adminNote",
            render: (note) => note || "N/A",
            align: "center"
        },
        {
            title: "QR Code",
            align: "center",
            render: (_, r) =>
                r.qrCodeUrl ? (
                    <Button type="link" onClick={() => handleOpenQrModal(r.qrCodeUrl)}>
                        View
                    </Button>
                ) : (
                    "N/A"
                )
        },
        {
            title: "Actions",
            align: "center",
            render: (_, r) =>
                r.status === "PENDING" ? (
                    <div className="flex gap-2 justify-center">
                        <Button icon={<CheckOutlined />} type="primary" size="small" onClick={() => openApproveModal(r)}>Approve</Button>
                        <Button icon={<CloseOutlined />} danger size="small" onClick={() => openRejectModal(r)}>Reject</Button>
                    </div>
                ) : null
        }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">💸 Withdrawal Requests</h2>

            <Card className="shadow-md border border-gray-200">
                <Row gutter={[16, 16]} className="mb-4">
                    <Col xs={24} sm={12} md={6}>
                        <Input
                            allowClear
                            placeholder="Search Instructor"
                            prefix={<SearchOutlined />}
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            allowClear
                            placeholder="Status"
                            value={statusFilter}
                            onChange={setStatusFilter}
                            className="w-full"
                        >
                            <Option value="PENDING">PENDING</Option>
                            <Option value="APPROVED">APPROVED</Option>
                            <Option value="REJECTED">REJECTED</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <RangePicker className="w-full" onChange={setDateRange} />
                    </Col>
                </Row>

                <Table
                    dataSource={filteredRequests}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    loading={loading}
                />
            </Card>

            <Modal
                title="Instructor QR Code"
                open={isQrModalOpen}
                onCancel={handleCloseQrModal}
                getContainer={false}
                footer={null}
                centered
                width={400}
            >
                <div className="flex justify-center items-center p-4">
                    <img
                        src={currentQrCode}
                        alt="QR Code"
                        className="w-full h-auto max-h-[60vh] object-contain rounded shadow-md"
                    />
                </div>
            </Modal>

            <Modal
                getContainer={false}
                title={actionModal.type === "approve" ? "Confirm Approval" : "Reject Withdrawal Request"}
                open={actionModal.open}
                onOk={handleActionConfirm}
                onCancel={() => setActionModal({ open: false, type: null, request: null })}
                okText={actionModal.type === "approve" ? "Approve" : "Reject"}
                okButtonProps={{ danger: actionModal.type === "reject" }}
            >
                {actionModal.type === "approve" ? (
                    <p>
                        Are you sure you want to <strong>approve</strong> request #{actionModal.request?.id}?
                    </p>
                ) : (
                    <>
                        <p>
                            Please provide a reason to <strong>reject</strong> request #{actionModal.request?.id}:
                        </p>
                        <Input.TextArea
                            rows={3}
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Reason for rejection"
                        />
                    </>
                )}
            </Modal>
        </div>
    );
}
