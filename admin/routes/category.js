

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
router.get('/',(req,res)=>{
    const statement='select * from category'
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })

})


// -----------------------------------------
// --------------------POST------------------
// -----------------------------------------
router.post('/',(req,res)=>{
    const {title,description}=req.body
    const statement=`insert into category (title,description) values ('${title}','${description}')`

    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
    
})

// -----------------------------------------
// ---------------------PUT-----------------
// -----------------------------------------
router.put('/:id',(req,res)=>{
    const {id}=req.params
    const {title,description}=req.body
    const statement=`update category set title='${title}',description='${description}' where id='${id}'`
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})


// -----------------------------------------
// --------------------DELETE------------------
// -----------------------------------------
router.delete('/:id',(req,res)=>{
    const {id}=req.params
    const statement=`delete from  category  where id='${id}'`
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})


module.exports=router