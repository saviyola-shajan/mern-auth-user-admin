const express= require('express')
const router = express.Router()
const {protect} =require('../middlwware/authMiddleware')
const {registerUser,loginUser,getMe,profileUpload} =require('../controllers/userController')


router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.post('/profile/upload',protect,profileUpload)

module.exports=router