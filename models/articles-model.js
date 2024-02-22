const db=require('../db/connection')
const fs=require('fs/promises')


exports.selectArticles=()=>{
       
        return db.query('SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url,COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;')
        .then((result)=>{
           return result.rows  })        
        
}
exports.updatedArticleById=(article_id,votesUpdate)=>{
        const id=Number(article_id.article_id)
        const votes=votesUpdate.vote_inc
        return db.query(`UPDATE articles SET votes= votes + $1 WHERE article_id=$2 RETURNING *;`,[votes,id])
          .then((result)=>{
              
                return result.rows
          

          })

}
