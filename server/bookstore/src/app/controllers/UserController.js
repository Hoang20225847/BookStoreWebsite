const AccountUser= require('../models/AccountUsers')
const bcrypt=require('bcrypt')
const saltRounds=10;
const jwt =require('jsonwebtoken')
class UserController{
    
   async create(req,res,next)
       {
              
              
            // Lấy dữ liệu từ request body
            const { name, email, password } = req.body;
            const hashPassword= await bcrypt.hash(password,saltRounds)
            // Kiểm tra xem có tài khoản với email này chưa
            const existingUser = await AccountUser.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email đã được đăng ký!' });
                
            }

            // Tạo tài khoản mới
            const newUser = new AccountUser({
                name,
                email,
                password:hashPassword, // Bạn cần mã hóa password nếu dùng trong thực tế (sử dụng bcrypt hoặc các thư viện tương tự)
            });

            // Lưu tài khoản mới vào cơ sở dữ liệu
            await newUser.save();
                
            // Trả về phản hồi thành công
            return res.status(201).json({
                message: 'Tạo tài khoản thành công!'
            });

         
    }
    async handleLogin(req,res,next)
       {
              
              
            // Lấy dữ liệu từ request body
            const {  email, password } = req.body;

            // Kiểm tra xem có tài khoản với email này chưa
            const existingUser = await AccountUser.findOne({ email });
            if (existingUser) {
                const isMatchPassword =await bcrypt.compare(password,existingUser.password)
                if(!isMatchPassword)
                    {
                        return res.status(400).json({
                            EC:2,
                            EM:'EMAIL/PASSWORD Khong hop le'})
                        }else {
                            const payload={
                                email:existingUser.email,
                                name:existingUser.name,
                                avt:existingUser.avt,
                                role:existingUser.role
                            }
                            const access_token=jwt.sign(payload,'ce86b645-b01e-4681-a77c-00ca11579502',{
                                expiresIn:'1d',
                            })
                    //creat an acess token
                    return  res.status(200).json({access_token,
                        user:{
                            name:existingUser.name,
                            email:existingUser.email,
                            avt:existingUser.avt,
                            role:existingUser.role
                        },
                        message:'Dang nhap thanh cong'
                    })
                }
                
            }
           else{
             return res.status(400).json({
                EC:1,
                EM:'EMAIL/PASSWORD Khong hop le'
             })
           }
                
            // Trả về phản hồi thành công
            

         
    }
    async rePassword(req,res,next)
           {   const{email,password,newpassword} =req.body;
                console.log(req.body)
                try{
                  const account = await AccountUser.findOne({email:req.body.email});
                  
                  if(account)
                  {
                    const isMatchPassword =await bcrypt.compare(password,account.password)
                    if(!isMatchPassword)
                    {
                        return res.status(400).json({
                            EC:2,
                            EM:"Sai mật khẩu"
                        })
                    }
                    else{
                        const hashPassword=await bcrypt.hash(newpassword,saltRounds)
                        account.password=hashPassword;
                        account.save()
                        return res.status(200).json("Thay đổi thành công")
                    }
                  }
                  else{
                    return res.status(400).json("Khoong thay nick")
                   }
                
                  
                }
                catch(error)
                {  console.error("Error updating account:", error);  // Log chi tiết lỗi
                  next(error)};
                  
                
    }
     async updateAccount(req,res,next)
       {    
            try{ 
                const {item}=req.body;
                console.log(item);
              const account = await AccountUser.findOne({email:item.email});
              if(!account)
              {
                return res.status(404).json({message:"Not Account"})
              }
             
              account.name = item.name;
                account.avt = item.avt;
                if (item.password && item.password.trim() !== '') {
                const hashedPassword = await bcrypt.hash(item.password,saltRounds);
                account.password = hashedPassword;
    }
            await account.save();
              return res.status(200).json('Thành Công')
            }
            catch(error)
            {  console.error("Error updating account:", error);  // Log chi tiết lỗi
              next(error)};
              
            
}
 async uploadAvt(req,res,next){
 try{
  const email= req.body.email;
  const file= req.file;
  if(!file){
    return res.status(400).json({message:'error'})
  }
  const user = await AccountUser.findOne({email});
  if(!user){
    return res.status(404).json({message:'Not Found Account'})
    
  }
  user.avt=`http://localhost:3001/uploads/${file.filename}`
  await user.save();
  return res.status(200).json({
    message:'Cập nhật avartar thành công',
    avt:user.avt
  })
 }catch(error)
 {
  return res.status(400).json('Upload that bai')
 }
}  

       }

module.exports= new UserController;