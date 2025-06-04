import styles from '../../components/Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react';
import {getListOrder,removeOrder} from '../../app/api/OrderApi.js';
import DiscountPrice from '../../components/function/function.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from '../../components/axios/axios.customize.js'
import EditOrderModal from '../../components/modal/EditOrderModal.js'
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function ManageOrder() {
  const [data, setData] = useState(null);
    const [editOrder,setEditOrder]=useState(null)
    const [showEditModal,setShowEditModal]=useState(false)
    const openEditModal =(order) =>{
        setEditOrder(order);
        setShowEditModal(true);
    }
  useEffect(() => {
    async function fetchData() {
      const json = await getListOrder();
      console.log(json)
      setData(json);
    }
    fetchData();
  }, []);
const handleDelete =(idx) =>{
      removeOrder(data[idx]._id);
      setData(prev => prev.filter(item => item._id !== data[idx]._id))
  
    }
    const handleSave= async (item) =>{
        try{ 
            console.log(item)
            const response= await axios.put('/api/order',item)
            const json = await getListOrder();
      setData(json);
            toast.success('Update Thanh Cong')
        }catch(error){
            toast.error('error')
        }
    }
    const handleSearch = async(e)=>{
  e.preventDefault();
  const keySearch =document.getElementById('searchInput').value.trim();
  if(!keySearch)
  {
    return;
  }
  document.getElementById('searchInput').value=""
  try{
 const response= await axios.get(`/api/order/search?key=${encodeURIComponent(keySearch)}`);
 if(!response)
 {
  toast.success('Không tồn tại')
  
 }
 console.log(response)
setData(response)
  }catch(error){
   console.log(error)
   toast.error('Lỗi Tìm Kiếm1')

  }
}
  if (!data) return <div>Đang tải...</div>;
    return ( 
    <div>
        <div className="admin-nav">
           <div className={`${cx('logo-search')} admin-title`}>
            <div>
                  <i className="fa-solid fa-receipt "></i>
                 <span className="admin-title-name">Quản Lý Đơn Hàng</span>
            </div>
               <div className={`${cx('header-search')} `}>
                           
                           <div className={`${cx('search')} header__search`}>
                               <div className="header__search-inbut-wrap">
                                   <input id="searchInput" type="text" className={`${cx('input-search')} header__search-input`} placeholder="Tìm kiếm sản phẩm"/>
                               
                               </div>
                                  
                                   <button onClick={handleSearch} className="header__search-btn ">
                                       <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
                                   </button>
                           </div>
                           
                       </div>
             </div>
          
            {/*      */}
        </div>
        <div className={cx('admin-user')}>
            <div className={cx('admin-user-content')}>
                <h2 className={cx('admin-user-title')}>Orders</h2>
                <div className={cx('admin-user-form')}>
                    <span className={cx('Account-title','column-1')}>Mã Đơn</span>
                    <span className={cx('Account-title','column-3')}>Sản Phẩm</span>
                    <span className={cx('Account-title','column-1')}>Email</span>
                     <span className={cx('Account-title','column-2')}>Địa chỉ</span>
                     <span className={cx('Account-title','column-1')}>Thanh toán</span>
                    <span className={cx('Account-title','column-1')}>Tổng tiền</span>
                    <span className={cx('Account-title','column-1')}>Tình trạng</span>
                    <span className={cx('Account-title','column-small')}>Thao tác</span>
                </div>
                {  Array.isArray(data) && data.length > 0 ?(
                    data.map((item,idx)=> {
                        return(

                    <div key={idx} className={cx('user-item')}>
                    <span className={cx('column-1')}>{item._id}</span>
                   <div className={cx('column-3-product')} >
                       { item.items.map( (book,idx) => {
                        return(
                                 <span key={idx}>x{book.quantity} {book.bookId.name}</span>
                        )
                           
                            }
                        )
                       }
                       
                   </div>
                    <span className={cx('column-1')}>{item.email}</span>
                    <span className={cx('column-2')}>{item.address.details} {item.address.province}</span>
                    <span className={cx('column-1')}>{item.isPay ? (<span className={cx('valid')}>Đã Thanh Toán</span>):(<span className={cx('notpay')} >Chưa Thanh Toán</span>)}</span>
                    <span className={cx('column-1')}>{item.totalAmount}.000đ</span>
                    <span className={cx('column-1')}>{item.status}</span>
                    <div className={cx('column-small','controll-user')}>
                        <span onClick={() => handleDelete(idx)} className={cx('btn-controll')}>Xóa</span>
                        <span onClick={() => openEditModal(item) }  className={cx('btn-controll')}>Sửa</span>
                    </div>
                </div>
                    )
                }
                    )
                ):( <h3>Chưa có đơn hàng nào</h3>)
                }
               
                 
            </div>
        </div>
        { showEditModal &&
        ( <EditOrderModal
             Order={editOrder}
             onClose={()=>setShowEditModal(false)}
             onSave={handleSave}  
         />)
        }
        
         
        
    </div>
      
     );
     
}

export default ManageOrder;