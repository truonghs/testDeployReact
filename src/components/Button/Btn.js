import className from "classnames/bind";
import style from "./Btn.module.scss";
import { Link } from "react-router-dom";
const cx = className.bind(style);

function Btn({ value, style, href, onclick }) {
    const handleClick = (e) => {
        e.stopPropagation();
        onclick();
    };
    return href ? (
        <Link onClick={onclick ? (e) => handleClick(e) : null} to={href} style={style ? style : { flex: 1, width: "auto" }} className={cx("btn")}>
            {value}
        </Link>
    ) : (
        <div onClick={onclick ? (e) => handleClick(e) : null} href={href} style={style ? style : { flex: 1, width: "auto" }} className={cx("btn")}>
            {value}
        </div>
    );
}

export default Btn;
