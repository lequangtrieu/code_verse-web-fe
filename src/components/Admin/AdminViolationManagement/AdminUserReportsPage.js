import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { message, Pagination, Input, Select, Tag, Button } from "antd";
import CustomModal from "../../../common/CustomModal";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AdminUserReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const pageSize = 10;

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedStatus, reports]);

  const fetchReports = async () => {
    try {
      const res = await axiosInstance.get(commonApi.getAllReports.url);
      setReports(res.data || []);
    } catch (err) {
      message.error("Failed to fetch user reports.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reports];
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((r) =>
        ((r.reportedUsername || "") + (r.customReason || "") + (r.reasonTitle || ""))
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((r) => r.status === selectedStatus.toUpperCase());
    }

    setFilteredReports(filtered);
    setCurrentPage(1);
  };

  const paginated = filteredReports.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusTag = (status) => {
    const color = status === "PENDING" ? "gold" : status === "REVIEWED" ? "green" : "red";
    return <Tag color={color}>{status}</Tag>;
  };

  const handleViewDetail = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleDeleteComment = async (messageId) => {
    try {
      await axiosInstance.delete(commonApi.discussion.delete(messageId));
      message.success("Comment deleted successfully.");

      await axiosInstance.patch(commonApi.updateReportStatus.url(selectedReport.id), {
        status: "RESOLVED",
        adminNote: "Comment has been deleted"
      });

      setIsModalOpen(false);
      fetchReports();
    } catch (err) {
      message.error("Failed to delete comment or update report.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">User Reports</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Search by username or reason"
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
          <Option value="PENDING">Pending</Option>
          <Option value="REVIEWED">Reviewed</Option>
          <Option value="REJECTED">Rejected</Option>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="border p-2">#</th>
              <th className="border p-2">Reported User</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Evidence</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((report, index) => (
                <tr key={report.id} className="text-center">
                  <td className="border p-2">{(currentPage - 1) * pageSize + index + 1}</td>
                  <td className="border p-2">{report.reportedUsername}</td>
                  <td className="border p-2">{report.reasonTitle}</td>
                  <td className="border p-2">
                    {report.evidenceUrl ? (
                      <a
                        href={report.evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="border p-2">{getStatusTag(report.status)}</td>
                  <td className="border p-2">
                    <Button type="primary"
                      className="px-3 py-1 border-none"
                      onClick={() => handleViewDetail(report)}
                    >
                      View Detail
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredReports.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      <CustomModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report Detail"
        footer={
          selectedReport?.messageId &&
          selectedReport?.status !== "REVIEWED" &&
          selectedReport?.status !== "RESOLVED"
        }
        footerContent={
          selectedReport?.messageId &&
          selectedReport?.status !== "REVIEWED" &&
          selectedReport?.status !== "RESOLVED" && (
            <button
              onClick={() => handleDeleteComment(selectedReport.messageId)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete Comment
            </button>
          )
        }
      >
        {selectedReport && (
          <div className="space-y-3">
            <p><strong>Report ID:</strong> {selectedReport.id}</p>
            <p><strong>Reported User:</strong> {selectedReport.reportedUsername}</p>
            <p><strong>Reporter:</strong> {selectedReport.reporterUsername}</p>
            <p><strong>Reason:</strong> {selectedReport.reasonTitle}</p>
            <p><strong>Custom Reason:</strong> {selectedReport.customReason || "N/A"}</p>
            {selectedReport.messageId && (
              <p><strong>Message ID:</strong> {selectedReport.messageId}</p>
            )}
            {selectedReport.evidenceUrl && (
              <div>
                <p><strong>Evidence Image:</strong></p>
                <img
                  src={selectedReport.evidenceUrl}
                  alt="Evidence"
                  className="max-h-[300px] object-contain border rounded"
                />
              </div>
            )}
            <p><strong>Status:</strong> <span>{getStatusTag(selectedReport.status)}</span></p>
            <p><strong>Admin Note:</strong> {selectedReport.adminNote || "N/A"}</p>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default AdminUserReportsPage;
