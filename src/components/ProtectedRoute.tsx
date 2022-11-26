import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ redirectPath = "/", children }: any) => {
  const { user } = useAppSelector((state) => state);
  if (!user.details) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
