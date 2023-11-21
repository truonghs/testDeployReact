import className from "classnames/bind";
import { Btn } from "../../../components";
import style from "./SearchResult.module.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
const cx = className.bind(style);

function SearchResult(){
    const [datas, setData] = useState([
        {
            id: 1,
            name: "Ice cream 1",
            img: require("../../../assets/img/products/687180636_012c012ccc@2x.jpg"),
            price: 12000,
            inLike: true,
            inCart: true,
            inStock: 10,
        },
        {
            id: 2,
            name: "Ice cream 2",
            img: require("../../../assets/img/products/product5.jpg"),
            price: 12000,
            inLike: false,
            inCart: false,
            inStock: 0,
        },
        {
            id: 3,
            name: "Ice cream",
            img: require("../../../assets/img/products/687180662_012c012ccc@2x.jpg"),
            price: 12000,
            inLike: false,
            inCart: true,
            inStock: 0,
        },
        {
            id: 4,
            name: "Ice cream",
            img: require("../../../assets/img/products/514215896_012c012ccc@2x.jpg"),
            price: 12000,
            inLike: false,
            inCart: false,
            inStock: 10,
        },

        {
            id: 5,
            name: "Ice cream",
            img: require("../../../assets/img/products/518151488_012c012ccc@2x.jpg"),
            price: 12000,
            inLike: true,
            inCart: false,
            inStock: 0,
        }, 
        {
            id: 6,
            name: "Ice cream",
            img: require("../../../assets/img/products/535405916_012c012ccc@2x.jpg"),
            price: 12000,
            inLike: true,
            inCart: false,
            inStock: 10,
        },
    ]); 
    const handleClickLike = (itemId) => {
        const updatedDatas = datas.map(item => {
          if (item.id === itemId) {
            return { ...item, inLike: !item.inLike };
          }
          return item;
        });
    
        setData(updatedDatas);
    };
    const handleClickCart = (itemId) =>{
        const updatedDatas = datas.map(item => {
            if (item.id === itemId) {
              return { ...item, inCart: !item.inCart };
            }
            return item;
          });
      
          setData(updatedDatas);        
    }
    return(
        <div className={cx("main-container")}>
            <div className={cx("banner")}>
                <div className={cx("detail")}>
                    <h1>Search Products</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing<br />
                    elit, sed do eiusmod tempor incididunt ut labore et <br />
                    dolore magna aliqua.</p>
                </div>
            </div>
            <div className={cx("products")}>
                <div className={cx("heading")}>
                    <h1>Search Results</h1>
                        <img src={require("../../../assets/img/separator.png")}
                            alt="separator"
                        />
                </div>
                <div className={cx("box-container")}>
                {
                        datas.length > 0 ? datas.map(data => (
                            <div className={cx("box")} key={data.id}>
                                <Link to={`/shop/view1product/${data.id}`} className={cx("view-order")}>
                                    <img src={data.img} alt="product"/>
                                    <p className={cx("status")}>
                                        {data.inStock>0 ? "In Stock" : "Out of Stock"}
                                    </p>
                                </Link>
                                <div className={cx("content")}>
                                    <img src={require("../../../assets/img/shape-19.png")} alt="Shape" className={cx("shap")} />
                                    <div className={cx("price-name")}>
                                        <h2 className={cx("price")}>Price ${data.price}</h2>
                                        <h3 className={cx("name")}> {data.name}</h3>
                                    </div>
                                    <div className={cx("flex-btn")}>
                                        <Btn href={``}
                                            style={{
                                                width: "fit-content",
                                            }}
                                            value="Buy Now" 
                                        />
                                        <div className={cx("like-cart")}>
                                            <FontAwesomeIcon 
                                                icon={faHeart} 
                                                className= {cx({ "icon-style": !data.inLike, "icon-style-clicked": data.inLike })}
                                                id= {cx("like-icon")}
                                                onClick={() => handleClickLike(data.id)}
                                            />
                                            <FontAwesomeIcon
                                                icon={faShoppingCart}
                                                className={cx({ "icon-style": !data.inCart, "icon-style-clicked": data.inCart })}
                                                onClick={() => handleClickCart(data.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : <div className={cx("empty")}>
                            <p>no product was found!</p>
                        </div>
                    }                    
                </div>
            </div>
        </div>
    )
}

export default SearchResult;