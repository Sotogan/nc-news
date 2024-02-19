const express=require('express')
const app=express()
const{getTopics}=require('./controllers/topics-controller')



app.get('/api/topics',getTopics)


 





app.all("/*",(request,response,next)=>{
    response.status(404).send({msg:'Path not found'})
})
app.use((err,request,response,next)=>{
    response.status(500).send({msg:'Internal server error'})
})





module.exports = app





