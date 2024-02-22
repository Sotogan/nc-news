const {selectArticles,updatedArticleById}= require('../models/articles-model')


exports.getArticles=(req,res,next)=>{
  selectArticles().then((articles)=>{
 res.status(200).send({articles})
  }).catch((err)=>{
     next(err)
  })

}
exports.updateArticleById =(req,res,next)=>{
  console.log(req.params)
  console.log(req.body)
  updatedArticleById(req.params,req.body).then((update)=>{
    res.status(200).send({update})
  }).catch((err)=>{
    next(err)
  })
      



}