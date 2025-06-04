import styles from '../Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import axios from '../axios/axios.customize'
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function AddBookModal({ onClose,onAddSuccess}) {
    const handleSubmit=async (e) =>{
        e.preventDefault();
        const formData={
            name:e.target.name.value,
            description:e.target.description.value,
            image:e.target.image.value,
            category:e.target.category.value,
            price:e.target.price.value

        }
        try{
            const newBook= await axios.post('/api/books',formData)
            if(onAddSuccess) onAddSuccess(newBook);
            toast.success('Thêm Sách Thành Công ')
             onClose();
           
        }
        catch(error){
             toast.error('Thêm sách không thành công ')
        }
    }
    return (  
       <form onSubmit={handleSubmit} >
            <div onClick={onClose} className={cx('modal')}>
              <div onClick={(e) => e.stopPropagation()} className={cx('modal-container')}>
                <div className='address-modal'>
                  <h2>Thêm Sách Mới</h2>
                <input name="name" className={cx('input-1')} type="text "placeholder='Tên Sách'/>
               <div className={cx('input-price-cate')}>
                    <input name="price" className={cx('input-2')} type="text "placeholder='Giá niêm yết'/>
                    <select name="category" className={cx('input-2')}>
                      <option value="">-- Chọn thể loại --</option>
                      <option value="1">1 - Xã hội</option>
                      <option value="2">2 - Thiếu nhi</option>
                      <option value="3">3 - Lịch Sử</option>
                      <option value="4">4 - Kinh dị</option>
                    </select>
               </div>
                <input name="image" className={cx('input-1')} type="text" placeholder='IMG'/>
                <textarea rows={5} name="description" className={cx('input-big')}type="text "placeholder='Mô Tả Sách'/>
                  <div className="modal-address-btn">
                    <button onClick={onClose} type="button"   className="btn modal-btn-back ">Trở lại</button>
                    <button type="submit" className="btn">Hoàn thành</button>
                  </div>
                  </div>
              </div>
            </div>
          </form >
    );
}

export default AddBookModal;
