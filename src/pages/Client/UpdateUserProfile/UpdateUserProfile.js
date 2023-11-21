import { useState } from "react";
import className from "classnames/bind";
import style from "./UpdateUserProfile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Btn from "../../../components/Button/Btn";
import axiosClient from "../../../axiosClient/axios.js";

import { useNavigate, Link } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
const cx = className.bind(style);

function UpdateUserProfile() {
    const [required, setRequired] = useState(false);
    const [user,setUser] = useState({
        id: 1,
        img: require("../../../assets/img/user.jpg"),
        name: 'Alexander User',
        email: 'alexander_user@gmail.com',
        password: '12345',
        totalOrders: 6,
        totalMessages: 2,
      });
    const navigate = useNavigate();
    const [userDataUpdate, setuserDataUpdate] = useState({
        name: "",
        email: "",
        current_password: "",
        new_password: "",
        password_confirmation: "",
        image: "",
        image_url: "",
    });
    const pathname = window.location.pathname;
    const [errors, setErrors] = useState({});
    const onImageChoose = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setuserDataUpdate({
                ...userDataUpdate,
                image: file,
                image_url: reader.result,
            });
            e.target.value = "";
        };
        reader.readAsDataURL(file);
    };
    const onSubmit = async () => {
        const payload = { ...userDataUpdate };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        await axiosClient
            .post(`${pathname}`, payload)
            .then(({ data }) => {
                Alert(
                    "success",
                    "Register Successfully",
                    "Please login for a great experience"
                );
                if (pathname.includes("admin")) {
                    navigate("/admin/login");
                    return;
                }
                navigate("/login");
            })
            .catch((error) => {
                if (error.response) {
                    let finalErrors = error.response.data.errors;
                    setErrors(finalErrors);
                    // Alert(
                    //   "error",
                    //   "Register Failed",
                    //   "Something went wrong, please check again"
                    // );
                }
            });
    };
    return (
        <div className={cx("form-container")}>
            <div className={cx("banner")}>
                <div className={cx("detail")}>
                    <h1>Update Profile</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing<br />
                        elit, sed do eiusmod tempor incididunt ut labore et <br />
                        dolore magna aliqua.</p>
                </div>
            </div>
            <div className={cx("heading")}>
                <h1>update profile details</h1>
                <img src={require("../../../assets/img/separator.png")} />
            </div>
            <form
                action="#"
                method="POST"
                encType="multipart/from-data"
                className={cx("register")}
                onSubmit={onSubmit}
            >
                <div className={cx("user")}>
                    <img src={user.img} />
                </div>
                <div className={cx("")}>
                    <div className={cx("row")}>
                        <div className={cx("input-field")}>
                            <p className={cx("")}>your name</p>
                            <input
                                className={cx("box")}
                                type="text"
                                name="name"
                                placeholder="enter your name..."
                                maxLength={50}
                                onChange={(e) => {
                                    if (errors?.name) {
                                        setErrors({ ...errors, name: "" });
                                    }
                                    setuserDataUpdate({
                                        ...userDataUpdate,
                                        name: e.target.value,
                                    });
                                }}
                                value={userDataUpdate.name}
                            />
                            {errors?.name ? (
                                <div className={cx("error")}>{errors?.name}</div>
                            ) : null}
                        </div>
                        <div className={cx("input-field")}>
                            <p className={cx("")}>your email</p>
                            <input
                                className={cx("box")}
                                type="email"
                                name="email"
                                placeholder="enter your email..."
                                maxLength={50}
                                onChange={(e) => {
                                    if (errors?.email) {
                                        setErrors({ ...errors, email: "" });
                                    }
                                    setuserDataUpdate({
                                        ...userDataUpdate,
                                        email: e.target.value,
                                    });
                                }}
                                value={userDataUpdate.email}
                            />
                            {errors?.email ? (
                                <div className={cx("error")}>{errors?.email}</div>
                            ) : null}
                        </div>

                    </div>

                    <div className={cx("row")}>
                        <div className={cx("input-field")}>
                            <p className={cx("")}>your current password</p>
                            <input
                                className={cx("box")}
                                type="password"
                                name="current password"
                                placeholder="enter your password..."
                                maxLength={50}
                                onChange={(e) => {
                                    const currentPw = document.getElementById('current-pw');
                                    if(currentPw.value!="" && required==false) {
                                        setRequired(!required);
                                    }
                                    if(currentPw.value=="") {
                                        setRequired(!required);
                                    }
                                    if (errors?.password) {
                                        setErrors({ ...errors, password: "" });
                                    }
                                    setuserDataUpdate({
                                        ...userDataUpdate,
                                        current_password: e.target.value,
                                    });
                                }}
                                value={userDataUpdate.current_password}
                                id={cx("current-pw")}
                            />
                            {errors?.password ? (
                                <div className={cx("error")}>
                                    {errors.password[errors?.password?.length - 1]}
                                </div>
                            ) : null}
                        </div>
                        <div className={cx("input-field")}>
                            <p className={cx("")}>your new password <span className={required ? cx("required") : cx("not-required")}>*</span></p>
                            <input
                                className={cx("box")}
                                type="password"
                                name="new password"
                                placeholder="enter your new password..."
                                maxLength={50}
                                onChange={(e) => {
                                    if (errors?.password) {
                                        setErrors({ ...errors, password: "" });
                                    }
                                    setuserDataUpdate({
                                        ...userDataUpdate,
                                        new_password: e.target.value,
                                    });
                                }}
                                value={userDataUpdate.new_password}
                                id={cx("new-pw")}
                            />
                            {errors?.password ? (
                                <div className={cx("error")}>
                                    {errors.password[errors?.password?.length - 1]}
                                </div>
                            ) : null}
                        </div>
                        <div className={cx("input-field")}>
                            <p className={cx("")}>
                                confirm your new password <span className={required ? cx("required") : cx("not-required")}>*</span>
                            </p>
                            <input
                                className={cx("box")}
                                type="password"
                                name="password-confirmation"
                                placeholder="confirm your new password..."
                                maxLength={50}
                                onChange={(e) => {
                                    if (errors?.password) {
                                        setErrors({ ...errors, password: "" });
                                    }
                                    setuserDataUpdate({
                                        ...userDataUpdate,
                                        password_confirmation: e.target.value,
                                    });
                                }}
                                value={userDataUpdate.password_confirmation}
                            />
                            {errors?.password && errors.password?.length > 1 ? (
                                <div className={cx("error")}>{errors.password[0]}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className={cx("")}>
                    <p className={cx("")}>your profile</p>
                    <div className={cx("profile-img-box")}>
                        {userDataUpdate.image_url && (
                            <img
                                src={userDataUpdate.image_url}
                                alt="Image"
                                className={cx("img-choose")}
                            />
                        )}
                        {!userDataUpdate.image_url && (
                            <div>
                                <FontAwesomeIcon icon={faImage} className={cx("icon-style")} />
                            </div>
                        )}
                        <button className={cx("btn-chooseImg")}>
                            <input
                                className={cx("img-choose-input")}
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={onImageChoose}
                            />
                            Change
                        </button>
                    </div>
                </div>
                <Btn value={"update now"} onclick={onSubmit}></Btn>
            </form>
        </div>
    );
}

export default UpdateUserProfile;
