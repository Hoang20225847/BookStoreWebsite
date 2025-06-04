const Book= require('../models/Books')
const Account=require('../models/AccountUsers')

const Address=require('../models/Address')
const  AccountAdmin=require('../models/AccountAdmins')
const Books = require('../models/Books')
const Orders = require('../models/Orders')

class SiteController{
    index(req,res ) 
    {
        res.render('cc')
    }
   async show(req,res,next)
       {    
              
               Book.find({})
               .then(books =>res.json(books))
               .catch(next);
       }
     async getAccount(req,res,next)
       {  
            try{ let account =null
              console.log(req.user)
              if(req.user.role === 'user'){
                 account = await Account.findOne({email:req.user.email});

            }
              if(req.user.role ==='admin')
              {
                 account = await AccountAdmin.findOne({email:req.user.email});
              }
              if(!account)
              {
                return res.status(404).json({message:"Not login"})
              }
              return res.json({user:{
                id:account._id,
                email:account.email,
                name:account.name,
                avt:account.avt,
                role:account.role
              }})
            }
            catch(error)
            { next(error)};
              
            
}
async changeInfo(req,res,next)
       {  
            try{
              const account = await Account.findOne({email:req.body.email});
              if(!account)
              {
                return res.status(404).json({message:"Not login"})
              }
              if(account.name !== req.body.name)
              {
                account.name=req.body.name;
                 await account.save()
              }
            
              return res.json({user:{
                email:account.email,
                name:account.name,
                avt:account.avt
              }})
            }
            catch(error)
            {  console.error("Error updating account:", error);  // Log chi tiết lỗi
              next(error)};
              
            
}
async createAddress(req,res,next)
       {
              
              
            try{// Lấy dữ liệu từ request body
            const { user,name, phone, province,details,isDefault} = req.body;
            console.log(req.body); 
              const count = await Address.countDocuments({ email:user });
            // Tạo tài khoản mới
            const newAddress = new Address({
                email:user,
                stt:count+1 ,
                name:name,
                phone:phone,
                details:details,
                province:province,
                isDefault:isDefault
            });

            // Lưu tài khoản mới vào cơ sở dữ liệu
            await newAddress.save();
                
            // Trả về phản hồi thành công
            return res.status(201).json({
                message: 'Tạo địa chỉ thành công!'
            });
            }
            catch(error)
            { return res.status(400).json(error)

            }
         
    }
      async  getAddress(req, res, next) {
  try {  
    const addresses = await Address.find({});
    res.status(200).json(addresses);  // Trả về JSON danh sách address
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy địa chỉ', error });
  }
}
  async removeBook(req,res,next){
          try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
          if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });}
      return res.status(200).json({message:'Xoa Sach thanh cong'}) 
  }
          catch(error){
              console.log('Loi')
              res.status(400).json('Lỗi dữ liệu')
          }
     } 
       async removeAccount(req,res,next){
          try {
        const deletedAccount = await Account  .findByIdAndDelete(req.params.id);
          if (!deletedAccount) {
      return res.status(404).json({ error: 'Account not found' });}
      return res.status(200).json({message:'Xoa thanh cong'}) 
  }
          catch(error){
              console.log('Loi')
              res.status(400).json('Lỗi dữ liệu')
          }
     }
     async createBook(req,res,next)
       {
              
              
            try{// Lấy dữ liệu từ request body
            const { name,description,image,category,price} = req.body;
            console.log(req.body); 
              
            // Tạo tài khoản mới
            const newBooks = new Book({
                name,
                description,
                img:image,
                category,
                price,
            });
              console.log(newBooks)
            // Lưu tài khoản mới vào cơ sở dữ liệu
            await newBooks.save();
                
            // Trả về phản hồi thành công
            return res.status(201).json(newBooks);
            }
            catch(error)
            { return res.status(400).json(error)

            }
         
    }
    async updateBook(req,res,next){
            try{    
              console.log(req.body)
                 const item = req.body; 
                   await Book.findByIdAndUpdate(item._id, item, { new: true });
                    return res.status(200).json({message:'update thanh cong'})
            }
            catch(error){
                console.log('Loi')
                res.status(400).json('Lỗi dữ liệu')
            }
       }     
  async setAddressDefault(req,res,next){
          try {
            
        const newAddress = await Address.findOne({_id:req.params.id});
         await Address.updateMany(
          { user: newAddress.user }, // hoặc req.user._id nếu bạn có sẵn user từ token
            { isDefault: false }
    );
          if (!newAddress) {
      return res.status(404).json({ error: 'Address not found' });}
           newAddress.isDefault=true; 
         await  newAddress.save();
    return res.status(200).json('Thanh cong')
  }
          catch(error){
              console.log('Loi')
              res.status(400).json('Lỗi dữ liệu')
          }
     }
      async deleteAddress(req,res,next){
          try {
         await Address.findByIdAndDelete(req.params.id);
      return res.status(200).json({message:'Xoa Sach thanh cong'}) 
  }
          catch(error){
              console.log('Loi')
              res.status(400).json('Lỗi dữ liệu')
          }
     }
     async getBookSearch(req,res,next){
      const categoryMap = {
  1: 'xã hội',
  2: 'thiếu nhi',
  3: 'Lịch sử',
  4: 'Kinh dị',
  // ... các category khác
};
      try{
        const keySearch=req.query.key
         
        const searchRegex = new RegExp(keySearch, 'i');
        const matchingCategoryIds = Object.entries(categoryMap)
      .filter(([id, name]) => name.toLowerCase().includes(keySearch.toLowerCase()))
      .map(([id]) => Number(id));
        const books= await Books.find({
          $or:[
          { name: { $regex: searchRegex } },
       
       {category:{$in : matchingCategoryIds}}
          ]
        })
        return res.status(200).json(books);
      }
      catch(error){
         res.status(500).json({ error: 'Lỗi khi tìm kiếm sách' });
      }
     }
     async getAccountSearch(req,res,next){
      try{
        const keySearch=req.query.key;
        const searchRegex=new RegExp(keySearch,'i')
        const accounts=await Account.find({email:{$regex:searchRegex}})
        return res.status(200).json(accounts)
      }catch(error){
        console.log(error)
        return res.status(500).json('Lỗi Khi tìm kiếm')
      }
     }
    
}
module.exports= new SiteController;