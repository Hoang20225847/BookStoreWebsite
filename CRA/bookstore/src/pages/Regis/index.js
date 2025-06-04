import {  useEffect,useState } from "react";
import Validator  from '../../components/function/Validator'
import { toast } from 'react-toastify';
function Login() {
    const [data,setData]=useState({
        name:'',
        email:'',
        password:'',

    })
    const handleRegis= async (data)=>{
        if (data.password !== data.repassword) {
        toast.error("Mật khẩu và mật khẩu nhập lại không khớp!");
        return;}
         const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        };
          try {
        // Gửi request lên backend
        const response = await fetch('/regis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Chỉ định rằng dữ liệu gửi lên là JSON
            },
            body: JSON.stringify(formData), // Chuyển formData thành chuỗi JSON
        });

        // Kiểm tra nếu request thành công
        if (response.ok) {
            toast.success("Đăng ký thành công!");
             setTimeout(() => {
    window.location.href = '/login';
  }, 1500);
        } else {
            const error = await response.json();
            console.error('Đăng ký thất bại:', error.message);
        }
    } catch (error) {
        console.error('Có lỗi khi gửi yêu cầu:', error);
    }
    

    }
    
    useEffect(()=>{
        Validator({
            form:'#form-1',
            formGroupSelector:'.form-group',
            errorSelector:'.form__message',
            rules:[
                Validator.isRequired('#name'),
                Validator.isEmail('#Email'),
                Validator.MinLength('#password',6),
                Validator.isRequired('#repassword')
                
                // Validator.repeat('#repassword',function(){
                //     return document.querySelector('#form-1 #password').value;
                // })
            ],
            onSubmit:handleRegis
        })
    },[])
     
    
    
    return ( 
      
        <form action=""  id="form-1"  className="form">
       <h3 className="form__heading"> Đăng Kí</h3>
       <div className="form-group">
           <span htmlFor="name" className="form__title">Name</span>
           <input id="name" name="name" type="text" className="form__input  " placeholder="Name user"/>
           <span className="form__message"> </span>
       </div>
       <div className="form-group">
           <span htmlFor="email"className="form__title">Email</span>
           <input id="Email" type="text" name="email" className="form__input" placeholder="Email"/>
           <span className="form__message"> </span>
       </div>
       <div className="form-group">
           <span htmlFor="password" className="form__title">Mật Khẩu</span>
           <input id="password" type="password" name="password" className="form__input" placeholder="Mật Khẩu"/>
           <span className="form__message"> </span>
       </div>
       <div className="form-group">
           <span className="form__title">Nhập lai mật khẩu</span>
           <input id="repassword" type="password" name="repassword" className="form__input" placeholder="Nhập lại mật khẩu"/>
           <span className="form__message"> </span>
       </div>
       <div className="form-group">
           <button  type="submit" className="btn btn-primary ">Đăng kí</button>
           <div className="choices">
              <a href="/login" className="choice">Bạn đã có tài khoản ? </a>
            <a href="/" className="choice">Quay về trang chủ? </a>
        </div>
       </div>
            </form>
      
    
     );
}

export default Login;