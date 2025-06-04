import   '../../../assets/css/main.css'

import qrcode from '../../../assets/img/qr_code.png'
import appstore from '../../../assets/img/app_store.png'
import googleplay from '../../../assets/img/google_play.png'
import avt from '../../../assets/img/unnamed.jpg'
import logo from '../../../assets/img/logo.png'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import { useNavigate } from 'react-router-dom';
import styles from '../Admin.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
   const { auth,setAuth} = useContext(AuthContext);
   if (auth.loading) {
    return <div>Đang kiểm tra đăng nhập...</div>; // Hoặc spinner
  }
  const handleLogout=  (e) =>{
    e.preventDefault();
    setAuth({
        isAuthenticated:false,
        user:{
            email:"",
            name:"",
            role:""        }
    })
    localStorage.clear("access_token");
    navigate('/admin/login');

  }

    return (
   
          <header className={cx('header')}>
         
              
              <nav className={cx('header-navbar')}>
                <div className="header__logo">
                                  <a href="/" className="header__logo-link">
                                      <img src={logo} alt="" className="header__logo-img"/>
                                      <h3 className={`${cx('header-logo-name')} header__logo-name`}>BookStore</h3>
                                  </a>
                                  
                                 
                              </div>
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
             
              <li className="header__navbar-item">
                <a onClick={handleLogout} className="header__navbar-item-link">
               <i className="fa-solid fa-right-from-bracket"></i>
                Đăng xuất</a></li>
              {
                 auth.isAuthenticated ?
                    (
                  <li className="header__navbar-item header__navbar-user">
                      <img src={auth.user.avt} alt="" className="header__navbar-user-img"/>
                      <span className="header__navbar-user-name">{auth.user.name}</span>
                      
                  </li> )
                            :(
                            <div className="header__navbar-item header__navbar-user">
                   <li className="header__navbar-item "><a href="/regis" className="header__navbar-item-link header__navbar-item-link--strong header__navbar-item--separate">Đăng ký</a></li>
                <li className="header__navbar-item "><a href="/login" className="header__navbar-item-link header__navbar-item-link--strong">Đăng Nhập</a></li>
                </div>)
              }
    
    
    
              
                </ul>
              </nav>
    
          
      </header>
      
      );
}

export default Header;