import {useContext, useEffect, useState} from 'react'
import classNames from 'classnames/bind'
import styles from './Details.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import ListItem from "./ListItem";
import {useParams} from "react-router-dom"
import { getBookDetail } from '../../app/api/DetailApi';
import {getReviewBook} from '../../app/api/ReviewApi.js'
import DiscountPrice from '../../components/function/function.js'
import { AuthContext } from '../../components/context/auth.context.js';
import axios from '../../components/axios/axios.customize.js'
import { toast } from 'react-toastify';
import Review from './Review/index.js';
const cx = classNames.bind(styles);


function Details() {
    const navigate=useNavigate()
    const {auth}=useContext(AuthContext)
    const {slug}=useParams();
    const [item, setItem] = useState(null);
   const [countreview,setCountReview]=useState(0)
    useEffect(() => {
        async function fetchData() {
           const json = await getBookDetail(slug);
            setItem(json);
          
           
        }
        fetchData();
      }, [slug]);
      useEffect(() => {
  async function fetchReviews() {
    if (item) {
      const reviews = await getReviewBook(item._id); // đảm bảo hàm này trả về mảng
      console.log("reviews tra ve",reviews)
      if(Array.isArray(reviews))
        setCountReview(reviews.length);
    }
    
  }
  fetchReviews();
}, [item]);
     const handleCart= async(event) =>{
        event.preventDefault()
        console.log(auth)
        if(!(auth.isAuthenticated))
        {
            navigate('/login');
            return;
        }
                const email=auth.user.email
                const bookId= item._id
                const quantity=count
                const price=DiscountPrice(item.price,item.discount)
                const totalPrice=price*quantity;
                const formData={
                    email:email,
                    items:{
                        bookId,
                        quantity,
                        price,
                        totalPrice,
                    }
                }
                try{const data =await axios.post('/api/cart',formData)
                    
                    toast.success(data.message)
                }
                catch(error){
                    toast.error('Thêm thất bại')
                }
                
     } 
     
     
    const[count,setcount]=useState(1)
    if (!item) return <div>Đang tải dữ liệu...</div>;
     const handleCheckout = () =>{
        console.log(item);
        navigate('/checkout',{
            state:{
                from:'details',
                items:[{
                    bookId:item,
                    quantity:count,
                    price:DiscountPrice(item.price,item.discount),
                    totalPrice:DiscountPrice(item.price,item.discount)*count,
                    
                }]
            }
        })
     }
    return ( 
        <div className={cx('container')}>
           
            <div className="grid grid-detail">
                <div className={cx('Detail-product')}>
                    <div className={cx('Detail-product-imgs')}>
                            <img src={item.img} alt="" className={cx("Detail-product-img")}/>
                            <ul className={cx("List-product-img")}>
                            {item.img1 && <li><img src={item.img1} alt="" className={cx("Item-product-img")}/></li>}
                            {item.img2 && <li><img src={item.img2} alt="" className={cx("Item-product-img")}/></li>}
                            {item.img3 && <li><img src={item.img3} alt="" className={cx("Item-product-img")}/></li>}
                            {item.img4 && <li><img src={item.img4} alt="" className={cx("Item-product-img")}/></li>}
                            </ul>

                    </div>
                    <div className={cx('Detail-product-info')}>
                       <div className={cx('Product-title')}> <h2 className={cx('Detail-product-title')}>{item.name} </h2>
                       <a href="/" className='Back-home'>Quay trở về trang chủ</a>
                       </div>
                        <div className={cx('Product-rate-info')}>
                            <div className={cx('Product-rate')}>
                                <span className={cx('Product-rate-point')}>{item.evaluate}</span>
                                <i className="home-product-item-star--gold fa-solid fa-star"></i>
                                <i className="home-product-item-star--gold fa-solid fa-star"></i>
                                <i className="home-product-item-star--gold fa-solid fa-star"></i>
                                <i className="home-product-item-star--gold fa-solid fa-star"></i>
                                <i className="home-product-item-star--gold fa-solid fa-star"></i>
                            </div>
                            { <div className={cx('Product-asses')}>
                                <span className={cx('Product-asses-count')}>{countreview}</span>
                                <span>Đánh giá </span>
                            </div>}
                        </div>
                        <div className={cx('Detail-product-price')}>
                            <span>{DiscountPrice(item.price,item.discount)}.000đ</span>
                        </div>
                        <div className={cx('Product-trans')}>
                            <span className={cx('trans-label')}>Vận chuyển</span>
                            <div className={cx('Product-trans-info')}>
                            <i className={cx("fa-solid fa-truck-fast",'truck-logo')}></i>
                            <div className={cx('Product-trans-desc')}>
                                <span>Nhận từ 30 Th04 - 7 Th05</span>
                                <span className={cx('fee')}>Miễn phí vận chuyển</span>
                                <span className={cx('voucher')}>Tặng voucher nếu đơn giao sau thời gian trên</span>
                            </div>
                            </div>
                        </div>
                        <div className={cx('Product-order')}>
                            <span className={cx('trans-label')}>Số lượng</span>
                            <div className={cx('Producter-quantity')} >
                                <button onClick={()=>{
                                    if(count===1)
                                    {
                                        setcount(1)
                                    }
                                    else
                                    setcount(count - 1);
                                }}>-</button>
                                <input className={cx('Input-quantity', 'custom-input')} value={count}
                                 type="number"/>
                                 <button onClick={()=>{
                                    setcount(count + 1)
                                 }}>+</button>
                                 <span className={cx('quantity-label', 'trans-label')}>514 sản phẩm có sẵn</span>
                            </div>
                        
                        </div>
                        <div className={cx('Product-submit')}>
                           <button onClick={handleCart} className="btn btn--cart ">
                           <i className="fa-solid fa-cart-plus"></i>
                                 <span >Thêm vào giỏ hàng</span>
                           </button>
                           <button onClick={handleCheckout} className="btn btn--primary marginL10">
                                    <span>Mua ngay</span>
                           </button>
                        </div>
                        <div className={cx('Detail-description')}>
                            <h2 className={cx('Desc-title')}>Mô tả sản phẩm</h2>
                            <span className={cx('Desc-text')}>{item.description}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('Product-suggest')}>
                    <h2 className={cx('suggest-title')}>SẢN PHẨM CÙNG THỂ LOẠI</h2>
                    <div className="Product-suggest-list">
                        <ListItem category={item.category} id={item._id}/>
                    </div>
                </div>
                <div className={cx('Product-review')}>
                    {item&& <Review book={item}/>}
                </div>
            </div>
        </div>
     );
}

export default Details;