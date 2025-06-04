import styles from '../Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import axios from '../axios/axios.customize'
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function AddReviewModal({ onClose,onNext,product,userId}) {
  console.log(product)

    const handleSubmit=async (e) =>{
        e.preventDefault();
        const formData={
            userId:userId,
            evaluate:e.target.evaluate.value,
            comment:e.target.comment.value,
           bookId:product.bookId._id,
           

        }
        try{
         const response =await axios.post('/api/review',formData)
         toast.success('Đánh Giá thành công')
         e.target.evaluate.value=""
        e.target.comment.value=""
           onNext();
           
        }
        catch(error){
             toast.error('Đánh giá không thành công ')
        }
    }
    return (  
       <form onSubmit={handleSubmit} >
            <div onClick={onClose} className={cx('modal')}>
              <div onClick={(e) => e.stopPropagation()} className={cx('modal-container')}>
                <div className='address-modal'>
                  <h2>Đánh giá</h2>
                <div className={cx('input-1','review-book-info')}>
                  <img className={cx('review-book-avt')} src={product.bookId.img} />
                  <span>{product.bookId.name}</span>
                </div>
               <div className={cx('input-price-cate')}>
                  
                    <select name="evaluate" className={cx('input-2')}>
                      <option value="">-- Đánh giá --</option>
                      <option value="1">1 - Điểm</option>
                      <option value="2">2 - Điểm</option>
                      <option value="3">3 - Điểm</option>
                      <option value="4">4 - Điểm</option>
                      <option value="5">5 - Điểm</option>
                    </select>
               </div>
               
                <textarea rows={5} name="comment" className={cx('input-big')}type="text "placeholder='Bình luận'/>
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

export default AddReviewModal;
