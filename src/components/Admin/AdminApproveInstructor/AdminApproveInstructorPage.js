import { useEffect, useState } from "react";
import { message, Table, Button, Input, Pagination } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import LoadingOverlay from "../../../common/LoadingOverlay";
import CustomModal from "../../../common/CustomModal";

const AdminApproveInstructorPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchInactiveInstructors();
  }, []);

  const fetchInactiveInstructors = async () => {
    try {
      const response = await axiosInstance.get(commonApi.getInactiveInstructors.url);
      setInstructors(Array.isArray(response.data) ? response.data.reverse() : []);
    } catch (error) {
      message.error("Failed to fetch inactive instructors");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch instructor details
  const fetchInstructorDetail = async (instructorId) => {
    setLoadingDetail(true);
    try {
      const response = await axiosInstance.get(commonApi.getUserDetailInfoByUserID.url(instructorId));
      setInstructorDetails(response.data);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to fetch instructor details");
    } finally {
      setLoadingDetail(false);
    }
  };

  // Function to filter instructors based on search term
  const filterBySearch = (instructors, searchTerm) => {
    if (!searchTerm.trim()) return instructors;

    return instructors.filter(
      (instructor) =>
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.educationalBackground?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = filterBySearch(instructors, searchTerm);
      setFilteredInstructors(filtered);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, instructors]);

  const highlightText = (text, highlight) => {
    if (!highlight || !text) return text;

    const regex = new RegExp(`(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: '#ffe58f', padding: 0 }}>{part}</mark>
      ) : (
        part
      )
    );
  };


  // Function to render teaching credentials directly in the table
  const renderTeachingCredentials = (credentials) => {
    if (!credentials) return "N/A";

    // If it's a URL to an image
    if (credentials.endsWith(".jpg") || credentials.endsWith(".png") || credentials.endsWith(".jpeg")) {
      return <img src={credentials} alt="Teaching Credentials" style={{ width: 100, height: 100, objectFit: "cover" }} />;
    }

    // If it's a URL to a document (PDF or similar)
    return <a href={credentials} target="_blank" rel="noopener noreferrer">View Teaching Credentials</a>;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setInstructorDetails(null);
  };

  const handleAcceptInstructor = async (instructorId) => {
    try {
      await axiosInstance.patch(commonApi.activateInstructor.url(instructorId), null);
      message.success("Instructor accepted and activated successfully");
      fetchInactiveInstructors();
      handleCloseModal();
    } catch (error) {
      message.error("Failed to activate instructor");
    }
  };

  const handleRejectInstructor = async (instructorId) => {
    try {
      await axiosInstance.patch(commonApi.deactivateInstructor.url(instructorId), null);
      message.success("Instructor rejected and deactivated successfully");
      fetchInactiveInstructors();
      handleCloseModal();
    } catch (error) {
      message.error("Failed to deactivate instructor");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Approve Users to Become Instructors</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {/* Search Input */}
      <Input
        placeholder="Search by name, email, or background"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-64"
      />

      <div>
        {loading ? (
          <LoadingOverlay />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Full Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Background</th>
                  <th className="border p-2 text-left">Teaching Credentials</th>
                  <th className="border p-2 justify-center ">Actions</th>
                </tr>
              </thead>
              {
                filteredInstructors.length > 0 ?
                  (
                    <tbody>
                      {filteredInstructors
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .map((instructor) => (
                          <tr key={instructor.id} className="text-center">
                            <td className="border p-2 text-left">{highlightText(instructor.name, searchTerm)}</td>
                            <td className="border p-2 text-left">{highlightText(instructor.username, searchTerm)}</td>
                            <td className="border p-2 text-left">{highlightText(instructor.educationalBackground, searchTerm)}</td>
                            <td className="border p-2 text-left">
                              {renderTeachingCredentials(instructor.teachingCredentials)}
                            </td>
                            <td className="border p-2 justify-center">
                              <Button type="primary"
                                onClick={() => fetchInstructorDetail(instructor.id)}
                                className="px-3 py-1 whitespace-nowrap min-w-[70px] border-none"
                              >
                                View Detail
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  ) :
                  (
                    <tr>
                      <td colSpan="7" className="text-center p-4 text-gray-500">
                        No request found.
                      </td>
                    </tr>
                  )
              }

            </table>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredInstructors.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ marginTop: 16, textAlign: "center" }}
        />
      </div>

      {/* Modal to show instructor details */}
      <CustomModal
        title={`Instructor Details - ${instructorDetails?.name}`}
        open={isModalVisible}
        onClose={handleCloseModal}
        footer={true}
        footerContent={
          <>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => handleRejectInstructor(instructorDetails.id)}
            >
              Reject
            </button>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded"
              onClick={() => handleAcceptInstructor(instructorDetails.id)}
            >
              Accept
            </button>
          </>
        }
      >
        {loadingDetail ? (
          <LoadingOverlay />
        ) : (
          instructorDetails && (
            <div>
              <p><b>Name:</b> {instructorDetails.name}</p>
              <p><b>Email:</b> {instructorDetails.username}</p>
              <p><b>Phone Number:</b> {instructorDetails.phoneNumber || "N/A"}</p>
              <p><b>Bio:</b> {instructorDetails.bio || "N/A"}</p>
              <p><b>Teaching Credentials:</b>
                {instructorDetails.teachingCredentials ? (
                  <img
                    src={instructorDetails.teachingCredentials}
                    alt="Teaching Credentials"
                    style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
                  />
                ) : "N/A"}
              </p>
              <p><b>QR Code:</b>
                {instructorDetails.qrCodeUrl ? (
                    <img
                        src={instructorDetails.qrCodeUrl}
                        alt="QR Code"
                        style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
                    />
                ) : "N/A"}
              </p>
              <p><b>Educational Background:</b> {instructorDetails.educationalBackground || "N/A"}</p>
              <p><b>Account Created:</b> {new Date(instructorDetails.createdAt).toLocaleString()}</p>
              <p><b>Account Updated:</b> {new Date(instructorDetails.updatedAt).toLocaleString()}</p>
            </div>
          )
        )}
      </CustomModal>
    </div>
  );
};

export default AdminApproveInstructorPage;
