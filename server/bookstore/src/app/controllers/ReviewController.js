
const Review= require('../models/Review')
const Book= require('../models/Books')
const mongoose = require('mongoose');
async function updateBookEvaluate(bookId){
        console.log("Cập nhật đánh giá cho sách với ID: ", bookId);
        const reviewBook= await Review.find({bookId})
        console.log(reviewBook)
        const bookUpdate =await Book.findOne({_id:bookId})
        console.log(bookUpdate)
        let point =0;
        
        if(Array.isArray(reviewBook))
        {
            reviewBook.map((item)=>{
                point+=item.evaluate;
            })
            point /= reviewBook.length
            
        }
        if(bookUpdate)
        {
            bookUpdate.evaluate=Math.round(point * 10) / 10
        }
        await bookUpdate.save();
        return;
    }
class ReviewController{
    
   async create(req,res,next)
       {
              
              
           try{ // Lấy dữ liệu từ request body
            const { userId,evaluate,comment,bookId } = req.body;
            
                const newReview =new Review({
                    userId,
                    evaluate: Number(evaluate),
                    comment,
                    bookId
                })
                console.log(newReview)
                await newReview.save();
               await updateBookEvaluate(bookId);
                return res.status(200).json({message:'Đặt Hàng Thành Công'})
    
                
                }
                catch(error){
                    return res.status(400).json({
                        message:"Đăt hàng thất bại"
                    })
                }
            
         
    }
    async getReviewBook(req,res,next)
       {
              
              
           try{ // Lấy dữ liệu từ request body
            const listReview = await Review.find({bookId:req.query.id})
            .populate('userId')
            .sort({ createdAt: -1 });
                    
            
                if(!listReview.length>0){
                    return res.status(200).json(null)
                }
                return res.status(200).json(listReview)
    
                
                }
                catch(error){
                    return res.status(400).json({
                        message:"Đăt hàng thất bại"
                    })
                }
            
         
    }
   
  
       }
       

module.exports= new ReviewController;