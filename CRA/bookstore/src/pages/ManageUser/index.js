import styles from '../../components/Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react';
import { getBookList } from '../../app/api/siteApi.js';
import DiscountPrice from '../../components/function/function.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import book1 from '../../components/assets/img/book1.PNG'
import {getAccount,removeAccount} from '../../app/api/AccountApi.js'
import {getOrder} from '../../app/api/OrderApi.js'
import {getAddressDefault} from '../../app/api/AddressApi.js'
import EditAccountModal from '../../components/modal/EditAccountModal.js'
import axios from '../../components/axios/axios.customize.js'
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);




function ManageUser() {
  const [data, setData] = useState(null);
const [orders, setOrders] = useState({});
const [phone,setPhone]=useState({})
 const [showEditModal, setShowEditModal] = useState(false);
 const [editingAccount, setEditingAccount] = useState(null);
 const openEditModal = (account) => {
  setEditingAccount(account);
  setShowEditModal(true);
};
  useEffect(() => {
    async function fetchData() {
            
      const json = await getAccount();
      setData(json);
      const orderMap = {};
      const phoneMap={}
      for (const item of json) {
        try {
          const result = await getOrder(item.email); // Giả sử trả về array
          const address = await getAddressDefault(item.email)
          orderMap[item.email] = result.length;
          phoneMap[item.email] =address.phone
        } catch (err) {
          orderMap[item.email] = 0; // Nếu lỗi thì gán 0 đơn hàng
           phoneMap[item.email] = "null";
        }
      }
      setOrders(orderMap);
      setPhone(phoneMap);
    };
    fetchData();
  }, []);
  const handleDelete =(idx) =>{
      removeAccount(data[idx]._id);
      setData(prev => prev.filter(item => item._id !== data[idx]._id))
  
    }
    const handleSave=async (item) =>{
        try{
            const response=await axios.put('/api/account',{item})
            
            const json = await getAccount();
                setData(json);
            toast.success('Update Thành công')
            
                 }
        catch(error){
            toast.error('Update Thất bại')
        }
    }
    const handleSearch = async(event)=>{
        event.preventDefault();
        const keySearch=document.getElementById('searchInput').value.trim();
        if(!keySearch)
        {
            return;
        }
        try{
        const response=await axios.get(`/api/account/search?key=${encodeURIComponent(keySearch)}`)
        document.getElementById('searchInput').value=""
            setData(response);
        }catch(error){
            console.log(error);
            toast.error('Tìm kiếm thất bại')
        }
    }
  if (!data) return <div>Đang tải...</div>;
    return ( 
    <div>
        <div className="admin-nav">
           <div className={`${cx('logo-search')} admin-title`}>
            <div>
                 <i className="fa-solid fa-users "></i>
                 <span className="admin-title-name">Quản Lý Người Dùng</span>
            </div>
               <div className={`${cx('header-search')} `}>
                           
                           <div className={`${cx('search')} header__search`}>
                               <div className="header__search-inbut-wrap">
                                   <input id="searchInput" type="text" className={`${cx('input-search')} header__search-input`} placeholder="Tìm kiếm sản phẩm"/>
                              
                               </div>
                                  
                                   <button onClick={handleSearch} className="header__search-btn ">
                                       <i  className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
                                   </button>
                           </div>
                           
                </div>
             </div>
          
            {/*      */}
        </div>
        <div className={cx('admin-user')}>
            <div className={cx('admin-user-content')}>
                <h2 className={cx('admin-user-title')}>Account Users</h2>
                <div className={cx('admin-user-form')}>
                    <span className={cx('Account-title','size-l')}>Name</span>
                    <span className={cx('Account-title','size-l')}>Email</span>
                    <span className={cx('Account-title','size-l')}>Điện thoại</span>
                    <span className={cx('Account-title','size-s')}>Số Đơn Hàng</span>
                    <span className={cx('Account-title','size-s')}>Thao tác</span>
                </div>
                { data.map((item,idx)=>{
                    
                    return(
                        <div key={idx} className={cx('user-item')}>
                        <span className={cx('size-l')}>{item.name}</span>
                        <span className={cx('size-l')}>{item.email}</span>
                        <span className={cx('size-l')}>{phone[item.email] !== undefined ? phone[item.email]:'null'}</span>
                        <span className={cx('size-s')}>{orders[item.email] !== undefined ? orders[item.email]:'undefined'}</span>
                        <div className={cx('size-s','controll-user')}>
                            <span onClick={() => handleDelete(idx)} className={cx('btn-controll')}>Xóa</span>
                            <span onClick={()=>openEditModal(item)}  className={cx('btn-controll')}>Sửa</span>
                        </div>
                    </div>

                    )
                }
            )
                }
                  
            </div>
        </div>
        {showEditModal && (
                            <EditAccountModal
                            account={editingAccount}
                            onClose={() => setShowEditModal(false)}
                            onSave={handleSave}
                             // callback để cập nhật danh sách
                            />
                        )}
        
         
        
    </div>
      
     );
     
}

export default ManageUser;