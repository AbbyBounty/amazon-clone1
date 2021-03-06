

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
/**
 * @swagger
 *
 * /admin/profile:
 *   get:
 *     description: profile for a admin
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */
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
/**
 * @swagger
 *
 * /admin/signup:
 *   post:
 *     description: signup up to the admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstname
 *         description: firstname of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastnmae
 *         description: lastname of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password of admin .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.post('/signup',(req,res)=>{

    const {firstname,lastname,email,password}=req.body
    const encryptedPwd=crypto.SHA256(password)
    const statement=`insert into admin(firstName,lastName,email,password) values ('${firstname}','${lastname}','${email}','${encryptedPwd}')`

    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
    
})

/**
 * @swagger
 *
 * /admin/signin:
 *   post:
 *     description: signin up to the admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password of admin .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
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
/**
 * @swagger
 *
 * /admin/profile/:id:
 *   put:
 *     description: update profile of an admin
 *     produces:
 *       - application/json
 *     parameters:
  *       - name: firstname
 *         description: firstname of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastnmae
 *         description: lastname of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: address
 *         description: address of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: city
 *         description: city of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: country
 *         description: country of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: zip
 *         description: zip of admin .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone of admin .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.put('/profile/:id',(req,res)=>{
  const{id}=req.params
  const {firstname,lastname,email,password,address,city,country,zip,phone}=req.body
  const encryptedPwd=crypto.SHA256(password)
  const statement=`update admin set firstName='${firstname}',lastName='${lastname}',email='${email}',password='${encryptedPwd}',address='${address}',city='${city}',country='${country}',zip='${zip}',phone='${phone}' where id='${id}'`
  db.query(statement,(error,data)=>{
    res.send(utils.createResult(error,data))
})
})


// -----------------------------------------
// --------------------DELETE------------------
// -----------------------------------------
router.delete('/',(req,res)=>{
    
})


module.exports=router