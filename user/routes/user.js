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



router.post('/signup',(req,response)=>{
    const {firstName,lastName,email,password}=req.body
    const pwd=crypto.SHA256(password)
    const activationToken=uuid.v4()

    const activationLink=`http://localhost:4000/user/activate/${activationToken}`
    const htmlPath=path.join(__dirname,'/../templates/send_activation_link.html')

    let body=''+fs.readFileSync(htmlPath)

    body =body.replace('{firstName}',firstName)
    body =body.replace('{activationLink}',activationLink)
    const statement=`insert into user(firstName,lastName,email,password,activationToken) values ('${firstName}','${lastName}','${email}','${pwd}','${activationToken}')`
    db.query(statement,(error,data)=>{
        mailer.sendEmail(email, 'Welcome to mystore',body,  (error, info) => {
    
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