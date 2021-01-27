const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
app.use('/',router)

mongoose.connect('mongodb://127.0.0.1:27017/auth',{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
})


const User = require('./model/user')

var auth =async (req,res,next)=>{
   let headers = req.headers;
   if(headers.email){
    let email = headers.email;
    let password = headers.password
    const data =  await User.find()
    for(var k in data){
        console.log(data[k]);
        if(email==data[k].email && password==data[k].password){
            console.log('ok');
            next()
        }
    } 
   }
   else{
    res.status(401).send('not user')
}

}
router.get('/',auth,async(req,res,next)=>{
    try {
     const data = await User.find()
     res.status(200).send(data)
     next()
     for(var k in data){
         console.log(data[k].username);
         console.log(data[k].password);
     }
    } catch (error) {
        res.status(500).send(error)
    }
 })
 
 


app.listen(3002)