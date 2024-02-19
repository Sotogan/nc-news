const express=require('express')
const app=express()
const{getTopics,getApiEndPoints}=require('./controllers/topics-controller')



app.get('/api/topics',getTopics)
app.get('/api',getApiEndPoints)


 





app.all("/*",(request,response,next)=>{
    response.status(404).send({msg:'Path not found'})
})
app.use((err,request,response,next)=>{

    response.status(500).send({msg:'Internal server error'})
})





module.exports = app





