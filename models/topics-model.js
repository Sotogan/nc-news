
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
  


