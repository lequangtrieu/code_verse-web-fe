import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axiosInstance";
import dayjs from "dayjs";

const CertificateDetailPage = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axiosInstance.get(`/api/enrollment/completed?userId=${userId}`);
        const course = res.data.find((c) => c.courseId.toString() === courseId);
        if (course) setData(course);
      } catch (err) {
        console.error("Error fetching certificate", err);
      }
    };

    if (courseId && userId) fetchCertificate();
  }, [courseId, userId]);

  if (!data) return <p className="text-center mt-10">Loading certificate...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Certificate of Completion</h1>
        <p className="text-lg">This certifies that</p>
        <p className="text-2xl font-semibold mt-2">{data.instructorName}</p>
        <p className="text-lg mt-4">has successfully completed the course</p>
        <p className="text-xl font-bold mt-2">"{data.courseTitle}"</p>
        <p className="text-sm text-gray-500 mt-6">
          Completed on {dayjs(data.completedAt).format("MMMM D, YYYY")}
        </p>
      </div>
    </div>
  );
};

export default CertificateDetailPage;
