import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  if (!auth.isAuthenticated) return;
  return children;
};
export default ProtectedRoute;
