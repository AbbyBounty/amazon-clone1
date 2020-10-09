

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
 * /brand:
 *   get:
 *     description: brand for a admin
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */
router.get('/',(req,res)=>{
    const statement='select * from brand'
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })

})


// -----------------------------------------
// --------------------POST------------------
// -----------------------------------------
/**
 * @swagger
 *
 * /brand:
 *   post:
 *     description: signup up to the admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: titile for brand  .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description for brand .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.post('/',(req,res)=>{
    const {title,description}=req.body
    const statement=`insert into brand (title,description) values ('${title}','${description}')`

    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
    
})

// -----------------------------------------
// ---------------------PUT-----------------
// -----------------------------------------
/**
 * @swagger
 *
 * /brand/:id:
 *   put:
 *     description: signup up to the admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: titile for brand  .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description for brand .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.put('/:id',(req,res)=>{
    const {id}=req.params
    const {title,description}=req.body
    const statement=`update brand set title='${title}',description='${description}' where id='${id}'`
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})


// -----------------------------------------
// --------------------DELETE------------------
// -----------------------------------------
/**
 * @swagger
 *
 * /brand/:id:
 *   delete:
 *     description: profile for a admin
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */
router.delete('/:id',(req,res)=>{
    const {id}=req.params
    const statement=`delete from  brand  where id='${id}'`
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})


module.exports=router