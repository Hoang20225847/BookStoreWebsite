
import styles from './Cart.module.scss'
import classNames from 'classnames/bind'
import '../../components/assets/css/main.css'
import {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/context/auth.context'
import {getCart,updateCart,removeItemCart} from '../../app/api/CartApi'
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)

function Cart() {
const navigate = useNavigate();
  const[data,setData]= useState(null)
  const {auth}= useContext(AuthContext)
  useEffect(()=>{
      async function fetchData(){
        
        const listDetails = await getCart(auth.user.email)
          console.log(listDetails)
        setData(listDetails)
      }
      fetchData()

  },[auth?.user?.email])
  let totalCost=0
  let totalitem=0
  if(data){
    data.map(item =>{
      if(item.selected)
      {totalCost += item.totalPrice;
      totalitem += 1;}
    })
  }
  const handleToggleSelect = (idx) => {
  const updatedData = [...data];
  updatedData[idx].selected = !updatedData[idx].selected;
  setData(updatedData);
 updateCart(auth.user.email,data);
  // Nếu muốn gọi API để cập nhật backend:
  // await updateCartItem(auth.user.email, updatedData[idx]);
}
const handleChangeQuantity=(idx,value)=>{
 const updatedData=[...data];
 if((updatedData[idx].quantity + value) < 1) return;
 else{
  updatedData[idx].quantity += value;
  updatedData[idx].totalPrice =updatedData[idx].quantity*updatedData[idx].price;
  setData(updatedData);
  updateCart(auth.user.email,data)
 }
}
const handleRemove=async (id) =>{
  console.log(id)
 await removeItemCart(auth.user.email,id);
 const listDetails = await getCart(auth.user.email)
        setData(listDetails)
} 
const handleCheckout= () =>{
  const selectedItem=data.filter(item => item.selected)
  navigate('/checkout',{
    state:{
      from:'cart',
      items:selectedItem
    }
  })
}
;
    return ( 
      <div className="grid">
        <div className={`${cx('cart-container')} `}>
              <div className={cx('nav-title')}>
                <div className={cx('nav-info-selectall')}>
                  <input className={cx('nav-box')} type="checkbox"  />
                  <span className= "text-blur">Sản phẩm</span>
                </div>
                <div className={cx('nav-info-title')}>
                  <span className={`${cx('nav-text-s')} text-blur`}>Đơn giá</span>
                  <span className={`${cx('nav-text-l')} text-blur`}>Số Lượng</span>
                  <span className={`${cx('nav-text-l')} text-blur`}>Số Tiền</span>
                  <span className={`${cx('nav-text-s')} text-blur`}>Thao tác</span>
                </div>
              </div>
              { 
                data?.map((item,idx) => (
              <div key={idx} className={cx('cart-product')}>
                <div className={cx('cart-product-title')}>
                  <input onChange={()=>handleToggleSelect(idx)} className={cx('nav-box')} type="checkbox" checked={item.selected} />
                  <Link to={`/details/${encodeURIComponent(item.bookId.name)}`} className={cx('cart-productt')}>
                    <div className={cx('cart-product-info')}>
                      <img src={item.bookId.img} className={cx('cart-product-img')}/>
                      <span className={cx('cart-product-name')}>
                        {item.bookId.name}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className={cx('cart-product-quantity')}>
                  <span className={cx('cart-product-price','nav-text-s')}>{item.price}.000đ</span>
                  <div className={cx('cart-product-number','nav-text-l')}>
                    <button onClick={()=>handleChangeQuantity(idx,-1)} >-</button>
                    <input className={cx('cart-product-number-input')} value={item.quantity} />
                    <button onClick={()=>handleChangeQuantity(idx,+1)}>+</button>
                  </div>
                  <span className={cx('cart-product-total','nav-text-l')}>{item.totalPrice}.000đ</span>
                  <button onClick={()=>handleRemove(item.bookId._id)} className={cx('cart-product-rmbtn','nav-text-s')} > Xóa</button>
                </div>
              </div>
              ))

              }
              
              <div className={cx('cart-product-check')}>
                <span className={cx('cart-product-totalqty')}>Tổng cộng  ({totalitem} sản phẩm):</span>
                <span className={cx('cart-product-totalpri')}> {totalCost}.000đ</span>
                <a onClick={handleCheckout} className={`${cx('cart-btn')} btn btn--primary`}>Mua Hàng</a>
                </div> 
            </div>
          </div>
        
      
     );
}

export default Cart;