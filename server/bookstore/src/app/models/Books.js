const  mongoose  = require("mongoose");

const Schema=mongoose.Schema;
const Book =new Schema({
    name:{type:String,default:'',maxLength:255},
    description:{type:String},
    img:{type:String},
    createAt:{type:Date,default:Date.now},
    updateAt:{type:Date,default:Date.now},
    category:{type:Number,default:1},
    price:{type:String},
    discount:{type:Number,default:0},
    evaluate:{type:Number,default:5},
    sold:{type:Number,default:0},
    isFavourite:{type:Boolean,default:true}
});


module.exports=mongoose.model('Book',Book);