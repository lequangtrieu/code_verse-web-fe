import { useNavigate, useLocation } from "react-router-dom";

const AdminCoursesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirectToCreate = () => {
    navigate('/admin-panel/courses/create');
  };

  const isCreatePage = location.pathname === '/admin-panel/courses/create';

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Courses</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {!isCreatePage && (
        <div className="flex gap-4 mb-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleRedirectToCreate}
          >
            Create Course
          </button>
        </div>
      )}

    </div>
  );
};
export default AdminCoursesPage;
