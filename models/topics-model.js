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
   const wantedInfo={}
    for (const key in info){
     wantedInfo[key]=info[key].description

    }
  
      
   return wantedInfo
    
   });


  }

