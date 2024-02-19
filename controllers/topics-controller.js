
const {selectTopics,selectApiEndPoints,selectArticleById}=require('../models/topics-model')



exports.getTopics=(req,res,next)=>{
   
      selectTopics().then((topics)=>{
              res.status(200).send({topics})

      }).catch((err)=>{

        next(err)
      }) 
}
exports.getApiEndPoints=(req,res,next)=>{
  selectApiEndPoints().then((info)=>{
   
       res.status(200).send(info)
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