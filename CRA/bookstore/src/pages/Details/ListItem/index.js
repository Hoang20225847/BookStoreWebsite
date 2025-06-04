import   '../../../components/assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import { getBookList } from '../../../app/api/siteApi';
import DiscountPrice from '../../../components/function/function';
function ListItem({category,id}) {
    const[data,setData]=useState(null);
    useEffect(()=>{
        async function fetchData() {
            const json = await getBookList();
           setData(json);     
        }
        fetchData();
    },[])
    if(!data) return <div>Đang tải</div>
    return (
        <div className="grid__row">
            {data.map((item,idx) => {
                if(item.category ===category && item._id != id)
                    return(
           <div key={idx} className="grid__column-2-4 ">
           
           <a href={`/details/${encodeURIComponent(item.name)}`} className="home-product-item">
                 <div className="home-product-item__img" style={{ backgroundImage: `url('${item.img}')`}} ></div>
                   <h4 className="home-product-item__name">{item.name}  </h4>
                { item.discount ?  ( <div className="home-product-item__price">
                       <span className="home-product-item__price-old">{item.price}</span>
                       <span className="home-product-item__price-current">{DiscountPrice(item.price,item.discount)}.000đ</span>    
                   </div>):(<span className="home-product-item__price-current">{item.price}đ</span>     )
                   }
                   <div className="home-product-item__action">
                       <span className="home-product-item__like home-product-item__like--liked">
                           <i className="home-product-item__like-icon-empty fa-regular fa-heart"></i>
                           <i className="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                       </span>
                       <span className="home-product-item__rating">
                        <span className="item-evaluate">{item.evaluate}</span>
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                           <i className="home-product-item-star--gold fa-solid fa-star"></i>
                            <i className="home-product-item-star--gold fa-solid fa-star"></i>
                          {/* <i className=" fa-solid fa-star"></i> */}
                       </span>
                       <span className="home-product-item__sold">{item.sold} đã bán</span>
                   </div>
                   <div className="home-product-item__origin">
                       <span className="home-product-item__brand">BookStore</span>
                       <span className="home-product-item__origin-name">nam định</span>
                   </div>
                  { item.isFavourite && <div className="home-product-item__favourite">
                       <i className="home-product-item__favourite-icon fa-solid fa-check"></i>
                            <span>yêu thích</span>
                   </div> }
                   {item.discount>0 && <div className="home-product-item__sale-off">
                       <span className="home-product-item__sale-off-percent">{item.discount}%</span>
                       <span className="home-product-item__sale-off-label">GiẢM</span>
                   </div>}
               </a>
       </div>
        )
            })}
                               
                               
                               
                                
                                
                             </div>
      );
}

export default ListItem;