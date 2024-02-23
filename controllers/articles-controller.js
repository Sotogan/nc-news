const {selectArticles,updatedArticleById,selectArticleById}= require('../models/articles-model')


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
exports.getArticleById=(req,res,next)=>{
  
  const {article_id}=req.params
    selectArticleById(article_id)
  .then((article)=>{
    res.status(200).send({article})

  }).catch((err)=>{
      next(err)
  })
}