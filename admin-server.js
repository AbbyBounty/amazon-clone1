
const express=require('express')
const bodyParser=require('body-parser')
const config=require('./config')
const jwt=require('jsonwebtoken')
const app=express()

const morgan=require('morgan')

const adminRouter=require('./admin/routes/admin')
const brandRouter=require('./admin/routes/brand')
const categoryRouter=require('./admin/routes/category')
const orderRouter=require('./admin/routes/order')
const productRouter=require('./admin/routes/product')
const reviewRouter=require('./admin/routes/review')

app.use(bodyParser.json())
app.use(morgan('combined'))

app.use((req,res,next)=>{

    if(req.url=='/admin/signin' || req.url=='/admin/signup'){
        next()
    }
    else{
    try{
        const token=req.headers['token']
         const data=jwt.verify(token,config.secret)
      
         req.userid=data['id']
         next()
        }
        catch(ex){
            response.status(401)
            response.send({ status: 'error', error: 'protected api' })
        }
    }
})

app.use('/admin', adminRouter)
app.use('/brand',brandRouter)
app.use('/category',categoryRouter)
app.use('/order',orderRouter)
app.use('/product',productRouter)
app.use('/review',reviewRouter)

app.get('/',(req,res)=>{
    res.send('welcome you ')
})

 
app.listen(3000,'0.0.0.0',()=>{
    console.log('server started')
})