const express=require('express')
const utils=require('../../utils')
const db=require('../../db')
const config=require('../../config')
const router=express.Router()
const crypto=require('crypto-js')
const jwt=require('jsonwebtoken')
const mailer=require('../../mailer')
const uuid=require('uuid')
const fs=require('fs')
const path=require('path')


// ----------------------------------------
// --------------GET-----------------------
// ----------------------------------------
router.get('/activate/:token',(req,response)=>{
  const {token}=req.params
  const statement=`update user set active = 1, activationToken = '' where activationToken = '${token}'`
  db.query(statement,(error,data)=>{
      response.send(utils.createResult(error,data))
  })

})


router.get('/',(req,res)=>{
    const statement=`select * from user`
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })

})

router.get('/forget-password/:email',(req,res)=>{
    const {email}=req.params
    const statement=`select id from user where email='${email}'`
    db.query(statement,(error,users)=>{
        if(error){
            res.send(utils.createError(error))

        }else if(users.length==0){
            res.send(utils.createError('user does not exist'))
        }else{
            const user=users[0]
            const otp=utils.OTP()
            const body=`Your otp=${otp}`

            mailer.sendEmail(email,'welocme to store',body,(error,info)=>{
                res.send(
                    utils.createResult(error,{


                        otp:otp,
                        emai:email
                    })
                )
            })
        }
    })
})


// ----------------------------------------
// --------------POST-----------------------
// ----------------------------------------







// ----------------------------------------
// --------------PUT-----------------------
// ----------------------------------------
router.put('/toggle-active/:id',(req,response)=>{
    const {id}=req.params
   const {status} =req.body

   const statement=`update user set active=${status} where id=${id}`
   db.query(statement,(error,data)=>{
    response.send(utils.createResult(error,data))
})
})



// ----------------------------------------
// --------------DELETE-----------------------
// ----------------------------------------


module.exports=router