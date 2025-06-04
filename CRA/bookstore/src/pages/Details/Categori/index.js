
import React, { useEffect, useState } from 'react';
import { getBookList } from '../../app/api/siteApi.js';
import DiscountPrice from '../../components/function/function.js'
import { useLocation } from 'react-router-dom';



function Category() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category=queryParams.get('category');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const json = await getBookList();
      setData(json);
    }
    fetchData();
  }, []);
  if(!category) return <div>Không có sản phẩm</div>
  if (!data) return <div>Đang tải...</div>;
    return ( 
      <div className="grid__column-10">
      <div className="home-filter">
          <span className="home-filter__label">Sắp xếp theo</span>
          <button onClick={(e)=>{handleFilter(e,1)}} className="home-filter__btn btn">Phổ biến</button>
          <button onClick={(e)=>{handleFilter(e,)}} className="home-filter__btn btn  btn--primary">Mới nhất</button>
          <button onClick={(e)=>{handleFilter(e,)}} className="home-filter__btn btn">Bán chạy</button>
          <div className="select-input">
              <span className="select-input__label">
                  Giá
                  
              </span>
              <i className="select-input__icon fa-solid fa-angle-down"></i>
              <ul className="select-input__list">
                  <li className="select-input__item">
                      <a href="" className="select-input__link">Giá:Thấp đến cao</a>
                      
                      
                  </li>
                  <li className="select-input__item">
                     
                      <a href="" className="select-input__link">Giá:Cao đến thấp</a>
                  </li>
              </ul>
          </div>
          <div className="home-filter__page">
              <span className="home-filter__page-num">
                  <span className="home-filter__page-current">1</span>/14
              </span>
              <div className="home-filter__page-control">
                  <a href="" className="home-filter__page-btn home-filter__page-btn--disable">
                      <i className="home-filter__page-icon fa-solid fa-angle-left"></i>
                  </a>
                  <a href="" className="home-filter__page-btn">
                      <i className="home-filter__page-icon fa-solid fa-angle-right"></i>
                  </a>
              </div>
          </div>
      </div>
      <div className="home-product ">
      
           <div className="grid__row">
           {data.map((item, idx) => {
                if(item.category==category)
            return(
           <div key={idx} className="grid__column-2-4 ">
           
           <a href={`/details/${encodeURIComponent(item.name)}`} className="home-product-item">
                 <div className="home-product-item__img" style={{ backgroundImage: `url('${item.img}')`}} ></div>
                   <h4 className="home-product-item__name">{item.name}  </h4>
                   <div className="home-product-item__price">
                       <span className="home-product-item__price-old">{item.price}</span>
                       <span className="home-product-item__price-current">{DiscountPrice(item.price,item.discount)}.000đ</span>    
                   </div>
                   <div className="home-product-item__action">
                       <span className="home-product-item__like home-product-item__like--liked">
                           <i className="home-product-item__like-icon-empty fa-regular fa-heart"></i>
                           <i className="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                       </span>
                       <span className="home-product-item__rating">
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                           <i className=" fa-solid fa-star"></i>
                       </span>
                       <span className="home-product-item__sold">88 đã bán</span>
                   </div>
                   <div className="home-product-item__origin">
                       <span className="home-product-item__brand">Louis vuiton</span>
                       <span className="home-product-item__origin-name">nam định</span>
                   </div>
                   <div className="home-product-item__favourite">
                       <i className="home-product-item__favourite-icon fa-solid fa-check"></i>
                            <span>yêu thích</span>
                   </div>
                   <div className="home-product-item__sale-off">
                       <span className="home-product-item__sale-off-percent">{item.discount}%</span>
                       <span className="home-product-item__sale-off-label">GiẢM</span>
                   </div>
               </a>
       </div>
        )})}
              
              
           </div>
      </div>
      <ul className="pagination home-product__pagination">
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                  <i className="pagination-item__icon fa-solid fa-angle-left">

                  </i>
              </a>
          </li>
          <li className="pagination-item pagination-item--active">
              <a href="" className="pagination-item_link">
                 1
              </a>
          </li>
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                 2
              </a>
          </li>
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                 3
              </a>
          </li>
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                 4
              </a>
          </li>
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                 5
              </a>
          </li>
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                 ...
              </a>
          </li>
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                 14
              </a>
          </li>
          <li className="pagination-item">
              <a href="" className="pagination-item_link">
                  <i className="pagination-item__icon fa-solid fa-angle-right">

                  </i>
              </a>
          </li>
      </ul>
 </div>
     );
}

export default Category;