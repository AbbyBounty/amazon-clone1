

const express=require('express')
const utils=require('../../utils')
const db=require('../../db')
const config=require('../../config')
const router=express.Router()
const crypto=require('crypto-js')
const jwt=require('jsonwebtoken')

// -----------------------------------------
// --------------------GET------------------
// -----------------------------------------
router.get('/profile',(req,response)=>{
    const statement=`select firstName,lastName,email,phone,address,city,zip,country from admin where id='${req.userid}'`
    db.query(statement,(error,admins)=>{
       if (error) {
           response.send({ status: 'error', error: error })
         } else {
           if (admins.length == 0) {
             // admin does not exist
             response.send({ status: 'error', error: 'admin does not exist' })
           } else {
             // admin exists
             const admin = admins[0]
             response.send(utils.createResult(error,admin))
           }
         }
    })
     
})


// -----------------------------------------
// --------------------POST------------------
// -----------------------------------------
router.post('/signup',(req,res)=>{

    const {firstname,lastname,email,password}=req.body
    const encryptedPwd=crypto.SHA256(password)
    const statement=`insert into admin(firstName,lastName,email,password) values ('${firstname}','${lastname}','${email}','${encryptedPwd}')`

    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
    
})

router.post('/signin', (request, response) => {
    const { email, password } = request.body
  
    const encryptedPasssword = crypto.SHA256(password)
    const statement = `select id, email, firstName, lastName, phone from admin where email = '${email}' and password = '${encryptedPasssword}'`
    db.query(statement, (error, admins) => {
      if (error) {
        response.send({ status: 'error', error: error })
      } else {
        if (admins.length == 0) {
          // admin does not exist
          response.send({ status: 'error', error: 'admin does not exist' })
        } else {
          // admin exists
          const admin = admins[0]
          const token = jwt.sign({id: admin['id']}, config.secret)
          response.send({ status: 'success', data: {
              firstName: admin['firstname'],
              lastName: admin['lastname'],
              email: admin['email'],
              phone: admin['phone'],
              token: token
            }
          })
        }
      }
    })
  })



// -----------------------------------------
// ---------------------PUT-----------------
// -----------------------------------------
router.put('/',(req,res)=>{
    
})


// -----------------------------------------
// --------------------DELETE------------------
// -----------------------------------------
router.delete('/',(req,res)=>{
    
})


module.exports=router