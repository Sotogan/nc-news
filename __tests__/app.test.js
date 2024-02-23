const request= require ('supertest');
const app=require('../app.js');
const db=require('../db/connection.js');
const seed= require('../db/seeds/seed.js');
const testData=require ('../db/data/test-data/index.js');
const endPoints=require('../endpoints.json');


beforeEach(()=>seed(testData));
afterAll(()=>db.end());

describe('GET /api/topics', () => {
    test('respond with an array containing all topics', () => {
        return request(app).get('/api/topics')
         .expect(200)
         .then(({body})=>{            
            const {topics}= body;
            expect(topics).toBeInstanceOf(Array);
            expect(topics).toHaveLength(3);
            topics.forEach((topic)=>{
                expect(topic).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String)
                })
            })
         })
        
    })
    test('should respond with an error of Path not found if paths is incorrect ', () => {
        return request(app).get('/api/tpisdf')
        .expect(404)
        .then((response)=>{
            const error=response.body
            expect(error.msg).toBe('Path not found')
        })
    });
});
describe('GET /api', () => {
    test('should respond with an object  describing all the available end points', () => {
        return request(app).get('/api')
        .expect(200)
        .then((response)=>{
           const res=response.body 
                       
            expect(res).toEqual(endPoints)
        
        })
        
    });
    
});

