const express=require('express')
const bodyParser=require('body-parser')
const config=require('./config')
const jwt=require('jsonwebtoken')
const app=express()

const morgan=require('morgan')
const swaggerJSDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')

app.use(express.static('images/'))
const adminRouter=require('./user/routes/user')
const brandRouter=require('./user/routes/brand')
const categoryRouter=require('./user/routes/category')
const orderRouter=require('./user/routes/order')
const productRouter=require('./user/routes/product')
const reviewRouter=require('./user/routes/review')

app.use(bodyParser.json())
app.use(morgan('combined'))

const options = {
    definition: {
    //   openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
      info: {
        title: 'Amazon Server', // Title (required)
        version: '1.0.0', // Version (required)
        description:'this is  express server '
      },
    },
    // Path to the API docs
    apis: ['./user/routes/*.js'],
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  

app.use((req,res,next)=>{

    if(req.url=='/user/signin' || req.url=='/user/signup' || req.url=='/1f1b25facf7d435d5721b9420d756590'){
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

app.use('/user', adminRouter)
app.use('/brand',brandRouter)
app.use('/category',categoryRouter)
app.use('/order',orderRouter)
app.use('/product',productRouter)
app.use('/review',reviewRouter)

app.get('/',(req,res)=>{
    res.send('welcome you ')
})

 
app.listen(4000,'0.0.0.0',()=>{
    console.log('server started')
})