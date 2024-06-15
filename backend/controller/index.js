const UserDetail = require('../models/user_schema')
const axios = require('axios');
const token = 'ab4086ecd47c568d5ba5739d4078988f'; // Replace with your actual token
const apiUrl = 'https://dev.pixelsoftwares.com/api.php'; // Replace with the API URL

exports.createUserDetails = async (req, res) => {
  const {
    name,
    email,
    mobile,
    age,
    interests
  } = req.body;

  try {

    console.log("req.body", req.body)
    const UserdetailData = await UserDetail.create({
      name,
      email,
      mobile,
      age,
      interests
    })
    return res.status(200).send({
      message: "create successfully!", data: UserdetailData
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the UserdetailData."
    });
  }
}



exports.getUserList = async (req, res) => {
  try {
    const UserdetailData = await UserDetail.find({status: true})
    console.log("UserdetailData", UserdetailData)
    if (UserdetailData) {
      res.status(200).send({ message: "get all UserdetailData list", data: UserdetailData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.getUserDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const restData = await UserDetail.findById({
      _id: req.params.id, status: true
    })
    console.log("restData", restData)
    if (!restData || restData == undefined) {
      return res.send("not found restaurant")
    }
    return res.status(200).send({
      message: "user resitered save data",
      data: restData
    })
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.editUserDetails = async (req, res) => {
  try {

    const userdata = await UserDetail.find({ _id: req.params.id });
    // await uderdata.save({validateBeforeSave: false});
    if (userdata) {
      const updateData = await UserDetail.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "update data successfully! ", "result": updateData })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.deleteUser = async (req, res) => {
  try {

    const userdata = await UserDetail.find({ _id: req.params.id });
    if (userdata) {
      const updateData = await UserDetail.findByIdAndRemove({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "Delete data successfully! " })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}