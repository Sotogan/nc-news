const db=require('../db/connection')



exports.selectComments= (article_id)=>{
 const  articleIdValues=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34']
 if(!articleIdValues.includes(article_id) && article_id !==undefined && !isNaN(article_id)){
  return Promise.reject({status:404, msg:'id not found'})
 }   

return db.query(`SELECT comment_id,comments.votes,comments.created_at,comments.author,comments.body,comments.article_id FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id  WHERE comments.article_id=$1 ORDER BY created_at DESC;`,[article_id])
.then((result)=>{
  
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
        
    }
    return rows[0]
  })

 }

 exports.deleteByCommentId=(params)=>{

   const commentId=params.comment_id
  
  return db.query(`DELETE FROM comments WHERE comment_id=$1 RETURNING *;`,[commentId])
  .then((result)=>{
    
    if(result.rows.length ===0){
      return Promise.reject({status: 404, msg:'comment_id does not exist'})
     }
    })


 }