describe('GET /api/articles/:article_id', () => {

    test('should respond with an object containing specific article ', () => {
        const article_id= 3
        return request(app).get(`/api/articles/${article_id}`)
        .expect(200)
        .then(({body})=>{
            expect(body.article).toEqual(
            expect.objectContaining(
                {article_id:3,
                  title: "Eight pug gifs that remind me of mitch",
                  topic: "mitch",
                  author: "icellusedkars",
                  body: "some gifs",
                  article_img_url:"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                  comment_count: '2'
                })
           )

        })
    })
    test('should respon with an error if given a article_id of a valid type that does not exist in our data', () => {
        return request(app)
        .get('/api/articles/666666')
        .expect (404)
        .then((response)=>{
          
            const error=response.body
          
            expect(error.msg).toBe('id not found')
        })
    });
    test('should respon with an error if given a aritcle_id of a  NON-valid type that does not exist in our database', () => {
        return request(app)
        .get('/api/articles/forklift')
        .expect(400)
        .then((response)=>{

            const error=response.body
            expect(error.msg).toBe('bad request')
        })        
    });
    
})
describe('GET /api/articles', () => {
    test('should  respond with an array containing all articles', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body})=>{
            const {articles}=body;
            expect(articles).toBeInstanceOf(Array)
            expect(articles).toHaveLength(13)
            articles.forEach((article)=>{
                expect(article).toMatchObject({
                   article_id: expect.any(Number),
                    title: expect.any(String),
                    topic :expect.any(String),
                    author: expect.any(String),
                     created_at:expect.any(String),  
                    votes:expect.any(Number),
                    article_img_url:expect.any(String),
                    comment_count:expect.any(String)

                } 
                )
            })

        })
    });
   


});
describe('GET /api/articles/:article:id/comments', () => {
      test('should return an array of comments for the given article_id of which each comment should have specific properties ', () => {
        const article_id=1
        return request(app).get(`/api/articles/${article_id}/comments`)
        .expect(200).then(({body})=>{
            const {comments}=body
            expect(comments).toBeInstanceOf(Array)
            expect(comments).toHaveLength(11)

            comments.forEach((comment)=>{
                expect(comment).toMatchObject({
                   article_id: expect.any(Number),
                    body: expect.any(String),
                     author: expect.any(String),
                     created_at:expect.any(String),  
                    votes:expect.any(Number),
                    comment_id:expect.any(Number)

        })
      });
    
})
      })
    //    test('should return an empty array for 0 comments for the given article_id ', () => {
    //      const article_id=2
    //     return request(app).get(`/api/articles/${article_id}/comments`)
    //      .expect(200).then(({body})=>{
    //          const {comments}=body
    //          expect(comments).toBeInstanceOf(Array)
    //          expect(comments).toHaveLength(0)
    //      })
    //  }
    //      )
  
      test('should respond with an error if given a article_id of a valid type that does not exist in our data', () => {
         return request(app)
         .get('/api/articles/666666/comments')
         .expect (404)
         .then((response)=>{
          
             const error=response.body
          
             expect(error.msg).toBe('id not found')
         })
     });
     test('should respond with an error if given a article_id of a  NON-valid type that does not exist in our database', () => {
         return request(app)
         .get('/api/articles/forklift/comments')
         .expect(400)
         .then((response)=>{

             const error=response.body
             expect(error.msg).toBe('bad request')
         })        
     });
    })
    describe('POST  /api/articles/:article_id/comments', () => {

        test('should return new object with the values of the new message', () => {
            
    
        const newComment={
            username:'butter_bridge',
            body:'blah blah blah,yada,yada ,yada'
        }
        return request(app)
        .post('/api/articles/2/comments')
        .expect(201)
        .send(newComment)
        .then(({body})=>{
            expect(body.comment).toEqual(
                {
                    comment_id: 19,
                    body: 'blah blah blah,yada,yada ,yada',
                    article_id: 2,
                    author: 'butter_bridge',
                    votes: 0,
                    created_at: expect.any(String)
                  })

        })
    });
     test('should respond with an error if given a article_id of a valid type that does not exist in our data', () => {
         return request(app)
         .post('/api/articles/666666/comments')
         .expect (404)
         .then((response)=>{
          const error=response.body
       
             expect(error.msg).toBe('id not found')
         })
        
    });
    test('should respond with an error if given a article_id of a  NON-valid type that does not exist in our database', () => {
        return request(app)
        .post('/api/articles/forklift/comments')
        .expect(400)
        .then((response)=>{

            const error=response.body
            expect(error.msg).toBe('bad request')
        })        
    });
        
    });


    describe('PATCH /api/articles/:article_id', () => {
        test('should patch votes with the new vote count ',async () => {
            const article_id=1
            const newvote=1
            let response=await request(app)
            .patch(`/api/articles/${article_id}`)
            .send({vote_inc: newvote})
           
            expect(response.body.update[0].votes).toEqual(101)

            
            
        });
        test('should respond with an error if given a article_id of an  invalid type', () => {
            const article_id='forklift'
            const newvote=1
            return request(app)
            .patch(`/api/articles/${article_id}`)
            .expect(400)
            .send({vote_inc:newvote})
            .then((response)=>{
         
               const error=response.body
               
                
                expect(error.msg).toBe('bad request')
            })        
        });
        test('should respond with an error if given a article_id of a valid type that exists in our data', () => {
            const article_id=5555
            const newvote=1
            return request(app)
            
            .patch(`/api/articles/${article_id}`)
            .expect (404)
            .send({vote_inc:newvote})
            .then((response)=>{
             const error=response.body
         
                expect(error.msg).toBe('id not found')
            })
           
       });
       test('should respond with an error if vote_inc doesn\'t exist', () => {
        const article_id=2
        
        return request(app)
        .patch(`/api/articles/${article_id}`)
        .expect (400)
        .send()
        .then((response)=>{
         const error=response.body
            expect(error.msg).toEqual('no vote value given')
        })
       
   });
   test('should respond with an error if vote_inc exists but is of wrong value', () => {
    const article_id=2
    const newVote='one'
    return request(app)
    .patch(`/api/articles/${article_id}`)
    .expect (400)
    .send({vote_inc:newVote})
    .then((response)=>{
     const error=response.body
        expect(error.msg).toEqual('bad request')
    })
   
});
        
        
    });



    describe('DELETE /api/comments/:comment_id', () => {
        test('should delete comment with given comment_id ',() => {
            const comment_id=1
            return request(app)        
            .delete(`/api/comments/${comment_id}`)
            .expect(204)
     
           
                       
            
        });
        test('should respond 404 comment_id does not exist ', () => {
            const comment_id=5555
            return request(app)
            .delete(`/api/comments/${comment_id}`)
            .expect(404)
            .then((response) => {
              expect(response.body.msg).toBe('comment_id does not exist');
            });
            
        });
        test('should respond 404 comment_id does not exist ', () => {
            const comment_id='forklift'
            return request(app)
            .delete(`/api/comments/${comment_id}`)
            .expect(400)
            .then((response) => {
              expect(response.body.msg).toBe('bad request');
            });
            
        });
        
    });

       describe('GET /api/users', () => {
         test('should respond with an array of objexts of the users with the specific values given ', () => {
            return request(app).get('/api/users')
            .expect(200)
            .then(({body})=>{            
               const {users}= body;
               expect(users).toBeInstanceOf(Array);
               expect(users).toHaveLength(4);
               users.forEach((user)=>{
                   expect(user).toMatchObject({
                   username: expect.any(String),
                   name: expect.any(String),
                   avatar_url: expect.any(String)
                   })
               })
            })
           
                       
            
         });
         test('should respond with an error of Path not found if path is incorrect ', () => {
            return request(app).get('/api/tpisdf')
            .expect(404)
            .then((response)=>{
                const error=response.body
                expect(error.msg).toBe('Path not found')
            })
        });
        
     });
     describe('query on /api/articles topic', () => {
       test('should take a topic query that returns only the articles of the specific topic ', () => {
        return request(app)
        .get('/api/articles?topic=cats')
         .expect(200)
         .then((response)=>{
             const articles=response.body.articles
             expect (articles).toHaveLength(1)
            expect((articles[0].topic)).toBe('cats')
        })
       });  
       test('should respond with apropriate error if topic does not exist ', () => {
        return request(app)
        .get('/api/articles?topic=dogs')
         .expect(404)
         .then((response)=>{
            expect(response.body.msg).toBe('Topic not found');
       });        
     });})
      test('should respond with apropriate error if topic exist but vhas no articles ', () => {
         return request(app)
         .get('/api/articles?topic=paper')
         .expect(200)
         .then((response)=>{
                
             const error=response.body
             expect(error.articles).toEqual([])
        });  
     })
 