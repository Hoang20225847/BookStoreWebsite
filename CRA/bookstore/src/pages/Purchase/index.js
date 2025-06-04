import Header from '../Home'
import { useContext, useEffect, useState } from 'react';
import { getOrder,statusOrder,reviewOrder } from '../../app/api/OrderApi';
import styles from './Purchase.module.scss'
import classNames from 'classnames/bind';
import book1 from '../../components/assets/img/book1.PNG'
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
 import { ToastContainer, toast } from 'react-toastify';
 import AddReviewModal from '../../components/modal/AddReviewModal'
import { AuthContext } from '../../components/context/auth.context';
const cx=classNames.bind(styles)
function Purchase() {
    const{auth}=useContext(AuthContext)
    const [data,setData]=useState(null)
    const location=useLocation();
    const[showAddModal,setShowAddModal]=useState(false)
    const [reviewItems,setReviewItems]=useState([])
    const [currentIndex,setcurrentIndex]=useState(0);
    const [currentOrderId,setcurrentOrderId]=useState(null);
    const queryParams=new URLSearchParams(location.search)
    const status=queryParams.get('status');
    const[filter,setFilter]=useState(0);
       const navigate = useNavigate()
useEffect(()=>{
    const q =new URLSearchParams(location.search)
        const payment= q.get('payment')
        if(payment == 'success'){
          toast.success('Đặt hàng thành công')
            navigate('/profile/purchase', { replace: true });
        }
        if(payment== 'failed'){
           toast.error('Đặt hàng Thất bại')
             navigate('/profile/purchase', { replace: true });
        }
         
    async function fetchData() {
       try{ 
       
        const json= await getOrder(auth.user.email)
        if(!status || status == 0)
           {setData(json);
        } 
          if(status ==1)
                    { setData( json.filter(item => item.status == 'Chờ xử lý') );}
            if(status ==2)
                    { setData( json.filter(item => item.status == 'Đang giao') );}
           
        
            if(status ==3)
                    { setData( json.filter(item => item.status == 'Hoàn thành') );}
            
     
            if(status == 4)
                    { setData( json.filter(item => item.status == 'Đã hủy') );}
           
       }
       catch(err){
      console.log(err)
       }

    }
    fetchData();
},[auth?.user?.email,status])
const handleUpdate = async(e,_id,action) =>{
    e.preventDefault();

    confirmAlert({
        title:action=="cancel"?"Xác Nhận Hủy Đơn":"Xác nhận giao hàng thành công",
        message:action=="cancel"?'Bạn có chắc chắn muốn hủy đơn hàng này không':"Bạn có chắc đã nhận hàng thành công ?",
        buttons:[
            {
                label:'Đồng ý',
                onClick: async () => {
          try {
            await statusOrder(_id);
            try{ 
        
        const json= await getOrder(auth.user.email)
        if(!status || status == 0)
           {setData(json);
        } 
          if(status ==1)
                    { setData( json.filter(item => item.status == 'Chờ xử lý') );}
            if(status ==2)
                    { setData( json.filter(item => item.status == 'Đang giao') );}
           
        
            if(status ==3)
                    { setData( json.filter(item => item.status == 'Hoàn thành') );}
            
     
            if(status == 4)
                    { setData( json.filter(item => item.status == 'Đã hủy') );}
           
       }
       catch(err){
      console.log(err)
       }
            toast.success(action=="cancel"?'Hủy đơn hàng thành công!':"Xác nhận giao hàng thành công");
          } catch (error) {
            toast.error(action =="cancel"?'Hủy đơn hàng thất bại!':"Xác nhận giao hàng chưa thành công");
          }
        }
            },
             {
        label: 'Không',
        onClick: () => {} // Không làm gì
      }
        ]    
    })
    
}   

    


  
    return ( 

               <div className={cx('Purchase-container')}>
                <div className={cx('Purchase-title')}>
                    <Link onClick={()=>setFilter(0)}   to="/profile/purchase?status=0"   className={cx('Purchase-category', { 'filter-primary': filter == 0 })}>Tất cả</Link>
                     <Link onClick={()=>setFilter(1)}   to="/profile/purchase?status=1" className={cx('Purchase-category', { 'filter-primary': filter == 1 })}>Chờ xử lý</Link>
                    <Link onClick={()=>setFilter(2)}  to="/profile/purchase?status=2" className={cx('Purchase-category', { 'filter-primary': filter == 2 })}>Vận chuyển</Link>
                    <Link onClick={()=>setFilter(3)}  to="/profile/purchase?status=3" className={cx('Purchase-category', { 'filter-primary': filter == 3 })}>Hoàn Thành</Link>
                    <Link onClick={()=>setFilter(4)}  to="/profile/purchase?status=4" className={cx('Purchase-category', { 'filter-primary': filter == 4 })}>Đã Hủy</Link>

                </div>
                <div className={cx('Purchase-products')}>
                    { data ? (
                            data.map((item,idx) => {
                               
                                return(

                        <div key={idx} className={cx('Purchase-product')}>
                        <div className={cx('Purchase-product-header')}>
                            <div className={cx('Purchase-product-status')}>{item.status}</div>
                            <div className={cx('Purchase-product-status','flex-space')}>
                                <span className={cx('text-id')}>Trạng thái thanh toán:
                                    { item.isPay? (<span className={cx('valid')}>Đã Thanh Toán</span>):(<span className={cx('invalid')}>Chưa thanh toán</span>)}
                                </span>
                                <span className={cx('text-id')}>Mã Đơn hàng :     {item._id}</span>
                            </div>
                            </div>
                       
                        { item.items.map ((product,idx2) => 
                            
                            {   console.log('product',product)
                                return(<div key={idx2} className={cx('Purchase-product-info')}>
                                <Link to={`/details/${encodeURIComponent(product.bookId.name)}`} className={cx('purchase-product-text')}>
                                    <div className={cx('Purchase-product-intro')}>
                                        <img className={cx('Purchase-product-img')} src={product.bookId.img}/>
                                        <div className={cx('Purchase-product-title')}>
                                            <h3 className={cx('Purchase-product-name')}>{product.bookId.name}</h3>
                                            <span className={`${cx('Purchase-product-category')} text-blur `}>Phân loại hàng:Lịch sử</span>
                                            <span className={cx('Purchase-product-quantity')}>x{product.quantity}</span>
                                        </div>
                                    </div>
                                </Link >
                                <span className={cx('Purchase-total-cost')}>{product.totalPrice}.000đ</span>
                            </div>)}
                        )}
                        <div className={cx('Purchase-product-total')}>
                            <span className={`${cx('Purchase-product-total-text')} `}>Thành Tiền:</span>
                            <span className={cx('Purchase-product-total-cost')}>{item.totalAmount}.000đ</span>
                        </div>
                        { item.status=="Chờ xử lý" &&(

                            <div onClick={(e) => handleUpdate(e, item._id,"cancel")} className={`${cx('Purchase-btn')}`}>
                            <button className="btn btn--primary">Hủy</button>
                            </div>
                        )}
                         { item.status=="Đang giao" &&(

                            <div onClick={(e)=>handleUpdate(e,item._id,"Nhận đơn")}  className={`${cx('Purchase-btn')}`}>
                            <button className="btn btn--primary ">Đã Nhận Đơn Hàng</button>
                            <button className="btn btn--primary btn--disabled">Đang vận chuyển</button>
                            </div>
                        )}
                        { item.status=="Hoàn thành" &&(

                            <div  className={`${cx('Purchase-btn')}`}>
                                 <a href="/" className="btn btn--primary ">Tiếp tục mua hàng</a>
                            <button className="btn btn--primary btn--disabled">Hoàn Thành</button>
                            {!item.review ?(<button onClick={ async()=>{
                                setcurrentOrderId(item._id)
                                  
                                setReviewItems(item.items);
                                
                                setShowAddModal(true);
                            }}  className="btn btn--primary " id="review-btn">Đánh giá</button>):(<button className="btn btn--primary btn--disabled">Đánh giá</button>)}
                             {reviewItems.length>0&& showAddModal && <AddReviewModal 
                             onClose={() => {
                                setReviewItems([]);
                                
                                setShowAddModal(false)}
                                }
                                userId={auth.user.id}
                                product={reviewItems[currentIndex]}
                             onNext={async ()=>{
                                if(currentIndex<reviewItems.length-1)
                                {
                                    setcurrentIndex((prev)=>prev+1);
                                }
                                else{
                                    await reviewOrder(currentOrderId);
                                  const btnreview=document.getElementById('review-btn')
                                   if(btnreview)
                                   {
                                    btnreview.setAttribute('disabled', 'true');
                                    btnreview.classList.add('btn--disabled')
                                   }
                                setReviewItems([]);
                                setcurrentIndex(0);
                                setcurrentOrderId(null);
                                setShowAddModal(false)
                                }
                             }}     
                                />}
                            </div>
                        )}
                        { item.status=="Đã hủy" &&(

                            <div  className={`${cx('Purchase-btn')}`}>
                                 <a href="/" className="btn btn--primary ">Tiếp tục mua hàng</a>
                            <button className="btn btn--primary btn--disabled">Đã hủy</button>
                            </div>
                        )}
                        
                    </div>
                            )}

                            )
                    ):(<p>loading</p>)
                    }
                   
                </div>
               </div>
       
       
     );
}

export default Purchase;