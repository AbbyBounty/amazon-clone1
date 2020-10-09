const express=require('express')
const utils=require('../../utils')
const db=require('../../db')
const config=require('../../config')
const router=express.Router()
const crypto=require('crypto-js')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')


// ----------------------------------------
// --------------GET-----------------------
// ----------------------------------------



// ----------------------------------------
// --------------POST-----------------------
// ----------------------------------------
router.post('/signup',(req,res)=>{
    const {firstname,lastname,email,password}=req.body
    const pwd=crypto.SHA256(password)
    const statement=`insert into user(firstname,lastname,email,password) values ('${firstname}','${lastname}','${email}','${pwd}'`
    db.query(statement,(error,data)=>{
        nodemailer.sendEmail()
        res.send(utils.createResult(error,data))
    })
})



// ----------------------------------------
// --------------PUT-----------------------
// ----------------------------------------




// ----------------------------------------
// --------------DELETE-----------------------
// ----------------------------------------


module.exports=router