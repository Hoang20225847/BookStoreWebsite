import avt from '../../components/assets/img/unnamed.jpg'
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import axios from '../../components/axios/axios.customize'
import { toast } from 'react-toastify';
function Profile() {
  const handleChange= async (e)=>{
    e.preventDefault();
    const formData={
      email:auth.user.email,
      name:name
    };
    try{
      const data=await axios.post('/api/account',formData)
      
        toast.success("Cập nhật thành công")
        window.location.reload();
    }
    catch(error){
      toast.error(error)
    }
      
  }
  
  const{auth,setAuth}=useContext(AuthContext)
  const[name,setName]=useState('')
  useEffect(() => {
  if (auth.user?.name) {
    setName(auth.user.name);
  }
}, [auth.user]);
const handleAvatarChange = async(e)=>{
  const file= e.target.files[0];
  if(!file) return ;
  if(!['image/jpeg','image/png'].includes(file.type))
  {
    return toast.error('File định dạng sai')
  }
  const formData=new FormData();
  formData.append('avatar',file);
   formData.append('email',auth.user.email);
  try{
    const res=await axios.post('/api/account/upload-avt',formData,{
      headers:{
        'Content-Type':'multipart/form-data',
      }
    })
    toast.success("Cap nhat anh thanh cong")
     window.location.reload();
  }catch(error)
  {
    toast.error('Upload ảnh thất bại')
  }
}
    return ( 
       <div className='Account-container' >
        <div className="Account-Title">
          <span className="Account-Title-Name" >Hồ sơ của tôi</span>
          <span className="Account-Tittle-Description">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </div>
        <div className="Profile-content">
          <div className="Account-info">
            <div className="Account-info-name">
              <span className="Account-info-text">Tên Đăng Nhập</span>
              <span className="Account-name-current">hoang2004xp</span>
            </div>
            <div className="Account-info-name">
              <span className="Account-info-text account-info-text__name">Tên </span>
              <input onChange={(e)=>setName(e.target.value)} value={name} className="Account-name-current account-input-name"/>
            </div>
            <div className="Account-info-name">
              <span className="Account-info-text">Email</span>
              <span className="Account-name-current">{auth.user.email}</span>
            </div>
            <div className="Account-info-name">
              <span className="Account-info-text">Số Điện thoại</span>
                <div className="Account-footer">
                  <span className="Account-name-current">0862408708</span>
                  <button onClick={handleChange}  className="btn btn--size-s btn-account">Lưu</button>
                  </div>
              </div>
           
          </div>
          <div className="Account-avt">
            <img src={auth.user.avt} className="account-avt-img"/>
            <button className='Avt-button'
            onClick={()=>document.getElementById('avatarInput').click()}
            >Chọn ảnh</button>
            <input type="file"
            accept="image/*"
            id="avatarInput"
            style={{display:'none'}}
            name="avatar"
            onChange={handleAvatarChange}
            />
            <span className='Account-info-text Account-avt-text'> Dung lượng file tối đa 1mb</span>
            <span className='Account-info-text Account-avt-text'> Định dạng JPEG,.PNG</span>
  
          </div>
        </div>
       </div>
     );
}

export default Profile;