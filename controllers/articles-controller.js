const {selectArticles,updatedArticleById}= require('../models/articles-model')


exports.getArticles=(req,res,next)=>{
  const {topic}=req.query
   selectArticles(topic).then((articles)=>{
 res.status(200).send({articles})
  }).catch((err)=>{
     next(err)
  })

}
exports.updateArticleById =(req,res,next)=>{
  
    updatedArticleById(req.params,req.body).then((update)=>{
    res.status(200).send({update})
  }).catch((err)=>{
    next(err)
  })
      



}