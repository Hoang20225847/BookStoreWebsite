const  mongoose  = require("mongoose");

const Schema=mongoose.Schema;
const Order =new Schema({
    email: {type: String,required: true,index: true
  },
  items: [
    {
      bookId: {type: Object,required:true},
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      totalPrice: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  address:{
   name:{type:String},
   phone:{type:String,required:true},
 details:{type:String,required:true},
 province:{type:String,required:true}
  },
  status: {
    type: String,
    enum: ['Chờ xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'],
    default: 'Chờ xử lý'
  },
  isPay:{type:Boolean,default:false},
  Paymedthod:{type:Number},
  review:{type:Boolean,default:false}
    
    
    
},{
    timestamps:true,
});


module.exports=mongoose.model('Order',Order);