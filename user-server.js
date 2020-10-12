const express=require('express')
const bodyParser=require('body-parser')
const config=require('./config')
const jwt=require('jsonwebtoken')
const app=express()

// const morgan=require('morgan')
// const swaggerJSDoc=require('swagger-jsdoc')
// const swaggerUi=require('swagger-ui-express')

app.use(express.static('images/'))
const userRouter=require('./user/routes/user')


app.use(bodyParser.json())
// app.use(morgan('combined'))


app.use('/user', userRouter)





  

app.use((req,res,next)=>{

    if(req.url=='/user/signin' || req.url=='/user/signup' || req.url.startsWith('/activate')){
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
            res.status(401)
            res.send({ status: 'error', error: 'protected api' })
        }
    }
})




app.get('/',(req,res)=>{
    res.send('welcome you ')
})

 
app.listen(4000,'0.0.0.0',()=>{
    console.log('server started')
})