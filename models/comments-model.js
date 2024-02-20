const db=require('../db/connection')

exports.selectComments= (article_id)=>{
return db.query(`SELECT comment_id,comments.votes,comments.created_at,comments.author,comments.body,comments.article_id FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id  WHERE comments.article_id=$1 ORDER BY created_at DESC;`,[article_id])
.then((result)=>{
  console.log(result.rows)
    return result.rows
})


}