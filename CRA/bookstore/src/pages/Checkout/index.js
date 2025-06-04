
import styles from './Checkout.module.scss'
import classNames from 'classnames/bind'
import vnpay from '../../components/assets/img/vnpay.png'
import momo from '../../components/assets/img/momo.png'
import cash from '../../components/assets/img/cash.png'

import '../../components/assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from '../../components/axios/axios.customize'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {getCart,updateCart} from '../../app/api/CartApi'
import {getAddressDefault} from '../../app/api/AddressApi'
import { AuthContext } from '../../components/context/auth.context';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles)

function Checkout() {
  const [paymentMethod,setPayMentMethod]=useState(0)
  const navigate=useNavigate();
  const[data,setData]=useState(null)
  const[address,setAddress]=useState(null)
  const location=useLocation();
  const {auth}=useContext(AuthContext)
const from = location.state?.from || '';
  useEffect(  ()=>{
    
   const fetchData = async () => {
    const {  items } = location.state || {  items: [] };
    setData(items);
   

   try{ const info = await getAddressDefault(auth.user.email);
    
    setAddress(info);}
    catch(error){
      console.log(error)
    }
  };

  fetchData();
},[auth?.user?.email])
  let totalPriceItem=0;
  const [transCost,setTransCost] =useState(30)
  if(data)
  {
    data.map(item =>{
      totalPriceItem += item.totalPrice;
    })
  }
  let totalCost=totalPriceItem+transCost;
  const handleOrder = async () =>{
    if(address==null)
    {
      toast.error('Vui lòng thêm địa chỉ')
      return;
    }
    const formData={
      email:auth.user.email,
      items:data,
      totalAmount:totalCost,
      address:{
        name:address.name,
        phone:address.phone,
        details:address.details,
        province:address.province
      }
    }
    console.log("form gửi đi khi đặt hàng là:",formData)
   if(paymentMethod==0){ try {
        const res=await axios.post('/api/order',formData)
         console.log(res);
        if(from === 'cart')
        {
          const cart=await getCart(auth.user.email)
          const remainingItems = cart.filter(item => !item.selected);
           await updateCart(auth.user.email, remainingItems);
        }
        navigate('/profile/purchase');
        toast.success(res.message)
    } catch(error){
        toast.error('Đặt Hàng không thành công')
    }}
    else if( paymentMethod===1){
      try{
        const res = await axios.post('/payapi/VnPay',formData)
        if(res) {
           window.location.href = res;
        }
       
      }
      catch(error){
        toast.error('Thanh Toan that bai')
      }
      
    }
     else if( paymentMethod===2){
      try{
        const res = await axios.post('/payapi/Momo',formData)
        
         if(res) {
            window.location.href = res;
         }
       
      }
      catch(error){
        toast.error('Thanh Toan that bai')
      }
      
    }

  }
    return ( 
      <div className="grid">
        <div className={`${cx('checkout-container')} `}>
          <div className={cx('checkout-info-customer')}>
            <div className={cx('checkout-info-content')}>
              <div className={cx('checkout-address-title')}>
              <i className="fa-solid fa-location-dot"></i>
              <span className={cx('address-title')}>Địa Chỉ Nhận Hàng</span>
              </div>
              { address ? (
                <div className={cx('checkout-info')}>
                <span className={cx('checkout-name')}>{address.name}</span>
                <span className={cx('checkout-phone')}>{address.phone}</span>
                <span className={cx('checkout-address')}>{address.details} {address.province} </span>
              <a href='/profile/address' className={cx('change-address-btn')}>Thay đổi</a>
              </div>) : ( <><span className={cx('text')}>Chưa có địa chỉ </span>
                <a href='/profile/address' className={cx('change-address-btn')}>Cập nhật</a></>)
                }
            </div>
          </div>
              <div className={cx('checkout-product')}>
                <div className={cx('checkout-grid')}>
                  <div className={cx('checkout-info-product')}>
                    <span className= "text-blur">Sản phẩm</span>
                  </div>
                  <div className={cx('check-info-title')}>
                    <span className={`${cx('checkout-text')} text-blur`}>Đơn giá</span>
                    <span className={`${cx('checkout-text')} text-blur`}>Số Lượng</span>
                    <span className={`${cx('checkout-text')} text-blur`}>Số Tiền</span>
                  </div>
                </div>
                { data && data.length >0 ? (
                  data.map((item,idx) => (
                  <div key={idx} className={cx('checkout-grid')}>
                  <div className={cx('checkout-info-product')}>
                    <img className={cx('checkout-product-img')} src={item.bookId.img}/>
                    <span className={cx('checkout-product-name')}>{item.bookId.name}</span>             
                  </div>
                  <div className={cx('check-info-title')}>
                  <span className={`${cx('checkout-text')} `}>{item.price}.000đ</span>
                  <span className={`${cx('checkout-text')} `}>{item.quantity}</span>
                  <span className={`${cx('checkout-text')} `}>{item.totalPrice}.000đ</span>

                  </div>
                </div>
                ))):(
                  <div><p>Chưa có sản phẩm trong giỏ hàng</p></div>
                )
                }
                
              </div>
              <div className={cx("wrapper-trans")}>
                <div className={cx('checkout-trans')}>
                  <div className={cx('checkout-attent')}>
                    <span className={cx('attent-title')}>Ghi chú</span>
                    <input className={cx('attent-input')} placeHolder="Lưu ý cho người bán"></input>
                  </div>
                  <div className={cx('checkout-trans-info')}>
                      <div className={cx('checkout-trans-method')}>
                        <span className={cx('method-title','right')}>Phương thức vận chuyển:   </span>
                        <span className={cx('method-title','center')}>Nhanh</span>
                        <a  className={cx('method-title','center','change-method')}>Thay đổi  </a>
                        <span className={cx('method-title','right')}>30.000đ</span>
                      </div>
                     
                  </div>
                </div>
              </div>
            
            
            
             
              <div className={cx('checkout-total-wrapper')}>
                    <div className={cx('checkout-total-content')}>
                      <div className={cx('checkout-pay')}>
                        <div >
                          <h2 className={cx('pay-method-title')}>Phương thức thanh toán</h2>
                          <label className={cx('payment-item')}>
                            
                            <input type="radio" name="my_radio_group" value="0" checked={paymentMethod===0} onChange={()=>{ setPayMentMethod(0)}} />
                            <img className={cx('logo-payment')} src={cash} />
                             Thanh Toán khi nhận hàng
                          </label>
                          <br />
                          <label className={cx('payment-item')}>
                            
                            <input type="radio" name="my_radio_group" value="1" checked={paymentMethod===1} onChange={()=>{ setPayMentMethod(1)}} />
                             <img className={cx('logo-payment')} src={vnpay} /> VnPay
                          </label>
                          <br />
                          <label className={cx('payment-item')}>
                            
                            <input type="radio" name="my_radio_group" value="2" checked={paymentMethod===2 } onChange={()=>{ setPayMentMethod(2)}} />
                             <img className={cx('logo-payment')} src={momo } /> MoMo
                          </label>
                          </div>
                       
                         <div className={cx('pay-method')}>
                          
                        
                          </div>                       
                      </div>
                     <div className={cx('cost-list')}>
                        <div className={cx('cost-item')}>
                          <span className={`${cx('cost-title')} text-blur`}>Tổng tiền hàng</span>
                          <span className={cx('cost-value')}>{totalPriceItem}.000đ</span>
                        </div>
                        <div className={cx('cost-item')}>
                          <span className={`${cx('cost-title')} text-blur`}>Tổng tiền phí vận chuyển </span>
                          <span className={cx('cost-value')}>{transCost}.000đ</span>
                        </div>
                        <div className={cx('cost-item')}>
                          <span className={`${cx('cost-title')} text-blur`}>Tổng Thanh Toán </span>
                          <span className={cx('cost-value-total')}>{totalCost}.000đ</span>
                        </div>
                     </div>
                     <div className={`${cx('btn-total')}  `}>
                      <button onClick={handleOrder} className="btn btn--primary">Đặt Hàng</button>
                     </div>
                      </div>  
              </div> 
            </div>
          </div>
        
      
     );
}

export default Checkout;