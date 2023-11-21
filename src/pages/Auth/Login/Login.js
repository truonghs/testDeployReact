import className from "classnames/bind";
import style from "./Login.module.scss";
import { useState } from "react";
import Btn from "../../../components/Button/Btn";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
import Alert from "../../../components/Alert/Alert";
import { Link } from "react-router-dom";
const cx = className.bind(style);

function Login() {
  const { setcurrentUser, setUserToken } = useStateContext();

  const [userDataLogin, setUserDataLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const pathname = window.location.pathname;
  const onSubmit = () => {
    axiosClient
      .post(`${pathname}`, userDataLogin)
      .then(({ data }) => {
        Alert("success", "Login Successfully", "Have a nice day");
        setUserToken(data.token);
        setcurrentUser(data.user);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          let finalErrors = error.response.data.errors;
          setErrors(finalErrors);
          // Alert(
          //   "error",
          //   "Login Failed",
          //   "Something went wrong, please check again"
          // );
        } else {
          Alert("error", "Login Failed", `${error.response.data.error}`);
        }
      });
  };
  return (
    <div className={cx("form-container")}>
      <form
        action=""
        method="post"
        encType="multipart/from-data"
        className={cx("login")}
      >
        <h3 className={cx("")}>login now</h3>
        <div className={cx("input-field")}>
          <p className={cx("")}>
            your email <span className={cx("")}>*</span>
          </p>
          <input
            className={cx("box")}
            type="email"
            name="email"
            placeholder="enter your email..."
            maxLength={50}
            required
            onChange={(e) => {
              if (errors?.email) {
                setErrors({ ...errors, email: "" });
              }
              setUserDataLogin({
                ...userDataLogin,
                email: e.target.value,
              });
            }}
            value={userDataLogin.email}
          />
          {errors?.email ? (
            <div className={cx("error")}>{errors?.email}</div>
          ) : null}
        </div>
        <div className={cx("input-field")}>
          <p className={cx("")}>
            your password <span className={cx("")}>*</span>
          </p>
          <input
            className={cx("box")}
            type="password"
            name="password"
            placeholder="enter your password..."
            maxLength={50}
            required
            onChange={(e) => {
              if (errors?.password) {
                setErrors({ ...errors, password: "" });
              }
              setUserDataLogin({
                ...userDataLogin,
                password: e.target.value,
              });
            }}
            value={userDataLogin.password}
          />
          {errors?.password ? (
            <div className={cx("error")}>
              {errors.password[errors?.password?.length - 1]}
            </div>
          ) : null}
        </div>
        <p className={cx("link")}>
          do not have an account?
          <Link to={pathname.includes("admin") ? "/admin/register" :"/register"}>register now</Link>
        </p>

        <Btn value="Login now" onclick={onSubmit}></Btn>
      </form>
    </div>
  );
}

export default Login;
