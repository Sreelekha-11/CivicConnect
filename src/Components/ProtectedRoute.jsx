
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
    const { user } = useAuth();
    const location = useLocation();

    // Check whether user is logged in
    if (!user) {
        return (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                replace
            />
        );
    }

    // Check user role
    if (allowedRole && user.role !== allowedRole) {
        return (
            <Navigate
                to={user.role === "admin" ? "/admin-dashboard" : "/dashboard"}
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;
