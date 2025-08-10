import { Button, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import CertificatePage from "../Certificate/CertificatePage";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CopyOutlined, DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";

const UserAccomplishmentsPage = () => {
  const [certificates, setCertificates] = useState([]);
  const user = useSelector((state) => state.user.user);

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          commonApi.certificate.getCompletedCourses.url(user.id)
        );
        setCertificates(res.data);
      } catch (error) {
        console.error("Failed to fetch completed courses:", error);
      }
    };

    if (user?.id) fetchData();
  }, [user]);

  const openCertificateModal = (courseId) => {
    setSelectedCourseId(courseId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCourseId(null);
  };

  const handleDownload = async (courseId) => {
    try {
      const res = await axiosInstance.get(
        commonApi.certificate.getCertificate.url(user.id, courseId)
      );
      const data = res.data;

      const container = document.createElement("div");
      container.style.width = "950px";
      container.style.height = "670px";
      container.style.padding = "40px 60px";
      container.style.border = "10px double #1c5d99";
      container.style.backgroundColor = "#fff";
      container.style.fontFamily = "Georgia, serif";
      container.style.borderRadius = "8px";
      container.style.position = "relative";
      container.style.boxSizing = "border-box";

      container.innerHTML = `
      <div style="text-align:left;">
        <img src='${
          window.location.origin
        }/logoCodeVerse.png' style="width:140px; margin-bottom:10px;" />
      </div>
      <div style="text-align:center;margin-top:10px">
        <h1 style="text-transform:uppercase;font-size:34px;font-weight:bold;color:#1c5d99">
          Certificate of Achievement
        </h1>
        <p style="margin-top:18px;color:#333;font-size:16px">This is to certify that</p>
        <h2 style="font-size:28px;font-weight:bold;color:#000;margin:10px 0">${
          data.studentName
        }</h2>
        <p style="font-size:16px;color:#444;margin-bottom:8px">has successfully completed the course</p>
        <h3 style="font-size:22px;color:#1c5d99;font-weight:bold;margin-bottom:14px">${
          data.courseName
        }</h3>
        <p style="font-size:14px;color:#444;margin-bottom:20px">
          demonstrating outstanding dedication and proficiency in the subject matter.
        </p>
        <p style="font-size:13px;color:#666;font-style:italic;margin-bottom:30px">
          "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
        </p>
        <p style="font-size:14px;color:#555;margin-bottom:4px">
          Awarded on <strong>${dayjs(data.completionDate).format(
            "DD/MM/YYYY"
          )}</strong>
        </p>
      </div>
      <div style="position:absolute;bottom:70px;left:60px;text-align:left">
        <p style="font-size:14px;color:#333">
          <em>Signature:</em> <strong><em>codeverse.ad@gmail.com</em></strong>
        </p>
      </div>
      <p style="position:absolute;bottom:20px;width:100%;font-size:12px;color:#888;text-align:center">
        This certificate is issued in recognition of exceptional performance, intellectual growth, and commitment to lifelong learning.
      </p>
    `;

      document.body.appendChild(container);
      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Certificate-${data.studentName}.pdf`);
      document.body.removeChild(container);
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  const selectedCertificate = certificates.find(
    (c) => c.courseId === selectedCourseId
  );

  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="My Specializations">
        {certificates.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            You haven’t completed any course yet.
          </div>
        ) : (
          <div className="space-y-4">
            {certificates.map((course) => (
              <div
                key={course.courseId}
                className="flex items-center justify-between border border-gray-200 bg-white rounded-md p-4 hover:shadow transition"
              >
                {/* Left - Icon + Title + Instructor */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d2j5ihb19pt1hq.cloudfront.net/certificates/cert-course.png?auto=format%2Ccompress&dpr=1&h=72"
                      alt="Certificate"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3
                      className="text-md font-semibold text-blue-700 hover:underline cursor-pointer"
                      onClick={() => openCertificateModal(course.courseId)}
                    >
                      {course.courseTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {course.instructorName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Completed on:{" "}
                      {dayjs(course.completedAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => openCertificateModal(course.courseId)}
                    title="Preview Certificate"
                  />
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() => handleDownload(course.courseId)}
                    title="Download PDF"
                  />
                  <Button
                    icon={<CopyOutlined />}
                    title="Copy Link"
                    onClick={() => {
                      const shareUrl = `https://code-verse-web-fe.vercel.app/certificate/${course.courseId}?userId=${user.id}`;
                      navigator.clipboard.writeText(shareUrl);
                      message.success("Certificate link copied to clipboard!");
                    }}
                  />
                  <a
                    href={`/certificate/${course.courseId}?userId=${user.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="default">Open in Page</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal popup certificate */}
        <Modal
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
          width={1000}
          style={{ top: 20 }}
          destroyOnClose
          centered
          getContainer={false}
          styles={{ body: { padding: 0 } }}
        >
          {modalVisible && selectedCertificate && (
            <CertificatePage certificateData={selectedCertificate} isPopup />
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default UserAccomplishmentsPage;
