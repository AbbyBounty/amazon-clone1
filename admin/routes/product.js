
const express=require('express')
const utils=require('../../utils')
const db=require('../../db')
const config=require('../../config')
const router=express.Router()
const crypto=require('crypto-js')
const jwt=require('jsonwebtoken')
const multer=require('multer')

const upload = multer({ dest: 'images/' })
// -----------------------------------------
// --------------------GET------------------
// -----------------------------------------
/**
 * @swagger
 *
 * /product:
 *   get:
 *     description: get all  products
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */
router.get('/',(request,response)=>{

const statement=` select p.id, p.title, p.description, 
c.id as categoryId, c.title as categoryTitle,
b.id as brandId, b.title as brandTitle,
p.price, p.image,p.isActive from product p
inner join category c on c.id = p.category
inner join brand b on b.id = p.brand`
db.query(statement,(error,data)=>{

    if (error) {
        response.send(utils.createError(error))
      } else {
        // empty products collection
        const products = []
        
        // iterate over the collection and modify the structure
        for (let index = 0; index < data.length; index++) {
          const tmpProduct = data[index];
          const product = {
            id: tmpProduct['id'],
            title: tmpProduct['title'],
            description: tmpProduct['description'],
            price: tmpProduct['price'],
            isActive:tmpProduct['isActive'],

            brand: {
              id: tmpProduct['brandId'],
              title: tmpProduct['brandTitle']
            },
            category: {
              id: tmpProduct['categoryId'],
              title: tmpProduct['categoryTitle']
            }
          }
          
          products.push(product)
       
        }
    
        response.send(utils.createSuccess(products))
      }
})

  
})


// -----------------------------------------
// --------------------POST------------------
// -----------------------------------------
/**
 * @swagger
 *
 * /product/upload-image/:id:
 *   post:
 *     description: add product image
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */

router.post('/upload-image/:id',upload.single('image'), (req,res)=>{
  const {id}=req.params
  const fileName=req.file.filename
  const statement=`update product set image='${fileName}' where id='${id}'`
  
  db.query(statement,(error,data)=>{
    res.send(utils.createResult(error,data))
})

})

/**
 * @swagger
 *
 * /product/create:
 *   post:
 *     description: add category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: titile for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: add category for product.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: add price for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: brand
 *         description: add brand for product .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.post('/create',(req,res)=>{
    const {title,description,category,price,brand}=req.body
    const statement=`insert into product (title, description, category, price, brand) values (
        '${title}', '${description}', '${category}', '${price}', '${brand}'
      )`
   
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
 * /product/:id:
 *   post:
 *     description: update category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: update titile for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: update category for product.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: update price for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: brand
 *         description: update brand for product .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.put('/:id', (request, response) => {
    const {id} = request.params
    const {title, description, category, price, brand} = request.body
    const statement = `update product set 
        title = '${title}',
        description = '${description}',
        category = '${category}',
        price = '${price}',
        brand = '${brand}'
    where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })


  /**
 * @swagger
 *
 * /product/update-state/:id/:isActive:
 *   post:
 *     description: update active state of product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: update titile for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: update category for product.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: update price for product .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: brand
 *         description: update brand for product .
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
  router.put('/update-state/:id/:isActive', (request, response) => {
    const {id,isActive} = request.params
    const {title, description, category, price, brand} = request.body
    const statement = `update product set 
      isActive=${isActive}
    where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })




// -----------------------------------------
// --------------------DELETE------------------
// -----------------------------------------
  /**
 * @swagger
 *
 * /product/:id:
 *   post:
 *     description: delete a product
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successful message
 */
router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from product where id = ${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  


module.exports=router