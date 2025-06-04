import axios from '../../components/axios/axios.customize'
import {useNavigate} from'react-router-dom'
import { useContext,useEffect } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import { toast } from 'react-toastify';

function Regis() {
    const {auth,setAuth}=useContext(AuthContext);
    const navigate=useNavigate();
    

    const handleLogin= async (event) =>
    {
       event.preventDefault(); // Ngăn form reload trang

        // Lấy giá trị từ input
        const email = event.target.email.value;
        const password = event.target.password.value;
        const formData={
            email:email,
            password:password,
        };
        try{
            const data =await axios.post('/login',formData)
            console.log(`accesstoken nè :`,data);
            localStorage.setItem("access_token",data.access_token)
            const newAuth = {
  isAuthenticated: true,
  user: {
    id:data?.user?.id ?? "",
    email: data?.user?.email ?? "",
    name: data?.user?.name ?? "",
    avt: data?.user?.avt ?? "",
    role: data?.user?.role ?? ""
  }
};

            setAuth(newAuth)
            navigate('/');

            toast.success('Đăng nhập thành công');
            
        }
        catch(error){
            if(error.response?.data?.EM){
                toast.error('Tài khoản hoặc mật khẩu sai ')
            }
            else{
                toast.error('Lỗi không xác định')
            }
        }
    }
    return ( 
       
        <form onSubmit={handleLogin}  id="form-1" action="" method="POST" className="form">
            

       <h3 className="form__heading"> Đăng Nhập</h3>
     
      <div className="form-group">
          <span className="form__title">Email</span>
          <input id="email" type="text" name="email" className="form__input" placeholder="Email"/>
          <span className="form__message"> </span>
      </div>
      <div className="form-group">
          <span className="form__title">Mật Khẩu</span>
          <input id="password" type="password" name="password" className="form__input" placeholder="Mật Khẩu"/>
          <span className="form__message"> </span>
      </div>
      
      <div className="form-group">
          <button   type="submit" className="btn btn-primary">Đăng Nhập </button>
        <div className="choices">
              <a href="/regis" className="choice">Bạn chưa có tài khoản ? </a>
              <a href="/admin/login" className="choice">Bạn Là Người Quản lý </a>
                <a href="/" className="choice">Quay về trang chủ? </a>
        </div>
     </div>
            </form>
  
    
     );
}

export default Regis;