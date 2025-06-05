
const Order= require('../models/Orders')
const Book= require('../models/Books')
const mongoose = require('mongoose');
async function updateSoldBook(items){
if(Array.isArray(items))
{
    items.map(async (item)=>{
           try{
            console.log("sach duoc ban la:",item)
             const updateBook= await Book.findOne({_id:item.bookId._id})
             console.log("sach can update sold",updateBook)
            if(!updateBook)
            {
                return;
            }
            updateBook.sold += item.quantity
            await updateBook.save();
            }
            catch(error){
                    console.log(error)
            }
    }
)
}
}
class OrderController{
    
   async create(req,res,next)
       {
              
              
           try{ // Lấy dữ liệu từ request body
            const { email,items,totalAmount,address } = req.body;
            console.log(req.body)
                const newOrder =new Order({
                    email,
                    items,
                    totalAmount,
                    address
                })
                
                await newOrder.save();
                await updateSoldBook(items);
                
                return res.status(200).json({message:'Đặt Hàng Thành Công'})
    
                
                }
                catch(error){
                    return res.status(400).json({
                        message:"Đăt hàng thất bại"
                    })
                }
            
         
    }
   
   async getOrder(req,res,next){
        try{
             const { email } = req.query; 
            const orders= await Order.find({email})
            .sort({ createdAt: -1 });
           
                if(!orders){
                    return res.status(200).json({
                        EC:0,
                        EM:'Chưa có đơn hàng nào'
                    })
                }
                else{
                     res.status(200).json(orders);
                }
        }
        catch(error){
            console.log('Loi')
            res.status(400).json('Lỗi dữ liệu')
        }
   }
    
   async getListOrder(req,res,next){
        try{
            
            const listorders= await Order.find({})
           
                if(!listorders){
                    return res.status(200).json({
                        EC:0,
                        EM:'Chưa có đơn hàng nào'
                    })
                }
                else{
                     res.status(200).json(listorders);
                }
        }
        catch(error){
            console.log('Loi')
            res.status(400).json('Lỗi dữ liệu')
        }
   } async removeOrder(req,res,next){
             try {
           const deletedOrder = await Order.findByIdAndDelete(req.params.id);
             if (!deletedOrder) {
         return res.status(404).json({ error: 'Account not found' });}
         return res.status(200).json({message:'Xoa thanh cong'}) 
     }
             catch(error){
                 console.log('Loi')
                 res.status(400).json('Lỗi dữ liệu')
             }
        }     

   async updateOrder(req,res,next){
    try{
        const item=req.body
        console.log(item)
        await Order.findByIdAndUpdate(item._id,{ $set: item },{new:true});
        return res.status(200).json('Thanh Cong')
    }
    catch(error)
    {
        return res.status(400).json('Loi du lieu')
    }
   }
    async getOrderSearch(req,res,next){

      try{
        const keySearch=req.query.key
         
        const searchRegex = new RegExp(keySearch, 'i');
        console.log(keySearch)
     
           let objectid;
        if(mongoose.Types.ObjectId.isValid(keySearch))
        {
             objectid=new mongoose.Types.ObjectId(keySearch);
            
        }

        let orders= await Order.find({
          $or:[
            {_id:objectid},
           { email: { $regex: searchRegex } },
            { status: { $regex: searchRegex } }
      
          ]
        })
        
        return res.status(200).json(orders);
      }
      catch(error){
        console.error(error)
         res.status(500).json({ error: 'Lỗi khi tìm kiếm sách' });
      }
     }    
     async statusOrder(req,res,next){
        try{
             console.log(req.params.id)
             const updateOrder = await Order.findOne({_id:req.params.id});
             if(!updateOrder){
                console.log('NOT FOUND')
             }
            if(updateOrder.status=="Chờ xử lý"){
                updateOrder.status="Đã hủy"
            }
            
                 if(updateOrder.status=="Đang giao"){
                updateOrder.status ="Hoàn thành"
                updateOrder.isPay=true;
            }
            console.log(updateOrder.address);
             await updateOrder.save()
             return res.status(200).json('Thanh Cong')
        }catch(error)
        {   
            console.log(error);
            return res.status(400).json('that bai')
        }
     }
     async reviewOrder(req,res,next){
        try{
            
             const updateOrder = await Order.findById(req.params.id)
             if(!updateOrder){
                console.log('NOT FOUND')
             }
                updateOrder.review=true;
                console.log("Sau khi update",updateOrder)
             await updateOrder.save()
             console.log("Saved!")
             return res.status(200).json('Thanh Cong')
             
        }catch(error)
        {   
            console.log(error);
            return res.status(400).json('that bai')
        }
     }
       }
       

module.exports= new OrderController;