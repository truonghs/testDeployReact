import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import className from "classnames/bind";
import style from "./ProductDetail.module.scss";
import { Btn, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
const cx = className.bind(style);

function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/admin/product/${id}`).then(({ data }) => {
      setProduct(data.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>your products</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className={cx("box-container")}>
          {/*Select product from database */}
          <div className={cx("box")}>
            <div
              className={cx("status")}
              style={{
                color: product.status === "active" ? "limegreen" : "coral",
              }}
            >
              {product.status}
            </div>
            {/*-----product image-----*/}

            <img alt="" className={cx("image")} src={product.image_url} />
            {/*-----product price-----*/}
            <div className={cx("price")}>${product.price}</div>
            <div className={cx("title")}>{product.name}</div>
            <div className={cx("content")}>
              {/*Product detail from db */}
              {product.product_detail}
            </div>
            <div className={cx("flex-btn")}>
              <Btn
                style={{
                  width: "40%",
                }}
                href={`/admin/editproduct/${id}`}
                value={"edit"}
              />

              <Btn
                style={{
                  width: "40%",
                }}
                href="/admin/viewproduct"
                value={"go back"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
