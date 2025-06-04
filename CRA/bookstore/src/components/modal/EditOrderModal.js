import styles from '../Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react';
const cx = classNames.bind(styles);
function EditOrderModal({Order,onClose,onSave}) {
  const [formData,setFormData]=useState({
    ...Order,
    address:{
      phone:Order.address.phone,
      details:Order.address.details,
      province:Order.address.province
    },
    status:Order.status
    
  })
  const handleChange= (e) =>{
    const {name,value}= e.target;
    if(['phone','details','province'].includes(name)){
      setFormData((prev)=>({
        ...prev,
        address:{
          ...prev.address,
          [name]:value,
        }
      }))
   }
   else{
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
   }

  }
  const handleSubmit= (e) =>{
    e.preventDefault();
    if(onSave) onSave(formData)
      onClose();
  }
    return (  
       <form onSubmit={handleSubmit} >
            <div onClick={onClose} className={cx('modal')}>
              <div onClick={(e) => e.stopPropagation()} className={cx('modal-container')}>
                <div className='address-modal'>
                  <h2 className={cx('yellow')}>Sửa Đơn Hàng</h2>
                  <span className={cx('Edit-title')}>Mã Đơn Hàng: {formData._id}</span>
                   <span className={cx('Edit-title')}>Email: {formData.email}</span>
                  <span className={cx('Edit-title')}>Số điện thoại</span>
                <input onChange={handleChange} value={formData.address.phone} name="phone" className={cx('input-1')} type="text "placeholder='Số điện thoại'/>
                <span className={cx('Edit-title','green')}>Địa chỉ</span>
               <div className={cx('input-price-cate')}>
                     
                    <input onChange={handleChange} value={formData.address.details} name="details" className={cx('input-2')} type="text "placeholder='Địa chỉ số nhà ,ngõ'/>
                    
                     <input onChange={handleChange}  value={formData.address.province} name="province" className={cx('input-2')} type="text "placeholder='Tỉnh Thành phố'/>
               </div>
                <span className={cx('Edit-title')}>Total: {formData.totalAmount}.000đ</span>
               <span className={cx('Edit-title')}>Tình Trạng</span>
                 <select onChange={handleChange} value={formData.status} name="status" className={cx('input-1')}>
                      <option value="">-- Chọn thể loại --</option>
                      <option value="Chờ xử lý">Chờ xử lý </option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                
                  <div className="modal-address-btn">
                    <button onClick={onClose} type="button"   className="btn modal-btn-back ">Trở lại</button>
                    <button type="submit" className="btn">Lưu</button>
                  </div>
                  </div>
              </div>
            </div>
          </form >
    );
}

export default EditOrderModal;
