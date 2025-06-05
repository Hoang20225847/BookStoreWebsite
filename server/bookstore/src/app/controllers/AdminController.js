const AccountAdmin= require('../models/AccountAdmins')
const AccountUser= require('../models/AccountUsers')
const Order= require('../models/Orders')
const bcrypt=require('bcrypt')
const saltRounds=10;
const jwt =require('jsonwebtoken')
class AdminController{
    
  
    async handleLogin(req,res,next)
       {
              
              
            // Lấy dữ liệu từ request body
            const {  email, password } = req.body;
            
            // Kiểm tra xem có tài khoản với email này chưa
            const existingAdmin = await AccountAdmin.findOne({ email });
            console.log(existingAdmin)
            if (existingAdmin) {
                let isMatchPassword=false;
                if(password === existingAdmin.password)
                {
                    isMatchPassword=true;
                }
                if(!isMatchPassword)
                    {
                        return res.status(400).json({
                            EC:2,
                            EM:'EMAIL/PASSWORD Khong hop le1'})
                        }else {
                            const payload={
                                email:existingAdmin.email,
                                name:existingAdmin.name,
                                avt:existingAdmin.avt,
                                role:existingAdmin.role
                            }
                            const access_token=jwt.sign(payload,'ce86b645-b01e-4681-a77c-00ca11579502',{
                                expiresIn:'1d',
                            })
                    //creat an acess token
                    return  res.status(200).json({access_token,
                        user:{
                            name:existingAdmin.name,
                            email:existingAdmin.email,
                            avt:existingAdmin.avt,
                            role:existingAdmin.role
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
    async getAccountList(req,res,next){
            const AccountList= await AccountUser.find({});
            if(!AccountList){
                return res.status(400).json({
                    EC:1,
                    EM:'Chưa có Users'
                })
            }
            else{
                return res.status(200).json(AccountList)
            }
    }
   async getStats(req,res,next){
    try{const stats=await Order.find({})
    if(!stats){
        return res.status(400).json({
            EC:1,
            EM:'Chưa có đơn hàng'
        })
    }
   const now =new Date();
   const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const orders = await Order.find({ createdAt: { $gte: sixMonthsAgo } })
    const monthlyStats=Array(6).fill(null).map((_,i)=>{
        const date= new Date();
        date.setMonth(date.getMonth()-(5-i));
        return{
            month:date.getMonth()+1,
            year:date.getFullYear(),
            revenue:0,
            totalOrders:0

        }
    })
    orders.forEach(order => {
            const orderDate = new Date(order.createdAt);
            const orderMonth = orderDate.getMonth() + 1;
            const orderYear = orderDate.getFullYear();
            
            const stat = monthlyStats.find(m => m.month === orderMonth && m.year === orderYear);
            if (stat) {
                stat.totalOrders += 1;
                stat.revenue += order.totalAmount; // hoặc order.amount tuỳ theo model
            }
        });
        console.log(monthlyStats)
        return res.status(200).json(monthlyStats)
   }catch(error){
    return res.tatus(400).json(error)
   }}
       
       }

module.exports= new AdminController;