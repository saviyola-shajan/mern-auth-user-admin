const express = require('express')
const router = express.Router()
const {loginAdmin,getUsers,userBlock,userUnBlock,searchUser,editUser}=require('../controllers/adminController')
const {protectAdmin}= require('../middlwware/authMiddleware')


router.post('/login',loginAdmin)
router.get('/',protectAdmin,getUsers)
router.post('/block',protectAdmin,userBlock)
router.post('/unblock',protectAdmin,userUnBlock)
router.put('/:userId',protectAdmin,editUser)
router.post('/search',protectAdmin,searchUser)


module.exports=router