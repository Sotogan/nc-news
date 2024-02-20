const db=require('../db/connection')
const fs=require('fs/promises')


exports.selectArticles=()=>{
       let sqlString='SELECT (article_id),author,title,topic,created_at,votes,article_img_url FROM articles ORDER BY created_at DESC;'
        let sqlString2='SELECT article_id, COUNT (article_id) FROM comments GROUP BY article_id;'
;        
        return db.query(sqlString).then((result)=>{
               let res1=result.rows          
          return  db.query(sqlString2).then((result)=>{
             const res2=result.rows             
              for(let i=0; i<res1.length; i++){
                for(let j=0; j<res2.length; j++){
                    res1[i].comment_count='0'
                    if(res1[i].article_id===res2[j].article_id){
                        res1[i].comment_count=res2[j].count
                    }
                                }
                }
                
                 return res1

                             
            })
        
   
    })
}
