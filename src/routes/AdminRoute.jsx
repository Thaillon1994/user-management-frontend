import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function AdminRoute() {
  return isAdmin() ? <Outlet /> : <Navigate to="/home" />;
}