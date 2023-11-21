import { Outlet,Navigate } from "react-router-dom";
import style from "./GuestLayout.module.scss";
import className from "classnames/bind";
import { useStateContext } from "../../context/ContextProvider"; 
const cx = className.bind(style);
function GuestLayout() {
    const {userToken,currentUser} = useStateContext();
    if(userToken) {
        if(currentUser.user_type==='client') {
            return <Navigate to="/"/>
        }
        else {
            return <Navigate to="/admin"/>
        }
    }
    return (
        <div className={cx("background")}>
            <Outlet />
        </div>
    );
}

export default GuestLayout;
