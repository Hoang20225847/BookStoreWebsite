
import React, { useEffect, useState } from 'react';
import { getBookList } from '../../app/api/siteApi.js';
import DiscountPrice from '../../components/function/function.js'
import { useLocation } from 'react-router-dom';
import axios from '../../components/axios/axios.customize.js';
import { toast } from 'react-toastify';

function Category() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category=queryParams.get('category');
     const keysearch=queryParams.get('keysearch'); 
      const [filter,setFilter]= useState(100);
  const [data, setData] = useState(null);
   
  useEffect(() => {
    async function fetchData() {
        if(keysearch && !category){
            try{
    const response= await axios.get(`/api/books/search?key=${encodeURIComponent(keysearch)}`);
    
    if(!response)
     {
    toast.error('Không tồn tại')

    }
setData(response)
  }catch(error){
   console.log(error)
   toast.error('Lỗi Tìm Kiếm1')

  }
}
      else
      {
        const json = await getBookList();
        console.log(json)
        console.log(category ? json.filter(item => item.category === category) :json)
        setData(category ? json.filter(item => item.category == category) :json);
    }
    }
    fetchData();
  }, [keysearch,category]);
const handleFilter = async (e,type)=>
 {  e.preventDefault()
      let sorted = [...data]; // clone mảng trước khi sort
   switch(type)
   {case 0:
    sorted.sort((a,b) => b.evaluate - a.evaluate)
    break;
    case 1:
        sorted.sort((a,b)=> new Date(b.createAt) -new Date(a.createAt)) 
        break;
    case 2:
        sorted.sort((a,b)=> b.sold - a.sold) 
        break;    
    case 3:
        sorted.sort((a,b)=> a.price - b.price) 
        break;  
    case 4:
        sorted.sort((a,b)=> b.price - a.price) 
        break;  
   }
   setFilter(type);
setData(sorted);
 }
  if (!data) return <div>Đang tải...</div>;
    return ( 
      <div className="grid__column-10">
     <div className="home-filter">
          <span className="home-filter__label">Sắp xếp theo</span>
          <button onClick={(e)=>{handleFilter(e,0)}} className={`home-filter__btn btn ${filter == 0 ?'btn--primary' :""}`}>Chất lượng</button>
          <button onClick={(e)=>{handleFilter(e,1)}} className={`home-filter__btn btn ${filter == 1 ?'btn--primary' :""}`}>Mới nhất</button>
          <button onClick={(e)=>{handleFilter(e,2)}} className={`home-filter__btn btn ${filter == 2 ?'btn--primary' :""}`}>Bán chạy</button>
          <div className="select-input">
              <span className="select-input__label">
                  Giá
                  
              </span>
              <i className="select-input__icon fa-solid fa-angle-down"></i>
              <ul className="select-input__list">
                  <li className="select-input__item">
                      <a onClick={(e)=>{handleFilter(e,3)}} href="#" className={`select-input__link ${filter == 3 ? 'input--primary' :""} ` }>Giá:Thấp đến cao</a>
                      
                      
                  </li>
                  <li className="select-input__item">
                     
                      <a onClick={(e)=>{handleFilter(e,4)}} href="#" className={`select-input__link ${filter == 4 ? 'input--primary' :""} ` }>Giá:Cao đến thấp</a>
                      
                  </li>
              </ul>
          </div>
          <div className="home-filter__page">
              <span className="home-filter__page-num">
                
              </span>
              <div className="home-filter__page-control">
                 
              </div>
          </div>
      </div>
      <div className="home-product ">
      
           <div className="grid__row">
           {data.map((item, idx) => {
              
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
        )})}
              
              
           </div>
      </div>
      <ul className="pagination home-product__pagination">
          <li className="pagination-item">
              
          </li>
         
          <li className="pagination-item">
             
          </li>
      </ul>
 </div>
     );
}

export default Category;