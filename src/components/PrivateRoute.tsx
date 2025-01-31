import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol"); // 🔹 

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(rol || "")) {
        return <Navigate to="/unauthorized" replace />; 
    }

    return <Outlet />;
};

export default PrivateRoute;
