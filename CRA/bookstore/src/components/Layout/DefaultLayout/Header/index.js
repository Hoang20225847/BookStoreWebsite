import   '../../../assets/css/main.css'

import qrcode from '../../../assets/img/qr_code.png'
import appstore from '../../../assets/img/app_store.png'
import googleplay from '../../../assets/img/google_play.png'
import axios from '../../../axios/axios.customize'
import logo from '../../../assets/img/logo.png'
import {getCart} from '../../../../app/api/CartApi'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../../context/auth.context'
import { useNavigate } from 'react-router-dom';
import shoppingno from '../../../assets/img/shopping.png'



function Header() {
    const navigate = useNavigate();
   const { auth,setAuth} = useContext(AuthContext);
   const [data,setData] = useState(null);
   let count=0
   useEffect (()=>{
    async function fetchData(){
        try{
            const json =await getCart(auth.user.email)
            setData(json)
        }
        catch(error)
        {
            console.log(error)
        }
    }
    fetchData();
  },[auth?.user?.email])
   if (auth.loading) {
    return <div>Đang kiểm tra đăng nhập...</div>; // Hoặc spinner
  } 
  
  let isAdmin=false;
  if(auth.user.role==="admin")
    isAdmin=true;

  const handleSearch =async(e) =>{
    e.preventDefault();
    const keyword=document.getElementById('searchInput').value.trim();
    if(!keyword){
        return;
    }
    
    
     navigate(`/search?keysearch=${encodeURIComponent(keyword)}`);
  }

    return (
      <header className="header">
      <div className="grid">
          
          <nav className="header__navbar">
      <ul className="header__navbar-list">
          <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
              Vào cửa hàng
              <div className="header__qr">
                  <img src={qrcode} alt="QR code" className="header__qr-img"/>
                  <div className="header__qr-apps">
                      <a href="/" className="header__qr-link">
                       <img src={appstore} alt="" className="header__qr-dowload-img"/>
                      
                      </a>
                      <a href="" className="header__qr-link">
                          
                         <img src={googleplay} alt="" className="header__qr-dowload-img"/>
                         </a>
                      

                  </div>
              </div>
          </li>
          <li className="header__navbar-item"><span className="header__navbar-title--repair">Kết nối</span>
              <a href="https://www.facebook.com/hoanggn28/" className="header__navbar-icon-link"><i className="header__navbar-icon fa-brands fa-facebook"></i></a>
              <a href="https://www.instagram.com/hoanggn_2802/" className="header__navbar-icon-link"><i className="header__navbar-icon fa-brands fa-instagram"></i></a>

          </li>
      </ul>
      <ul className="header__navbar-list">
          <li className="header__navbar-item header__navbar-item--has-notify"><a href="" className="header__navbar-item-link">
              <i className="header__navbar-icon fa-solid fa-bell"></i>Thông báo </a>
          <div className="header__notify">
              <header className="header_notify-header">
                  <h3>Thông báo mới nhận</h3>
              </header>
                  <ul className="header__notify-list">
                      <li className="header__notify-item header__notify-item--viewed">
                          <a href="" className="header__notify-link">
                             
                              <div className="header__notify-info">
                                  <span className="header__notify-name">Sách chính hãng</span>
                                  <span className="header__notify-description">Mô tả sản pham</span>
                              </div>
                          </a>
                      </li>
                      <li className="header__notify-item header__notify-item--viewed">
                          <a href="" className="header__notify-link">
                             
                              <div className="header__notify-info">
                                  <span className="header__notify-name">Sách chính hãng</span>
                                  <span className="header__notify-description">Mô tả sản pham</span>
                              </div>
                          </a>
                      </li>
                      <li className="header__notify-item header__notify-item--viewed">
                          <a href="" className="header__notify-link">
                             
                              <div className="header__notify-info">
                                  <span className="header__notify-name">Sách chính hãng</span>
                                  <span className="header__notify-description">Mô tả sản pham</span>
                              </div>
                          </a>
                      </li>
                      <li className="header__notify-item header__notify-item--viewed">
                          <a href="" className="header__notify-link">
                             
                              <div className="header__notify-info">
                                  <span className="header__notify-name">Sách chính hãng</span>
                                  <span className="header__notify-description">Mô tả sản pham</span>
                              </div>
                          </a>
                      </li>
                  </ul>
              <footer className="header__notify-footer">
                  <a href="" className="header__notify-footer-btn">Xem tất cả</a>
              </footer>    
              
          </div>
          </li>
         
          <li className="header__navbar-item"><a href="" className="header__navbar-item-link"><i className="header__navbar-icon fa-regular fa-circle-question"></i>Trợ giúp</a></li>
          {
             auth.isAuthenticated ?
                (
              <li className="header__navbar-item header__navbar-user">
                  <img src={auth.user.avt} alt="" className="header__navbar-user-img"/>
                  <span className="header__navbar-user-name">{auth.user.name}</span>
                  <ul className="header__navbar-user-menu">
                    {
                       isAdmin && <li className="header__navbar-user-item">
                          <a href="/admin">Trang Quản lý Sách</a>
                      </li>
                    }
                      <li className="header__navbar-user-item">
                          <a href="/profile">Tài khoản của tôi</a>
                      </li>
                      <li className="header__navbar-user-item">
                          <a href="/profile/address">Địa chỉ</a>
                      </li>
                      
                      <li className="header__navbar-user-item">
                          <a href="/cart">Giỏ hàng</a>
                      </li>
                      <li className="header__navbar-user-item header__navbar-user-item--separate">
                          <a onClick={(e)=>{
                            e.preventDefault();
                            setAuth({isAuthenticated:false,
                                    user:{
                                     email:"",
                                        name:"",
                                        role:""

                            }})
                            localStorage.clear("access_token")
                            navigate('/login')
                          }} href="">Dang xuat</a>
                      </li>
                  </ul>
              </li> )
                        :(
                        <div className="header__navbar-item header__navbar-user">
               <li className="header__navbar-item "><a href="/regis" className="header__navbar-item-link header__navbar-item-link--strong header__navbar-item--separate">Đăng ký</a></li>
            <li className="header__navbar-item "><a href="/login" className="header__navbar-item-link header__navbar-item-link--strong">Đăng Nhập</a></li>
            </div>)
          }



          
      </ul>
          </nav>
          <div className="header-with-search">
              <div className="header__logo">
                  <a href="/" className="header__logo-link">
                      <img src={logo} alt="" className="header__logo-img"/>
                      <h3 className="header__logo-name">BookStore</h3>
                  </a>
                  
                 
              </div>
              <div className="header__search">
                  <div className="header__search-inbut-wrap">
                      <input id="searchInput" type="text" className="header__search-input" placeholder="Tìm kiếm sản phẩm"/>
                 
                  </div>
                     
                      <button onClick={handleSearch} className="header__search-btn">
                          <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
                      </button>
                     
              </div>
              <div className="header__cart">
                    <div className="header__cart-wrap">
                           
                        <i className="header__cart-icon fa-solid fa-cart-shopping"></i>
                        
                          <span className="header__cart-notice">{data ? data.length : 0}</span>
                        <div className="header__cart-list">

                           { !data ? 
                           ( <div>
                                <img src={shoppingno} className="header__cart-no-cart-img"/>:
                                <span className="header__cart-list-no-cart-msg">Chua co san pham</span>
                            </div>):
                           ( <div>
                                <h4 className="header__cart-heading">Sản Phẩm Trong Giỏ</h4>
                                <ul className="header__cart-list-item">
                                    { data.map((item,idx)=>{
                                         let categoryName = '';
                                         console.log(item)

        switch (item.bookId.category) {
    case 1:
      categoryName = 'Xã hội';
      break;
    case 2:
      categoryName = 'Thiếu nhi';
      break;
    case 3:
      categoryName = 'Lịch sử';
      break;
    case 4:
        categoryName = 'Kinh dị';
        break;
    default:
      categoryName = 'Không rõ';}
                                        return(
                                            <a href='/cart' className="header__cart-item">
                                        <img src={item.bookId.img} alt="" className="header__cart-img"/>
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5 className="header__cart-item-name">{item.bookId.name}</h5>
                                                <div className="header__cart-item-price-wrap">
    
                                                    <span className="header__cart-item-price">{item.price}.000đ</span>
                                                    <span className="header__cart-item-multiply">x</span>
                                                    <span className="header__cart-item-qnt">{item.quantity}</span>
                                                </div>
                                            </div>
                                            <div className="header__cart-item-body">
                                                <span className="header__cart-item-description">{ categoryName}</span>
                                                
                                            </div>
                                        </div>
                                        </a>
                                        )
                                    }
                                    
                                )
                                    }
                                    
                                </ul>
                            </div>)}
                            <a href="/cart" className="header__cart-view-cart btn btn--primary">Xem giỏ hàng</a>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  </header>
      );
}

export default Header;