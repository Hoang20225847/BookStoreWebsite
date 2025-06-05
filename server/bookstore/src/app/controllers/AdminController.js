const AccountAdmin= require('../models/AccountAdmins')
const AccountUser= require('../models/AccountUsers')
const Order =require('../models/Orders')
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
   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
   const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const orders = await Order.find({ createdAt: { $gte: sixMonthsAgo } })
    const ordersCurrent = orders.filter(order => {
        return new Date(order.createdAt) >= startOfMonth &&
           new Date(order.createdAt) <= endOfMonth;
    })
    const monthlyStats=Array(6).fill(null).map((_,i)=>{
        const date= new Date();
        date.setMonth(date.getMonth()-(5-i));
        if(i==5){
            return{
            month:date.getMonth()+1,
            year:date.getFullYear(),
            revenueisPay:0,
            revenuenotPay:0,
            totalOrders:0,
            listOrder:ordersCurrent

        }
        }
        return{
            month:date.getMonth()+1,
            year:date.getFullYear(),
  revenuenotPay:0,
            revenueisPay:0,
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
  if(order.isPay)               
               { stat.revenueisPay += order.totalAmount;} // hoặc order.amount tuỳ theo model
                else stat.revenuenotPay +=order.totalAmount
            }
        });
        console.log(monthlyStats)
        return res.status(200).json(monthlyStats)
   }catch(error){
    console.log(error)
    return res.status(400).json(error)
   }}
       
       }

module.exports= new AdminController;