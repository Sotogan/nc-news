const express=require('express')
const app=express()
const{getTopics,getApiEndPoints,getArticleById}=require('./controllers/topics-controller')
const {getArticles}=require('./controllers/articles-controller')
const {getComments,createComment}=require('./controllers/comments-controller')
 
app.use(express.json())

app.get('/api/topics',getTopics)
app.get('/api',getApiEndPoints)
app.get(`/api/articles/:article_id`,getArticleById)
app.get('/api/articles',getArticles )
app.get(`/api/articles/:article_id/comments`,getComments)

 
//POST
app.post('/api/articles/:article_id/comments',createComment)






app.all("/*",(request,response,next)=>{
    
    response.status(404).send({msg:'Path not found'})
    next(err)
})


app.use((err,request,response,next)=>{
    if(err.code === '22P02'){
        response.status(400).send({msg:'bad request'})
    }
    next(err)
})

app.use((err,request,response,next)=>{
   
    if(err.status && err.msg){
        response.status(err.status).send({msg:err.msg})
    }
    next(err)


})


app.use((err,request,response,next)=>{

    response.status(500).send({msg:'Internal server error'})
})







module.exports = app





