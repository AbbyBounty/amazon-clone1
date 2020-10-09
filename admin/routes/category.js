

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
 * /category:
 *   get:
 *     description: get all category
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */
router.get('/',(req,res)=>{
    const statement='select * from category'
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
 * /category:
 *   post:
 *     description: add category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: titile for category .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description for category .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
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
/**
 * @swagger
 *
 * /category/:id:
 *   put:
 *     description: update category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: titile for category .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description for category .
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
    const statement=`update category set title='${title}',description='${description}' where id='${id}'`
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
 * /category/:id:
 *   delete:
 *     description: delete category
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */
router.delete('/:id',(req,res)=>{
    const {id}=req.params
    const statement=`delete from  category  where id='${id}'`
    db.query(statement,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})


module.exports=router