const express = require ('express');
const router =express.Router();
const AdminController =require('../app/controllers/AdminController')
router.post('/login',AdminController.handleLogin);
router.get('/users',AdminController.getAccountList);
router.get('/Statistics',AdminController.getStats)


module.exports=router