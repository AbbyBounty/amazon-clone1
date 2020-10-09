const express=require('express')
const utils=require('../../utils')
const db=require('../../db')
const config=require('../../config')
const router=express.Router()
const crypto=require('crypto-js')
const jwt=require('jsonwebtoken')
const mailer=require('../../mailer')


// ----------------------------------------
// --------------GET-----------------------
// ----------------------------------------



// ----------------------------------------
// --------------POST-----------------------
// ----------------------------------------
router.post('/signup',(req,response)=>{
    const {firstname,lastname,email,password}=req.body
    const pwd=crypto.SHA256(password)
    const statement=`insert into user(firstname,lastname,email,password) values ('${firstname}','${lastname}','${email}','${pwd}'`
    db.query(statement,(error,data)=>{
        mailer.sendEmail(email, 'Welcome to mystore','<h1>welcome</h1>',  (error, info) => {
            console.log(error)
            console.log(info)
            response.send(utils.createResult(error, data))
          })
      
    })
})



// ----------------------------------------
// --------------PUT-----------------------
// ----------------------------------------




// ----------------------------------------
// --------------DELETE-----------------------
// ----------------------------------------


module.exports=router