const express=require('express')
const app=express()
const{getTopics,getApiEndPoints,getArticleById}=require('./controllers/topics-controller')
const {getArticles,updateArticleById}=require('./controllers/articles-controller')
const {getComments,createComment,deleteComment}=require('./controllers/comments-controller')
const {getUsers}=require('./controllers/users-controller')


app.use(express.json())
//GET
app.get('/api/topics',getTopics)
app.get('/api',getApiEndPoints)
app.get(`/api/articles/:article_id`,getArticleById)
app.get('/api/articles',getArticles )
app.get(`/api/articles/:article_id/comments`,getComments)
app.get('/api/users', getUsers)

 
//POST
app.post('/api/articles/:article_id/comments',createComment)

//PATCH
app.patch('/api/articles/:article_id', updateArticleById)

//DELETE
app.delete('/api/comments/:comment_id',deleteComment)


//ERROR HANDLING


app.use((err,request,response,next)=>{
       
    if(err.code === '22P02'){
        response.status(400).send({msg:'bad request'})
    }
    next(err)
})
app.use((err,request,response,next)=>{
    if(err.code ==='23502'){
    response.status(404).send({msg:'id not found'})
    }
    next(err)
})

app.use((err,request,response,next)=>{
    if(err.status && err.msg){
        response.status(err.status).send({msg:err.msg})
    }
    next(err)


})
app.all("/*",(request,response,next)=>{
    
    response.status(404).send({msg:'Path not found'})
    next(err)
})


app.use((err,request,response,next)=>{

    response.status(500).send({msg:'Internal server error'})
})







module.exports = app





