const nodemailer=require('nodemailer')
const config=require('./config')
function sendEmail(email,subject,body,func){
    const transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:config.emailUser,
            pass:config.password
        }
    })
    const options = {
        from: config.emailUser,
        to: email,
        subject: subject,
        html: body
      }
    
      transport.sendMail(options, func)
    }
    
// sendEmail(
//     'abhiwardha@gmail.com',
//     'welcome to mystore',
//     `<h1>Welcome</h1>
//     <div>heloo welcome to  my aplication 2</div>`
//     )

    module.exports = {
      sendEmail: sendEmail
    }