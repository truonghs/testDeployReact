import { Outlet, Navigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./AdminLayout.module.scss";
import { AdminHeader } from "../../components";
import { useStateContext } from "../../context/ContextProvider";

const cx = className.bind(style);

function AdminLayout() {
  const { userToken, currentUser } = useStateContext();
  if (userToken) {
    if (currentUser.user_type === "client") {
      return <Navigate to="/home" />;
    }
  } else {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className={cx("admin-container")}>
      <AdminHeader>
        <Outlet />
      </AdminHeader>
    </div>
  );
}

export default AdminLayout;
