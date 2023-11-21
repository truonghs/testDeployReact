import className from "classnames/bind";
import style from "./Message.module.scss";
import { useState, useEffect } from "react";
import { Btn, AdminHeader } from "../../../components";

const cx = className.bind(style);
function Message() {
    return (
        <div className={cx("container")}>
            <div className={cx("heading")}>
                <h1 className={cx("heading-title")}>unread message</h1>
                <img src={require("../../../assets/img/separator.png")} alt="spr" />
            </div>
            <div className={cx("box-container")}>
                {/* select message */}
                <div className={cx("box")}>
                    <h3 className={cx("name")}>Name</h3>
                    <h4>Subject</h4>
                    <p>message content</p>
                    <form action="" method="post">
                        <input
                            type="hidden"
                            name="delete_id"
                            value={"01"} //fetch message id
                        />
                        <Btn value={"delete this message"} style={{ width: "fit-content" }} name="delete_msg" />
                    </form>
                </div>
                <div className={cx("box")}>
                    <h3 className={cx("name")}>Name</h3>
                    <h4>Subject</h4>
                    <p>message content</p>
                    <form action="" method="post">
                        <input
                            type="hidden"
                            name="delete_id"
                            value={"01"} //fetch message id
                        />
                        <Btn style={{ width: "fit-content" }} value={"delete this message"} name="delete_msg" />
                    </form>
                </div>
                {/* <div className={cx("empty")}>
                    <p>no unread message yet!</p>
                </div> */}
            </div>
        </div>
    );
}

export default Message;
