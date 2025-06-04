const express = require ('express');
const router =express.Router();
const upload =require('../MiddleWare/upload')
const SiteController =require('../app/controllers/SiteController')
const CartController =require('../app/controllers/CartController')
const OrderController =require('../app/controllers/OrderController');
const UserController = require('../app/controllers/UserController');
const ReviewController =require('../app/controllers/ReviewController');

router.get('/books/search',SiteController.getBookSearch)
router.get('/books',SiteController.show);
router.delete(`/books/:id`,SiteController.removeBook)
router.post('/books',SiteController.createBook)
router.put('/books',SiteController.updateBook)
router.get('/account/search',SiteController.getAccountSearch);
router.get('/account',SiteController.getAccount);
router.post('/account/upload-avt',upload.single('avatar'),UserController.uploadAvt)
router.post('/account',SiteController.changeInfo);
router.put('/account',UserController.updateAccount);
router.post('/address',SiteController.createAddress)
router.get('/address',SiteController.getAddress);
router.put('/address/:id',SiteController.setAddressDefault);
router.delete(`/address/:id`,SiteController.deleteAddress)
router.post('/cart',CartController.create)
router.get('/cart',CartController.getCart)
router.put('/cart/update',CartController.updateCart)
router.put('/cart',CartController.removeItemCart)
router.get('/order/search',OrderController.getOrderSearch)
router.post('/order',OrderController.create)
router.put('/order/:id',OrderController.reviewOrder)
router.put('/order',OrderController.updateOrder)
router.put('/orders/:id',OrderController.statusOrder)
router.get('/order',OrderController.getOrder)
router.get('/listorder',OrderController.getListOrder)
router.post('/review',ReviewController.create)
router.get('/review',ReviewController.getReviewBook)
router.delete(`/account/:id`,SiteController.removeAccount)
router.delete(`/orders/:id`,OrderController.removeOrder)
module.exports=router