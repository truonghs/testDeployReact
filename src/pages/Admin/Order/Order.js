import className from "classnames/bind";
import style from "./Order.module.scss";
import { useState, useEffect } from "react";
import { Btn, AdminHeader } from "../../../components";

const cx = className.bind(style);
function Order() {
    return (
        <div className={cx("container")}>
            <div className={cx("heading")}>
                <h1 className={cx("heading-title")}>total orders placed</h1>
                <img src={require("../../../assets/img/separator.png")} alt="spr" />
            </div>
            <div className={cx("box-container")}>
                <div className={cx("box")}>
                    <div className={cx("status")} style={{ color: "limegreen" }}>
                        in progress
                    </div>
                    <div className={cx("details")}>
                        <p>
                            user name: <span>Truong{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user id: <span>01{/*fetch from db*/}</span>
                        </p>
                        <p>
                            palce on: <span>01/05/2023{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user number: <span>0123456789{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user email: <span>truong@gmail.com{/*fetch from db*/}</span>
                        </p>
                        <p>
                            total price: <span>$20{/*fetch from db*/}</span>
                        </p>
                        <p>
                            payment method: <span>credit card{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user address: <span>tp Ho Chi Minh{/*fetch from db*/}</span>
                        </p>
                    </div>
                    <form action="" method="post">
                        <input
                            type="hidden"
                            name="order_id"
                            value={"01"} //fetch from db
                        />
                        <select className={cx("box")} name="update_payment">
                            <option disabled selected>
                                {/*fetch from db*/}
                                pending
                            </option>
                            <option value={"pending"}>pending</option>
                            <option value={"complete"}>order delivered</option>
                        </select>
                        <div className={cx("flex-btn")}>
                            <Btn value={"update payment"} />
                            <Btn value={"delete order"} />
                        </div>
                    </form>
                </div>
                <div className={cx("box")}>
                    <div className={cx("status")} style={{ color: "limegreen" }}>
                        in progress
                    </div>
                    <div className={cx("details")}>
                        <p>
                            user name: <span>Truong{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user id: <span>01{/*fetch from db*/}</span>
                        </p>
                        <p>
                            palce on: <span>01/05/2023{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user number: <span>0123456789{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user email: <span>truong@gmail.com{/*fetch from db*/}</span>
                        </p>
                        <p>
                            total price: <span>$20{/*fetch from db*/}</span>
                        </p>
                        <p>
                            payment method: <span>credit card{/*fetch from db*/}</span>
                        </p>
                        <p>
                            user address: <span>tp Ho Chi Minh{/*fetch from db*/}</span>
                        </p>
                    </div>
                    <form action="" method="post">
                        <input
                            type="hidden"
                            name="order_id"
                            value={"01"} //fetch from db
                        />
                        <select className={cx("box")} width={"90%"} name="update_payment">
                            <option disabled selected>
                                {/*fetch from db*/}
                                pending
                            </option>
                            <option value={"pending"}>pending</option>
                            <option value={"complete"}>order delivered</option>
                        </select>
                        <div className={cx("flex-btn")}>
                            <Btn value={"update payment"} />
                            <Btn value={"delete order"} />
                        </div>
                    </form>
                </div>
                {/* <div className={cx("empty")}>
                    <p>no order placed yet!</p>
                </div> */}
            </div>
        </div>
    );
}

export default Order;
