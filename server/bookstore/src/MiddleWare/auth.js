        const jwt = require('jsonwebtoken')
        const auth =(req,res,next) =>{
            const white_list=["/regis","/login","/api/books","/api/address","/admin/login","/uploads","/payapi/check-payment-vnpay","/api/review"];
            if(white_list.includes(req.path)|| req.originalUrl.startsWith('/uploads'))
            {
                next();
                
            }
            else{
                if(req.headers&&req.headers.authorization) {
                const token=req.headers.authorization.split(' ')[1];
                
                    try{
                        
                        const decoded=jwt.verify(token,'ce86b645-b01e-4681-a77c-00ca11579502')
                    
                        req.user={
                            id:decoded._id,
                            email:decoded.email,
                            name:decoded.name,
                            avt:decoded.avt,
                            role:decoded.role
                        }
                        next()
                        }
                    catch(error){
                        return res.status(401).json({
                        message:"Token het han"
                    })
                                }
                }
                
                else {
                    return res.status(401).json({
                        message:"Ban chua truyen Access_Token"
                    })
                }
            }
        
        }
        module.exports = auth;