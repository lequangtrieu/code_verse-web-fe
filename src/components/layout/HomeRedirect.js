import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../../components/layout/Home";
import ROLE from "../../common/role";

const HomeRedirect = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === ROLE.LEARNER) {
            navigate("/home");
        }
        if (user?.role === ROLE.ADMIN) {
            navigate("/admin-panel/dashboard");
        }
    }, [user, navigate]);

    return !user ? <Home /> : null;
};

export default HomeRedirect;
