const express=require('express')
const utils=require('../../utils')
const db=require('../../db')
const config=require('../../config')
const router=express.Router()
const crypto=require('crypto-js')
const jwt=require('jsonwebtoken')
const mailer=require('../../mailer')
const uuid=require('uuid')


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


// ----------------------------------------
// --------------POST-----------------------
// ----------------------------------------
router.post('/signup',(req,response)=>{
    const {firstName,lastName,email,password}=req.body
    const pwd=crypto.SHA256(password)
    const activationToken=uuid.v4()

    const acivationLink=`http://localhost:4000/user/activate/${activationToken}`
    const body=`
    <h1>Welcome to mystore</h1>

   <p> Hello ${firstName},</p>
   <p>Please acivate your account by clicking following URL </p>
   <p><a href="${acivationLink}">activate</a></p>
   <p>Best Regards</p>
   <p>admin</p>
    `
    const statement=`insert into user(firstName,lastName,email,password,activationToken) values ('${firstName}','${lastName}','${email}','${pwd}','${activationToken}')`
    db.query(statement,(error,data)=>{
        mailer.sendEmail(email, 'Welcome to mystore',body,  (error, info) => {
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