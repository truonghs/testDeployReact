import className from "classnames/bind";
import { Btn } from "../../../components";
import style from "./UserProfile.module.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderMinus,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
const cx = className.bind(style);

function UserProfile() {
  const [user, setUser] = useState({
    id: 1,
    img: require("../../../assets/img/user.jpg"),
    name: 'Alexander User',
    email: 'alexander_user@gmail.com',
    password: '12345',
    totalOrders: 6,
    totalMessages: 2,
  });
  return (
    <div className={cx("main-container")}>
      <div className={cx("banner")}>
        <div className={cx("detail")}>
          <h1>Profile</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing<br />
            elit, sed do eiusmod tempor incididunt ut labore et <br />
            dolore magna aliqua.</p>
        </div>
      </div>
      <div className={cx("profile")}>
        <div className={cx("heading")}>
          <h1>profile details</h1>
          <img src={require("../../../assets/img/separator.png")} />
        </div>
        <div className={cx("details")}>
          <div className={cx("user")}>
            <img src={user.img} />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <Btn
              href={`updateprofile`}
              value="update profile"
              style={{
                width: "13rem",
              }}
            />
          </div>
          <div className={cx("box-container")}>
            <div className={cx("box")}>
              <div className={cx("flex")}>
                <FontAwesomeIcon icon={faFolderMinus} className={cx("iconStyle")} />
                <h3>{user.totalOrders}</h3>
              </div>
              <Btn
                href={`/order`}
                value="view orders"
                style={{
                  width: "13rem",
                }}
              />
            </div>
            <div className={cx("box")}>
              <div className={cx("flex")}>
                <FontAwesomeIcon icon={faMessage} className={cx("iconStyle")} />
                <h3>{user.totalMessages}</h3>
              </div>
              <Btn
                href={`/contact`}
                value="view messages"
                style={{
                  width: "13rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;