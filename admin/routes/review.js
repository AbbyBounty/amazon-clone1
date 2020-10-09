

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
router.get('/:id',(req,res)=>{
    const {id}=req.params
    const statement=`select * from productReview where productid='${id}'`
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })

})


// -----------------------------------------
// --------------------POST------------------
// -----------------------------------------
// router.post('/:id',(req,res)=>{
//     const {id}=req.params
//     const {review,rating}=req.body
//     const statement=`insert into productReview (review,productid,userid,rating) values ('${review}','${productid}','${userid}','${rating}')`
//     db.query(statement,(error,data)=>{
//         res.send(utils.createResult(error,data))
//     })
// })

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

router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from productReview where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })


module.exports=router