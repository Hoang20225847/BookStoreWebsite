const  mongoose  = require("mongoose");

const Schema=mongoose.Schema;
const AccountUser =new Schema({
    name:{type:String,required:true,maxLength:255},
    email:{type:String,required:true,unique:true},
    avt:{type:String,default:"https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"},
    password:{type:String,required:true},
    Address:{type:String,default:''},
    role:{type:String,default:"user"}
    
    
    
},{
    timestamps:true,
});


module.exports=mongoose.model('account',AccountUser);