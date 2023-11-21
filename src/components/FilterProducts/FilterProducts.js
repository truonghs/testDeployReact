import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import style from "./FilterProducts.module.scss";
import PaginationLinks from "../PaginationLinks/PaginationLinks";
const cx = className.bind(style);
function FilterProducts({ meta, onPageClick, onGetSortValue }) {
  const [isCheck, setIsChecked] = useState(false);
  const selections = [
    {
      type: "price",
      options: [
        {
          sortType: "asc",
          title: "Price: Low to High",
          isChecked: false,
        },
        {
          sortType: "desc",
          title: "Price: High to Low",
          isChecked: false,
        },
      ],
    },
    {
      type: "status",
      options: [
        {
          sortType: "active",
          title: "Status: Active",
          isChecked: false,
        },
        {
          sortType: "inactive",
          title: "Status: Inactive",
          isChecked: false,
        },
      ],
    },
  ];
  // const isChecked = (sortBy, order) => {
  //   selections.forEach(selection => {
  //     if(selection.type === sortBy)
  //     {
  //       selection.options.forEach(option => {
  //         if(option.sortType === order) {
  //           setIsChecked(true);
            
  //         }
  //       })
  //     }
  //   })
  // };
  return (
    <div className={cx("container")}>
      <div className={cx("sort-choice")}>
        <p className={cx("sort-text")}>Sorted by</p>
        {selections.map((selection, index) => (
          <div className={cx("select")} key={index}>
            <span className={cx("select__label")}>{selection.type}</span>
            <FontAwesomeIcon icon={faChevronDown} />
            <ul className={cx("select__list")}>
              {selection.options.map((option, ind) => (
                <li className={cx("select__item")} key={index + ind}>
                  <Link
                    to={`?sortBy=${selection.type}&order=${option.sortType}`}
                    className={cx("select__link")}
                    onClick={() =>
                      {
                        // isChecked(selection.type, option.sortType)
                        onGetSortValue(selection.type, option.sortType)
                      }
                    }
                  >
                    {option.title}
                  </Link>
                  {/* <FontAwesomeIcon
                    icon={faCheck}
                    className={cx("select__item--active")}
                  /> */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <PaginationLinks meta={meta} onPageClick={onPageClick} isFilter={true} />
    </div>
  );
}

export default FilterProducts;
