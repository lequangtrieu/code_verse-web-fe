import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";

const CertificatePage = ({
  courseId: propCourseId,
  userId: propUserId,
  isPopup = false,
}) => {
  const { courseId: routeCourseId } = useParams();
  const [searchParams] = useSearchParams();
  const routeUserId = searchParams.get("userId");

  const courseId = propCourseId || routeCourseId;
  const userId = propUserId || routeUserId;

  const [certificateData, setCertificateData] = useState(null);
  const certificateRef = useRef();

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axiosInstance.get(
          commonApi.certificate.getCertificate.url(userId, courseId)
        );
        setCertificateData(res.data);
      } catch (error) {
        console.error("Failed to fetch certificate data", error);
      }
    };

    if (userId && courseId) fetchCertificate();
  }, [userId, courseId]);

  const formattedDate = certificateData?.completionDate
    ? new Date(certificateData.completionDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  if (!certificateData)
    return <p className="text-center mt-10">Loading certificate...</p>;

  return (
    <div
      ref={certificateRef}
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

      {/* Centered Content */}
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

        {/* Inspirational Quote */}
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

        {/* Date */}
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

      {/* Footer Note */}
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
  );
};

export default CertificatePage;
