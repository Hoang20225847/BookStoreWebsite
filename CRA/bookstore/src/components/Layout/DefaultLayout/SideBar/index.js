import   '../../../assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Sidebar() {
    const [filter,setFilter]=useState(5);
    return (
       
                    <div className="grid__column-2">
                        <nav className="category">
                            
                            <h3 className="category__heading">
                                <i className="category__heading-icon fa-solid fa-list"></i>
                                Danh mục
                            </h3>
                            <ul className="category-list">
                                <a href="/" className={`category-item__link ${filter ==5 ?'category-item--active':'' } `}>Sản Phẩm</a>
                                <li onClick={(e)=>{
                                e.preventDefault();
                                setFilter(0)

                                }} className="category-item">
                        
                                        <Link  to="/search?category=1"  className={`category-item__link ${filter ==0 ?'category-item--active':'' } `}>Sách xã hội</Link>
                                </li>
                                <li onClick={(e)=>{
                                e.preventDefault();
                                setFilter(1)

                                }} className="category-item">
                                        <Link  to="/search?category=2"  className={`category-item__link ${filter ==1 ?'category-item--active':'' } `}>Sách Thiếu Nhi</Link>
                                </li>
                                <li onClick={(e)=>{
                                e.preventDefault();
                                setFilter(2)

                                }} className="category-item">
                                        <Link  to="/search?category=3"  className={`category-item__link ${filter ==2 ?'category-item--active':'' } `}>Sách Lịch sử</Link>
                                </li>
                                <li onClick={(e)=>{
                                e.preventDefault();
                                setFilter(3)

                                }} className="category-item">
                                        <Link  to="/search?category=4"  className={`category-item__link ${filter ==3 ?'category-item--active':'' } `}>Sách Kinh Dị </Link>
                                </li>
                            </ul>
                        </nav>
                       
                    </div>
                    
     
      )
}

export default Sidebar