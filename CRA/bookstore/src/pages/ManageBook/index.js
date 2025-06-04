import styles from '../../components/Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import axios from '../../components/axios/axios.customize.js'
import React, { useEffect, useState } from 'react';
import { getBookList,removeBook } from '../../app/api/siteApi.js';
import DiscountPrice from '../../components/function/function.js'
import AddBookModal from '../../components/modal/AddBookModal.js'
import EditBookModal from '../../components/modal/EditBookModal.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import book1 from '../../components/assets/img/book1.PNG'
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);




function ManageBook() {
  const [data, setData] = useState(null);
 const [showAddModal, setShowAddModal] = useState(false);
 const [showEditModal, setShowEditModal] = useState(false);
 const [editingBook, setEditingBook] = useState(null);
  const openAddModal = () => setShowAddModal(true);
  const openEditModal = (book) => {
  setEditingBook(book);
  setShowEditModal(true);
};
  useEffect(() => {
    
    async function fetchData() {
      const json = await getBookList();
      setData(json);
    }
    fetchData();
   }, []);
  const handleDelete =(idx) =>{
    removeBook(data[idx]._id);
    setData(prev => prev.filter(item => item._id !== data[idx]._id))

  }
  const handleAddBook= (newBook) =>{
    setData(prev => [newBook, ...prev])
  }
const handleSaveBook =async (item) =>{
    try{    
          console.log(item)
            const response=await axios.put('/api/books',item)
            toast.success('Update Thành Công')
            setData((prevData) =>
            prevData.map((book) =>
          book._id === item._id ? { ...book, ...item } : book
        )
      );
    }
    catch(error)
    {
        toast.error('sửa thất bại')
    }
}
const handleSearch =async(e)=>{
  e.preventDefault();
  const keySearch =document.getElementById('searchInput').value.trim();
  if(!keySearch)
  {
    return;
  }
  document.getElementById('searchInput').value=""
  try{
 const response= await axios.get(`/api/books/search?key=${encodeURIComponent(keySearch)}`);
 if(!response)
 {
  toast.error('Không tồn tại')
  
 }
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
                <i className="fa-solid fa-book-open "></i>
                 <span className="admin-title-name">Quản Lý Sách</span>
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
          
            <div onClick={openAddModal} className="btn btn--admin btn-add js-add-address">
                 <i  className="fa-solid fa-plus"></i>
                 Thêm Sách</div>
                   {showAddModal && <AddBookModal onClose={() => setShowAddModal(false)} onAddSuccess={handleAddBook} />}
            </div>
        <div className={cx('product-form')}>
                <div className={cx('product-name')}><span className={`${cx('')} text-blur`}>Sản Phẩm</span></div>
                <div className={cx('product-info')}>
                    <span className={`${cx('size-ss')} text-blur`}>Giá</span>
                    <span className={`${cx('size-ss')} text-blur`}>Thể Loại</span>
                    <span className={`${cx('size-ss')} text-blur`}>Khuyến mãi</span>
                    <span className={`${cx('size-ss')} text-blur`}>Đã Bán</span>
                     <span className={`${cx('size-ss')} text-blur`}>Đánh giá</span>
                      <span className={`${cx('size-ss')} text-blur`}>Yêu thích</span>
                       <span className={`${cx('size-ss')} text-blur`}>Thao tác</span>
                </div>
        </div>
     
        { data.map((item,idx)=>{
             let categoryName = '';

    switch (item.category) {
    case 1:
      categoryName = 'Xã hội';
      break;
    case 2:
      categoryName = 'Thiếu nhi';
      break;
    case 3:
      categoryName = 'Lịch sử';
      break;
    case 4:
        categoryName = 'Kinh dị';
        break;
    default:
      categoryName = 'Không rõ';
  }
            return (
          <div key={idx} className={cx('product-form')}>
                <div className={cx('product-name')}>
                <img src={item.img} className={cx('product-img')}/>
                <span className={cx('product-title')}>{item.name}</span>  
                </div>
                <div className={cx('product-info')}>
                    <span className={`${cx('size-ss','text')} `}>{item.price}đ</span>
                    <span className={`${cx('size-ss')} `}>{categoryName}</span>
                    <span className={`${cx('size-ss','discount')} `}>{item.discount}%</span>
                     <span className={`${cx('size-ss')} `}>{item.sold}</span>
                      <span className={`${cx('size-ss')} `}>{item.evaluate} </span>
                       <span className={`${cx('size-ss')} `}>{item.isFavourite?'True':'False'}</span>
                    <div className={`${cx('size-b','Controller')}   `}>
                        <span onClick={() => handleDelete(idx)} className={cx('btn-controll')}>Xóa</span>
                        <span onClick={()=>openEditModal(item)} className={cx('btn-controll')}>Sửa</span>
                       
                    </div>
                </div>
        </div>
            )
        }

        )
        }
          {showEditModal && (
                            <EditBookModal
                            book={editingBook}
                            onClose={() => setShowEditModal(false)}
                            onSave={handleSaveBook}
                             // callback để cập nhật danh sách
                            />
                        )}
          
         
         
        
    </div>
      
     );
     
}

export default ManageBook;