const express = require('express')
const mongoose = require("mongoose");
const app=express()
const port =3001
const route=require('./src/routes')
const db= require('./src/config/db')
const cors=require('cors')
const path=require('path')
const {VNPay,ignoreLogger,ProductCode,VnLocale,dateFormat}=require('vnpay')
const mongoURI = 'mongodb://localhost:27017/book_store';  // thay 'your_database_name' bằng tên database của bạn

// Kết nối đến MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { 
    console.log('Kết nối MongoDB thành công!');
  })
  .catch((err) => {
    console.error('Kết nối MongoDB thất bại!', err);
  });
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'src/public/uploads')));

route(app);
db.connect();
app.listen(port,() => console.log(` App listening at http://localhost:${port}`))