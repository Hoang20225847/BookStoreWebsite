const AccountAdmin= require('../models/AccountAdmins')
const AccountUser= require('../models/AccountUsers')
const Order= require('../models/Orders')
const Book=require('../models/Books')
const axios = require('axios')
const {VNPay,ignoreLogger,ProductCode,VnpLocale,dateFormat}= require('vnpay')
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
class PaymentController{
    
  async createQr(req,res,next)
  {
     const { email,items,totalAmount,address } = req.body;
                    const newOrder =new Order({
                        email,
                        items,
                        totalAmount,
                        address
                    })
                    
                    await newOrder.save();
                    await updateSoldBook(items);
        const vnpay=new VNPay({
            tmnCode: 'E1JJOIAV',
    secureSecret: 'PRP3IVKG6OP5PFPKMSO6DSDFEHGR5KLW',
    vnpayHost: 'https://sandbox.vnpayment.vn',
    
    // Cấu hình tùy chọn
    testMode: true,                // Chế độ test
    hashAlgorithm: 'SHA512',      // Thuật toán mã hóa
    enableLog: true,              // Bật/tắt ghi log
    loggerFn: ignoreLogger,       // Hàm xử lý log tùy chỉnh
    
        })
        
       
        const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
  const vnpTxnRef = newOrder._id.toString();
  
        const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: totalAmount*1000,
    vnp_IpAddr: req.ip,
    vnp_TxnRef: vnpTxnRef,
    vnp_OrderInfo: 'Thanh toan don hang 123456',
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: 'http://localhost:3001/payapi/check-payment-vnpay',
    vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
    vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
    vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
});
return res.status(200).json(paymentUrl);
  }
  async response(req,res,next) {
    try{
 const { vnp_TxnRef, vnp_ResponseCode } = req.query;
          const order = await Order.findById(vnp_TxnRef);
           if (vnp_ResponseCode === '00') {
        order.isPay = true;  // hoặc trạng thái bạn muốn khi thanh toán thành công
      } else {
        order.status = 'Đã hủy'; // hoặc trạng thái lỗi thanh toán
      }
      await order.save();
    const FE_RETURN_URL = 'http://localhost:3000/profile/purchase';
    const redirectUrl = `${FE_RETURN_URL}?payment=${vnp_ResponseCode === '00' ? 'success' : 'failed'}`;
    return res.redirect(redirectUrl);
    }catch(error)
    {
        return res.status(400).json(error)
    }
  }
  async createQrMomO(req,res,next){
    
    try{ const { email,items,totalAmount,address } = req.body;
      const newOrder =new Order({
                        email,
                        items,
                        totalAmount,
                        address
                    })
                    
                    await newOrder.save();
                    await updateSoldBook(items);
                    const vnpTxnRef = newOrder._id.toString();
      var partnerCode = "MOMO";
var accessKey = "F8BBA842ECF85";
var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var requestId = vnpTxnRef;
var orderId = requestId;
var orderInfo = "pay with MoMo";
var redirectUrl = "https://momo.vn/return";
var ipnUrl = "https://callback.url/notify";
// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
var amount = `${totalAmount}000`;
var requestType = "captureWallet"
var extraData = ""; //pass empty value if your merchant does not have stores

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
//puts raw signature
console.log("--------------------RAW SIGNATURE----------------")
console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
console.log("--------------------SIGNATURE----------------")
console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    accessKey : accessKey,
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    extraData : extraData,
    requestType : requestType,
    signature : signature,
    lang: 'en'
});
const response= await axios.post('https://test-payment.momo.vn/v2/gateway/api/create',requestBody, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
return res.status(200).json(response.data.payUrl)}
catch(error)
{
  console.log(error)
  return res.status(400).json(error)
}
  }
    
       }

module.exports= new PaymentController;