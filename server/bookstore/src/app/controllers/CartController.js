const Cart= require('../models/Carts')
const AccountUser= require('../models/AccountUsers')
const bcrypt=require('bcrypt')
const saltRounds=10;
const jwt =require('jsonwebtoken')
class CartController{
    
   async create(req,res,next)
       {
              
              
           try{ // Lấy dữ liệu từ request body
            const { email,items } = req.body;
            console.log(req.body)
        
                const existingCart=await Cart.findOne({email})
                if(existingCart)
                {
                    const existingItem=existingCart.items.find(item=>item.bookId.toString() === items.bookId)
                    if(existingItem){
                        existingItem.quantity += items.quantity 
                        existingItem.totalPrice += items.totalPrice   
                    }
                    else{
                        existingCart.items.push(items)
                    }
                    await existingCart.save()
                    return  res.status(200).json({message:"Thêm vào giỏ hàng thành công"})
                }
                else{
                    const newCart=new Cart({
                     email,
                     items,
                    })  
                    await newCart.save();
                    return res.status(200).json({
                        message:"Them vao gio hang thanh cong"
                    })
                }}
                catch(error){
                    return res.status(400).json({
                        message:"Thêm giỏ hàng thất bại"
                    })
                }
            
         
    }
   
   async getCart(req,res,next){
        try{
             const { email } = req.query; 
             console.log(email)
            const cart= await Cart.findOne({email}).populate('items.bookId')
            console.log(cart)
                if(!cart){
                    return res.status(200).json({
                        EC:0,
                        EM:'Giỏ hàng rỗng'
                    })
                }
                else{
                     res.status(200).json(cart);
                }
        }
        catch(error){
            console.log('Loi')
            res.status(400).json('Lỗi dữ liệu')
        }
   }
   async updateCart(req,res,next){
        try{    
             const { email,item } = req.body; 
               const existingCart = await Cart.findOne({ email });
               existingCart.items=item;
                await existingCart.save();
                return res.status(200).json({message:'update thanh cong'})
        }
        catch(error){
            console.log('Loi')
            res.status(400).json('Lỗi dữ liệu')
        }
   }
    async removeItemCart(req,res,next){
        try{    console.log(req.body)
             const {email,id} = req.body; 
             
               const result = await Cart.findOneAndUpdate(
                { email },
                { $pull: { items: { bookId: id } } },
      { new: true } // trả về cart mới sau khi cập nhật
      
    );
    return res.status(200).json('thanh cong')
        }
        catch(error){
            console.log('Loi')
            res.status(400).json('Lỗi dữ liệu')
        }
   }


       }

module.exports= new CartController;