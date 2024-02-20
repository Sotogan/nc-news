const { info } = require('console')
const db=require('../db/connection')
const fs=require('fs/promises')



exports.selectTopics=()=>{

 return db.query('SELECT * FROM topics;').then((result)=>{

    return result.rows
 })
}

exports.selectApiEndPoints=()=>{
  return fs
  .readFile('./endpoints.json','utf-8').then((fileContents)=>{
   const info=JSON.parse(fileContents) 
   return info
    })
  }
  

  exports.selectArticleById=(article_id) => {
  
   return  db.query("SELECT * FROM articles WHERE article_id=$1;",[article_id])
   .then((article)=>{
    
    if (article.rows.length===0){
        return Promise.reject({status:404, msg:'id not found'})
    }
    
     return article.rows[0]

   })

  }

