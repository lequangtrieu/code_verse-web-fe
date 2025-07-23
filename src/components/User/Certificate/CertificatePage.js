import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";

const CertificatePage = ({
  certificateData: propCertificateData,
  courseId: propCourseId,
  userId: propUserId,
  isPopup = false,
}) => {
  const { courseId: routeCourseId } = useParams();
  const [searchParams] = useSearchParams();
  const routeUserId = searchParams.get("userId");

  const courseId = propCourseId || routeCourseId;
  const userId = propUserId || routeUserId;

  const normalizeData = (data) => {
    if (!data) return null;
    return {
      studentName: data.studentName || data?.mail || "Unknown Student",
      courseName: data.courseName || data.courseTitle || "Untitled Course",
      completionDate: data.completionDate || data.completedAt || null,
    };
  };

  const [certificateData, setCertificateData] = useState(
    propCertificateData ? normalizeData(propCertificateData) : null
  );
  const certificateRef = useRef();

  useEffect(() => {
    if (!propCertificateData && userId && courseId) {
      const fetchCertificate = async () => {
        try {
          const res = await axiosInstance.get(
            commonApi.certificate.getCertificate.url(userId, courseId)
          );
          setCertificateData(normalizeData(res.data));
        } catch (error) {
          console.error("Failed to fetch certificate data", error);
        }
      };
      fetchCertificate();
    }
  }, [userId, courseId, propCertificateData]);

  const formattedDate = certificateData?.completionDate
    ? new Date(certificateData.completionDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  if (!certificateData)
    return (
      <div className="w-full h-[670px] flex items-center justify-center">
        <span className="text-gray-600 italic">Loading certificate...</span>
      </div>
    );

  return (
    <div
      ref={certificateRef}
      className={`${
        isPopup
          ? ""
          : "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-10 px-4"
      }`}
    >
      <div
        style={{
          width: "950px",
          height: "670px",
          padding: "40px 60px",
          margin: "auto",
          border: "10px double #1c5d99",
          backgroundColor: "#fff",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          fontFamily: "Georgia, serif",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "left" }}>
          <img
            src="../../logoCodeVerse.png"
            alt="Logo"
            style={{ width: "140px", marginBottom: "10px" }}
          />
        </div>

        {/* Main Content */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h1
            style={{
              textTransform: "uppercase",
              fontSize: "34px",
              fontWeight: "bold",
              color: "#1c5d99",
            }}
          >
            Certificate of Achievement
          </h1>

          <p style={{ marginTop: "18px", color: "#333", fontSize: "16px" }}>
            This is to certify that
          </p>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#000",
              margin: "10px 0",
            }}
          >
            {certificateData.studentName}
          </h2>

          <p style={{ fontSize: "16px", color: "#444", marginBottom: "8px" }}>
            has successfully completed the course
          </p>

          <h3
            style={{
              fontSize: "22px",
              color: "#1c5d99",
              fontWeight: "bold",
              marginBottom: "14px",
            }}
          >
            {certificateData.courseName}
          </h3>

          <p style={{ fontSize: "14px", color: "#444", marginBottom: "20px" }}>
            demonstrating outstanding dedication and proficiency in the subject
            matter.
          </p>

          <p
            style={{
              fontSize: "13px",
              color: "#666",
              fontStyle: "italic",
              marginBottom: "30px",
            }}
          >
            "Education is the passport to the future, for tomorrow belongs to
            those who prepare for it today."
          </p>

          <p style={{ fontSize: "14px", color: "#555", marginBottom: "4px" }}>
            Awarded on <strong>{formattedDate}</strong>
          </p>
        </div>

        {/* Signature */}
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "60px",
            textAlign: "left",
          }}
        >
          <p style={{ fontSize: "14px", color: "#333" }}>
            <em>Signature:</em>{" "}
            <strong>
              <em>codeverse.ad@gmail.com</em>
            </strong>
          </p>
        </div>

        {/* Footer */}
        <p
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            fontSize: "12px",
            color: "#888",
            textAlign: "center",
          }}
        >
          This certificate is issued in recognition of exceptional performance,
          intellectual growth, and commitment to lifelong learning.
        </p>
      </div>
    </div>
  );
};

export default CertificatePage;
