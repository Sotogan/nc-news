const request= require ('supertest');
const app=require('../app.js');
const db=require('../db/connection.js');
const seed= require('../db/seeds/seed.js');
const testData=require ('../db/data/test-data/index.js');
const endPoints=require('../endpoints.json');
const { convertTimestampToDate } = require('../db/seeds/utils.js');
const { string } = require('pg-format');


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
                  article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
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
    //   test('should return an array of comments for the given article_id of which each comment should have specific properties ', () => {
    //     const article_id=2
    //     return request(app).get(`/api/articles/${article_id}/comments`)
    //     .expect(200).then(({body})=>{
    //         const {comments}=body
    //         expect(comments).toBeInstanceOf(Array)
    //         expect(comments).toHaveLength(0)
    //     })
    // }
    //     )
  
      test('should respon with an error if given a article_id of a valid type that does not exist in our data', () => {
         return request(app)
         .get('/api/articles/666666/comments')
         .expect (404)
         .then((response)=>{
          
             const error=response.body
          
             expect(error.msg).toBe('id not found')
         })
     });
     test('should respon with an error if given a article_id of a  NON-valid type that does not exist in our database', () => {
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
    test('should respon with an error if given a article_id of a valid type that does not exist in our data', () => {
        return request(app)
        .get('/api/articles/666666/comments')
        .expect (404)
        .then((response)=>{
         
            const error=response.body
         
            expect(error.msg).toBe('id not found')
        })
        
    });
    test('should respon with an error if given a article_id of a  NON-valid type that does not exist in our database', () => {
        return request(app)
        .get('/api/articles/forklift/comments')
        .expect(400)
        .then((response)=>{

            const error=response.body
            expect(error.msg).toBe('bad request')
        })        
    });
        
    });