const request= require ('supertest');
const app=require('../app.js');
const db=require('../db/connection.js');
const seed= require('../db/seeds/seed.js');
const testData=require ('../db/data/test-data/index.js');
const endPoints=require('../endpoints.json')


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
           
            for(const key in res){
                
            expect(res[key]).toEqual(endPoints[key].description)
        }
        })
        
    });
    
});