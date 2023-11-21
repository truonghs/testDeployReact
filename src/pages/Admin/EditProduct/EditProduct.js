import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import style from "./EditProduct.module.scss";
import { Btn, Loader } from "../../../components";
import Alert from "../../../components/Alert/Alert";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);
function EditProduct() {
  const { id } = useParams();
  const { currentUser } = useStateContext();
  const [loading, setLoading] = useState(false);
  const[errors,setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    image_url: null,
    product_detail: "",
    status: "",
    stock: "",
  });
  const navigate = useNavigate();
  const onImageChoose = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProduct({
        ...product,
        image: file,
        image_url: reader.result,
      });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  const onEdit = async () => {
    const payload = { ...product, seller_id: currentUser.id };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    await axiosClient
      .put(`/admin/product/${id}`, payload)
      .then((res) => {
        navigate("/admin/viewproduct");
        Alert("success", "update product successfully");
      })
      .catch((error) => {
        if(error.response) {
          setErrors(error.response.data.error);
        }
        Alert("error", "Something went wrong");
      });
  };

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/admin/product/${id}`).then(({ data }) => {
      setProduct(data.data);
      setLoading(false);
    });
  }, []);
  const inputField = cx("input-field");
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <h1 className={cx("heading-title")}>edit product</h1>
        <img src={require("../../../assets/img/separator.png")} alt="spr" />
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className={cx("box-container")}>
          {/*select product from db */}
          <div className={cx("form-container")}>
            <form action="" method="post" encType="multipart/form-data">
              <div className={inputField}>
                <p>
                  product status<span>*</span>
                </p>
                <select
                  name="status"
                  className={cx("box")}
                  onChange={(e) =>
                    setProduct({ ...product, status: e.target.value })
                  }
                  value={product.status}
                >
                  <option
                    value={product.status === "active" ? "active" : "inactive"}
                  >
                    {product.status === "active" ? "active" : "inactive"}
                  </option>
                  <option
                    value={product.status !== "active" ? "active" : "inactive"}
                  >
                    {product.status !== "active" ? "active" : "inactive"}
                  </option>
                </select>
              </div>
              <div className={inputField}>
                <p>
                  product name<span>*</span>
                </p>
                <input
                  type="text"
                  name="name"
                  /*fetch name */
                  value={product.name}
                  className={cx("box")}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
              <div className={inputField}>
                <p>
                  product price<span>*</span>
                </p>
                <input
                  type="number"
                  name="price"
                  /*fetch price */
                  value={product.price}
                  className={cx("box")}
                  onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className={inputField}>
                <p>
                  product description<span>*</span>
                </p>

                <textarea
                  /*fetch desc */ name="description"
                  className={cx("box")}
                  value={product.product_detail}
                  onChange={(e) =>
                    setProduct({ ...product, product_detail: e.target.value })
                  }
                ></textarea>
              </div>
              <div className={inputField}>
                <p>
                  product stock<span>*</span>
                </p>
                <input
                  type="number"
                  name="stock"
                  /*fetch stock */
                  value={product.stock}
                  className={cx("box")}
                  min={0}
                  max={999999999}
                  maxLength={10}
                  onChange={(e) =>
                    setProduct({ ...product, stock: Number(e.target.value) })
                  }
                />
              </div>
              <div className={inputField}>
                <p>
                  product image<span>*</span>
                </p>
                <input
                  type="file"
                  name="image"
                  /*fetch stock */
                  accept="image/*"
                  className={cx("box")}
                  onChange={onImageChoose}
                />
                {product.image_url ? (
                  <img
                    alt="product image"
                    className={cx("image")}
                    src={product.image_url}
                  />
                ) : null}
                <div className={cx("flex-btn")}>
                  {/* <Btn
                    value={"delete image"}
                    style={{ width: "49%", height: "3rem" }}
                    onclick={onDeleteImage}
                  /> */}
                  <Btn
                    value={"update product"}
                    style={{
                      width: "49%",
                    }}
                    onclick={onEdit}
                  />
                  <Btn
                    value={"go back"}
                    style={{ width: "49%", height: "3rem" }}
                    href={"/admin/viewproduct"}
                  />
                </div>
              </div>
              {/* <div className={cx("flex-btn")}>
               
                <Btn
                  value={"delete product"}
                  style={{
                    width: "49%",
                  }}
                />
              </div> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
