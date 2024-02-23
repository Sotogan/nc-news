const {selectComments,addComment,deleteByCommentId}=require('../models/comments-model')



exports.getComments=(req,res,next)=>{
  
    const {article_id}=req.params
    selectComments(article_id)
    .then((comments)=>{

     res.status(200).send({comments})
    }).catch((err)=>{
        next(err)
    })
}



exports.createComment=(req,res,next)=>{
   addComment(req.params,req.body).then((comment)=>{
    res.status(201).send({comment})
   }).catch((err)=>{
    next(err)
   })

}

exports.deleteComment=(req,res,next)=>{
    deleteByCommentId(req.params).then(()=>{
      res.status(204).send()
    }).catch((err)=>{
        next(err)
    })

}