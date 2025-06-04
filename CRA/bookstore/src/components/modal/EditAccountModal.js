import styles from '../Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react';
const cx = classNames.bind(styles);
function EditAccountModal({account,onClose,onSave}) {
    const [formData,setFormData]= useState({
      name:account.name,
      password:'',
      avt:account.avt

    })
    const handleChange=(e)=>{
      const {name,value} =e.target;
      setFormData((prev)=>({
        ...prev,
        [name]:value
      })

      )
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      const updateAccount={
        ...account,
        ...formData,
      }
      if(onSave) onSave(updateAccount)
        onClose();
    };
    return (  
       <form onSubmit={handleSubmit}>
            <div onClick={onClose} className={cx('modal')}>
              <div onClick={(e) => e.stopPropagation()} className={cx('modal-container')}>
                <div className='address-modal'>
                  <h2 className={cx('yellow')}>Edit AccountUser</h2>
                  <span className={cx('Edit-title')}>Tên</span>
                <input onChange={handleChange} value={formData.name} name="name" className={cx('input-1')} type="text" placeholder='Tên Sách'/>
                <span className={cx('Edit-title','red')}>Password</span>
                <input onChange={handleChange}  value={formData.password} name="password" className={cx('input-1')} type="password" placeholder='password'/>
               <span className={cx('Edit-title')}>Avartar</span>
                <input onChange={handleChange} value={formData.avt} name="avt" className={cx('input-1')} type="text" placeholder='IMG'/>
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

export default EditAccountModal;
