import { useState, useEffect } from "react";
import className from "classnames/bind";
import style from "./Cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Alert, Btn, Loader } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);

function Cart() {
  const { setCartIds, setQuantityCart } = useStateContext();
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getProductsInCart = () => {
    setLoading(true);
    axiosClient
      .get("/cart")
      .then(({ data }) => {
        setProducts(data.cartList);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const handleTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    setGrandTotal(total);
  };
  const handleQuantity = (e, id) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.product_id === id) {
          return { ...product, quantity: Number(e.target.value) };
        }
        return product;
      });
    });
  };
  const handleUpdateCart = (index, product) => {
    setLoading(true);
    axiosClient
      .put(`/cart/${index}`, product)
      .then(({ data }) => {
        Alert("success","Update quantity successfully")
        setProducts(data.cartList);
        setQuantityCart(data.quantity);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const handleButtonDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/cart/${id}`)
          .then(({ data }) => {
            setCartIds(data.cartListIds);
            getProductsInCart();
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Something went wrong",
              icon: "error",
            });
          });
      }
    });
  };
  useEffect(() => {
    getProductsInCart();
  }, []);
  useEffect(() => {
    handleTotalPrice();
  }, [products]);

  return (
    <div className={cx("main-container")}>
      <div className={cx("products")}>
        <div className={cx("heading")}>
          <h1>My cart</h1>
          <img
            src={require("../../../assets/img/separator.png")}
            alt="separator"
          />
        </div>
        {loading && <Loader />}
        <div className={cx("box-container")}>
          {!loading && (
            <>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index} className={cx("box")}>
                    <img src={product.image_url} alt="product" />
                    <div className={cx("content")}>
                    <img
                        alt=""
                        src={require("../../../assets/img/shape-19.png")}
                        className={cx("sharp")}
                      />
                      <h3>{product.name}</h3>
                      <div className={cx("flex-btn")}>
                        <p className={cx("price")}>Price: ${product.price}</p>
                        <input
                          type="number"
                          name="quantity"
                          required
                          min="1"
                          max={product.stock}
                          maxLength="2"
                          value={product.quantity}
                          className={cx("quantity", "box")}
                          onChange={(e) =>
                            handleQuantity(e, product.product_id)
                          }
                        />
                        <Btn
                          onclick={() => handleUpdateCart(index + 1, product)}
                          style={{
                            width: "fit-content",
                          }}
                          value={<FontAwesomeIcon icon={faEdit} />}
                        />
                      </div>
                      <div className={cx("flex-btn")}>
                        <p className={cx("sub-total")}>
                          Sub total:
                          <span>{product.price * product.quantity}</span>
                        </p>
                        <Btn
                          onclick={() => handleButtonDelete(product.product_id)}
                          style={{
                            width: "fit-content",
                          }}
                          value="delete"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={cx("empty")}>
                  <p>no product was found!</p>
                </div>
              )}
            </>
          )}
        </div>

        {grandTotal > 0 ? (
          <div className={cx("cart-total")}>
            <p>
              total amount payable: <span>{grandTotal}$</span>
            </p>
            <Btn
              href="/checkout"
              style={{
                width: "fit-content",
              }}
              value="Proceed to checkout"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Cart;
