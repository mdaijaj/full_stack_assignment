const express= require('express')
const router=express()
const userController= require('../controller/index')

//routes for Dish crude
router.post('/api/createuserdetails', userController.createUserDetails)
router.get('/api/getuserList', userController.getUserList)
router.get('/api/getUserDetails/:id', userController.getUserDetails)
router.put('/api/editUserDetails/:id', userController.editUserDetails)
router.get('/api/deleteUserDetails/:id', userController.deleteUser)


module.exports = router;