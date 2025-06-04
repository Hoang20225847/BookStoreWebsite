import styles from '../Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react';
const cx = classNames.bind(styles);
function EditBookModal({book,onClose,onSave}) {
  const [formData, setFormData] = useState({
  name:book.name,
  price:book.price,
  category:book.category,
  description:book.description,
  img:book.img,
  discount:book.discount,
  isFavourite:book.isFavourite,
})
const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'category' ? Number(value) : name === 'isFavourite' ? value === 'true': value

    }))
  };
  const handleSubmit =(e)=>{
    e.preventDefault();
    const updatedBook = {
    ...book, // giữ nguyên _id, etc
    ...formData,
  };
  if(onSave) onSave(updatedBook);
  onClose();
  }
    return (  
       <form onSubmit={handleSubmit} >
            <div onClick={onClose} className={cx('modal')}>
              <div onClick={(e) => e.stopPropagation()} className={cx('modal-container')}>
                <div className='address-modal'>
                  <h2 className={cx('yellow')}>Sửa Sách</h2>
                  <span className={cx('Edit-title')}>Tên</span>
                <input onChange={handleChange} value={formData.name} name="name" className={cx('input-1')} type="text "placeholder='Tên Sách'/>
                <span className={cx('Edit-title','green')}>Giá</span>
               <div className={cx('input-price-cate')}>
                     
                    <input onChange={handleChange} value={formData.price} name="price" className={cx('input-2')} type="text "placeholder='Giá niêm yết'/>
                    
                    <select onChange={handleChange} value={formData.category} name="category" className={cx('input-2')}>
                      <option value="">-- Chọn thể loại --</option>
                      <option value="1">1 - Xã hội</option>
                      <option value="2">2 - Thiếu nhi</option>
                      <option value="3">3 - Lịch Sử</option>
                      <option value="4">4 - Kinh dị</option>
                    </select>
               </div>
               <span className={cx('Edit-title')}>Image</span>
                <input onChange={handleChange} value={formData.img} name="image" className={cx('input-1')} type="text"placeholder='IMG'/>
                <span className={cx('Edit-title','red')}>Khuyến mãi (%)</span>
                <input onChange={handleChange}  value={formData.discount} name="discount" className={cx('input-1')} type="text"placeholder='discount'/>
                <span  className={cx('Edit-title')}>Mô tả Sách</span>
                <textarea onChange={handleChange}   rows={5} value={formData.description} name="description" className={cx('input-big')}type="text "placeholder='Mô Tả Sách'/>
                 <select onChange={handleChange} value={formData.isFavourite} name="isFavourite" className={cx('input-2')}>
                     
                      <option value="true">1 - Yêu Thích</option>
                      <option value="false">2 - Không Yêu Thích</option>
                      
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

export default EditBookModal;
