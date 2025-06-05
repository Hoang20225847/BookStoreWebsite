import   '../../../assets/css/main.css'
import styles from '../Admin.module.scss'
import classNames from 'classnames/bind'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Sidebar() {
    const [filter,setFilter]= useState(0)
    return (
       
                    <div className={`${cx('sidebar')} grid__column-2`}>
                        <nav className={cx('sidebar-content')}>
                            
                            <h3 className= {cx('sidebar-title')}>
                               
                                Trang quản lý 
                            </h3>
                            <ul className="category-list">
                               <Link to="/admin" onClick={(e)=>{setFilter(0)}} className={cx('category-item' ,`${filter==0?'category-item--primary':''}`)}>
                                    <i className="fa-solid fa-book-open "></i>
                                 <span  className={cx('category-title')}>Quản Lý Sách</span></Link>
                              
                                <Link to="/admin/Users" onClick={(e)=>{setFilter(1)}} className={cx('category-item' ,`${filter==1?'category-item--primary':''}`)}>
                                        <i className="fa-solid fa-users "></i>
                                        <span    className={cx('category-title')}>Quản Lý Người dùng</span>
                                </Link>
                                <Link to="/admin/Orders" onClick={(e)=>{setFilter(2)}} className={cx('category-item' ,`${filter==2?'category-item--primary':''}`)}>
                                        <i className="fa-solid fa-receipt "></i>
                                        <span className={cx('category-title')}>Quản Lý Đơn Hàng</span>
                                </Link>
                                <Link to="/admin/Statistics" onClick={(e)=>{setFilter(3)}} className={cx('category-item' ,`${filter==3?'category-item--primary':''}`)}>
                                        <i className="fa-solid fa-chart-line "></i>
                                        <span className={cx('category-title')}>Thống Kê</span>
                                </Link>
                            </ul>
                        </nav>
                       
                    </div>
                    
     
      )
}

export default Sidebar