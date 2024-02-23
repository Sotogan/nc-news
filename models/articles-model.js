const db=require('../db/connection')



exports.selectArticles=(topic)=>{
  let sqlStr=`SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url,COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id `
       const queryVals=[]
       if(topic){
        sqlStr+=`WHERE articles.topic=$1 `
        queryVals.push(topic)
        
        
       }
       sqlStr+=`GROUP BY articles.article_id ORDER BY created_at DESC`
        return db.query(sqlStr,queryVals)
        .then((result)=>{
          
           return result.rows  })        
        
}
exports.updatedArticleById=(article_id,votesUpdate)=>{
        const id=(article_id.article_id)
        const votes=votesUpdate.vote_inc
       if(votes=== undefined){
        return Promise.reject({status:400, msg:'no vote value given'})
       }
        return db.query(`UPDATE articles SET votes= votes + $1 WHERE article_id=$2 RETURNING *;`,[votes,id])
          .then((result)=>{
              if (result.rows.length===0){
                    return Promise.reject({status:404, msg:'id not found'})
                }
                return result.rows
          

          })
      

}