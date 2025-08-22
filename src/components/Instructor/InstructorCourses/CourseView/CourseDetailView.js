import { useEffect } from "react";

const CourseDetailView = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded">

      </div>
    </div>
  );
};

export default CourseDetailView;