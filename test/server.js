const chai = require('chai');
const chaihttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../server');

chai.should();
chai.use(chaihttp);

describe('API testing', ()=>{
  describe('GET /api/products/:id', ()=>{
    it(`It should get the product with the given id`, ()=>{
      chai.request(server)
        .get('/api/products/2')
        .end((err, response)=>{
        })
    })
  })
})