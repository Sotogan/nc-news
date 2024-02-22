const db=require('../db/connection')

exports.selectComments= (article_id)=>{
return db.query(`SELECT comment_id,comments.votes,comments.created_at,comments.author,comments.body,comments.article_id FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id  WHERE comments.article_id=$1 ORDER BY created_at DESC;`,[article_id])
.then((result)=>{
    
    if (result.rows.length===0){
        return Promise.reject({status:404, msg:'id not found'})
    }
    return result.rows
})
}
 exports.addComment=(param,newComment)=>{
   const body=newComment.body
   const  author=newComment.username
   const  article_id=param.article_id 
  return db.query(`INSERT INTO comments (body, author, article_id) VALUES ($1,$2,$3) RETURNING *;`,[body,author,article_id])
  .then(({rows})=>{
    if (rows.length===0){
        return Promise.reject({status:404, msg:'id not found'})
    }
    return rows[0]
  })

 }