import { AuthContext } from '../../components/context/auth.context';
import Header from '../Home'
import { useState,useContext, useEffect } from 'react';
import axios from '../../components/axios/axios.customize'
import  {getAddress,setAddressDefault,deleteAddress }from '../../app/api/AddressApi';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Address() {
  const navigate=useNavigate();
  const {auth} =useContext(AuthContext)
  const [data,setData]=useState(null)
  useEffect(()=>{
const addBtn=document.querySelector('.js-add-address')
const modal=document.querySelector('.modal')
const removeBtn=document.querySelector('.js-modal-back')
const modalContainer=document.querySelector('.modal-container')
  function showAddAddress( ){
   if(modal)
   {
    modal.classList.add('open')
   }
  }
  function hideAddAddress(){
    if(modal)
        {
          modal.classList.remove('open')
        }
  }
  if(modal)
  {
    modal.addEventListener('click',hideAddAddress)
  }
  if(modalContainer)
  {
    modalContainer.addEventListener('click',function(event)
  {
    event.stopPropagation();
  })
  }
if(addBtn)
{
  addBtn.addEventListener('click', showAddAddress)
}
if(removeBtn){
  removeBtn.addEventListener('click',hideAddAddress)
}
 async function fetchData() {
  console.log(" Email trong useEffect:", auth.user.email);
      const json = await getAddress(auth.user.email);
      
       setData(json);
      
    }
    fetchData();
return ()=>{
   if (addBtn) addBtn.removeEventListener('click', showAddAddress);
    if (removeBtn) removeBtn.removeEventListener('click', hideAddAddress);
    if (modal) modal.removeEventListener('click', hideAddAddress);
    if (modalContainer) modalContainer.removeEventListener('click', function(event)
  {
    event.stopPropagation();
  });
}
  },[auth?.user?.email])
  const handleAdd= async (e) =>{
    e.preventDefault()
    const fullName=e.target.fullName.value;
    const phone=e.target.phone.value;
    const province=e.target.province.value;
    const detailsAdrs=e.target.detailsAdrs.value;
    const formAddress={
      user:auth.user.email,
      name:fullName,
      phone:phone,
      province:province,
       details:detailsAdrs,
       isDefault:false,
    }
    console.log(formAddress)
    try{
      const data = await axios.post('/api/address',formAddress)
      toast.success(data.message);
       window.location.reload();
    }
    catch(error){
        toast.error('Thêm địa chỉ không thành công')
    }


  }
  const handeSetDefault =async (id )=>{
   await setAddressDefault(id);
   const json = await getAddress(auth.user.email);
      
       setData(json);
  }
  
  const handleDelete= async (id) =>{
   await deleteAddress(id) 
   const json = await getAddress(auth.user.email);
      
       setData(json);
  }
  
    return ( 
       <div className='Address-content'>
        <div className="Address-title">
          <span className='Address-text'>Địa chỉ của tôi</span>
          <button className='btn btn--primary js-add-address'>+ Thêm địa chỉ mới</button>
        </div>
        <h2>Địa chỉ</h2>
        <ul className="Address-list">
         {Array.isArray(data) && data.length > 0 ? (
        data.map((item, idx) => (
          <li key={idx} className="Address-item">
            <div className='Address-info-update'>
              <div className='Address-user'>
                <span className='Address-name'>{item.name}</span>
                <span className='Address-phone text-blur'>{item.phone}</span>
              </div>
              <a onClick={()=>{handleDelete(item._id)}} className="Address-update">Xóa</a>
            </div>
            <div className="Address-info">
              <div className="Address-details">
                <span className='text-blur'>{item.details}</span>
                <span className='text-blur'>{item.province}</span>
              </div>
              { !item.isDefault ?
                 ( <button onClick={()=>handeSetDefault(item._id)} className='text-blur address-setfault'>Thiết lập mặc định</button>):<></>}
            </div>
           { item.isDefault ?
            (<span className="Address-current">Mặc định</span>):<></>}
          </li>
        ))
      ) : (
        <li>Không có địa chỉ nào</li> // Hiển thị thông báo nếu không có địa chỉ
      )}
          
        </ul>
       
          <form onSubmit={handleAdd}>
            <div className='modal'>
              <div className='modal-container'>
                <div className='address-modal'>
                  <h2>Địa chỉ mới </h2>
                  <div className='address-modal-info'>
                    <input name="fullName" className='address-modal-name' type="text "placeholder='Họ và tên'/>
                    <input name="phone" className='address-modal-phone' type="text "placeholder='Số điện thoại'/>
                  </div>
                  <input name="province" className='Address-province'  type="text "placeholder='Tỉnh/Thành Phố,Quận/Huyện,Phường'/>
                  <input name="detailsAdrs" className='Address-details' type="text "placeholder='Địa chỉ cụ thể'/>
                  <div className="modal-address-btn">
                    <button type="button"   className="btn modal-btn-back js-modal-back">Trở lại</button>
                    <button type="submit" className="btn">Hoàn thành</button>
                  </div>
                  </div>
              </div>
            </div>
          </form >
       </div>
       
     );
}

export default Address;