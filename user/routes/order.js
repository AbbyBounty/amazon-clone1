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


// ----------------------------------------
// --------------POST-----------------------
// ----------------------------------------
router.post('/',(req,resr)=>{

})


router.post('/signin', (request, response) => {
    const {email, password} = request.body
    const statement = `select id, firstName, lastName, active from user where email = '${email}' and password = '${crypto.SHA256(password)}'`
    db.query(statement, (error, users) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else if (users.length == 0) {
        response.send({status: 'error', error: 'user does not exist'})
      } else {
        const user = users[0]
        if (user['active'] == 1) {
          // user is an active user
          const token = jwt.sign({id: user['id']}, config.secret)
          response.send(utils.createResult(error, {
            firstName: user['firstName'],
            lastName: user['lastName'],
            token: token
          }))
        } else {
          // user is a suspended user
          response.send({status: 'error', error: 'your account is not active. please contact administrator'})
        }
      }
    })
  })
  


// ----------------------------------------
// --------------PUt-----------------------
// ----------------------------------------

// ----------------------------------------
// --------------DELETE-----------------------
// ----------------------------------------
