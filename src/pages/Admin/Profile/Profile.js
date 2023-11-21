import className from "classnames/bind";
import style from "./Profile.module.scss";
import { Btn } from "../../../components";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);
function Profile() {
    const {currentUser} = useStateContext();
    const image_url = currentUser.image_url ? currentUser.image_url : require("../../../assets/img/avt.png");
    return (
        <div className={cx("container")}>
            <div className={cx("heading")}>
                <h1 className={cx("heading-title")}>profile details</h1>
                <img src={require("../../../assets/img/separator.png")} alt="spr" />
            </div>

            <div className={cx("details")}>
                <div className={cx("seller")}>
                    <img
                        alt=""
                        /*Fetch from db */
                        src={image_url}
                    />
                    <h3>{currentUser.name}</h3>
                    <span>seller</span>
                    <Btn href="/admin/updateprofile" value="update your profile" />
                </div>
                <div className={cx("flex")}>
                    <div className={cx("box")}>
                        <span>{/*fetch total produts*/}20</span>
                        <p>Total Products</p>
                        <Btn href="/admin/viewproduct" value="view your products" />
                    </div>
                    <div className={cx("box")}>
                        <span>{/*fetch total orders*/}20</span>
                        <p>Total Orders Placed</p>

                        <Btn href="/admin/order" value="view all orders" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
