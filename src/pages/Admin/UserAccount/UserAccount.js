import className from "classnames/bind";
import style from "./UserAccount.module.scss";


const cx = className.bind(style);
function UserAccount() {
    return (
        <div className={cx("container")}>
            <div className={cx("heading")}>
                <h1 className={cx("heading-title")}>registered users</h1>
                <img src={require("../../../assets/img/separator.png")} alt="spr" />
            </div>
            <div className={cx("box-container")}>
                <div className={cx("box")}>
                    <img src={require("../../../assets/img/avt.png")} alt="" />
                    <p>
                        user id: <span>01</span>
                    </p>
                    <p>
                        user name: <span>Truong{/*fetch from db*/}</span>
                    </p>
                    <p>
                        user email: <span>truong@gmail.com{/*fetch from db*/}</span>
                    </p>
                </div>
                <div className={cx("box")}>
                    <img src={require("../../../assets/img/avt.png")} alt="" />
                    <p>
                        user id: <span>01</span>
                    </p>
                    <p>
                        user name: <span>Truong{/*fetch from db*/}</span>
                    </p>
                    <p>
                        user email: <span>truong@gmail.com{/*fetch from db*/}</span>
                    </p>
                </div>
                <div className={cx("box")}>
                    <img src={require("../../../assets/img/avt.png")} alt="" />
                    <p>
                        user id: <span>01</span>
                    </p>
                    <p>
                        user name: <span>Truong{/*fetch from db*/}</span>
                    </p>
                    <p>
                        user email: <span>truong@gmail.com{/*fetch from db*/}</span>
                    </p>
                </div>

                {/* <div className={cx("empty")}>
                    <p>no registered user yet!</p>
                </div> */}
            </div>
        </div>
    );
}

export default UserAccount;
