import { useEffect, useState } from "react";
import className from "classnames/bind";
import style from "./Favourite.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faEye, faX } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Btn, Loader, Alert } from "../../../components";
import axiosClient from "../../../axiosClient/axios";
import { useStateContext } from "../../../context/ContextProvider";
const cx = className.bind(style);

function Favourite() {
  const { currentUser, setCartIds, setQuantityCart } = useStateContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setWishListIds } = useStateContext();
  const getProductsInWishList = () => {
    setLoading(true);
    axiosClient
      .get("/wishlists")
      .then(({ data }) => {
        setProducts(data.wishlists);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProductsInWishList();
  }, []);
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
          .delete(`/wishlists/${id}`)
          .then(({ data }) => {
            setWishListIds(data.wishListIds);
            getProductsInWishList();
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
  const handleClickCart = (product) => {
    if (product.stock === 0) {
      Swal.fire({
        title: "Sorry",
        text: "TThis product is temporarily out of stock",
        imageUrl: require("../../../assets/img/crying.png"),
        imageWidth: 80,
        imageHeight: 80,
        imageAlt: "Custom image",
      });
      return;
    }
    const payload = { ...product, user_id: currentUser.id, quantity: 1, id: product.product_id };
    axiosClient
      .post("/cart", payload)
      .then(({ data }) => {
        setCartIds(data.cartListIds);
        setQuantityCart(data.quantity);
        Alert("success", "Add to cart successfully");
      })
      .catch((error) => {
        if (error.response) {
          Alert("warning", `${error.response.data.errors.id}`);
        }
      });
  };
  return (
    <div className={cx("main-container")}>
      <div className={cx("products")}>
        <div className={cx("heading")}>
          <h1>My wishlist</h1>
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
                        <Btn
                          onclick={() => handleClickCart(product)}
                          style={{
                            width: "fit-content",
                          }}
                          value={<FontAwesomeIcon icon={faCartShopping} />}
                        />
                        <Btn
                          href={`/shop/view1product/${product.product_id}`}
                          style={{
                            width: "fit-content",
                          }}
                          value={<FontAwesomeIcon icon={faEye} />}
                        />
                        <Btn
                          onclick={() => handleButtonDelete(product.product_id)}
                          style={{
                            width: "fit-content",
                          }}
                          value={<FontAwesomeIcon icon={faX} />}
                        />
                      </div>
                      <div className={cx("flex-btn")}>
                        <Btn
                          href=""
                          style={{
                            width: "fit-content",
                          }}
                          value="buy now"
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
      </div>
    </div>
  );
}

export default Favourite;
