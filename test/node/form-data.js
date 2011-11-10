
var request = require('../../')
  , express = require('express')
  , assert = require('assert')
  , app = express.createServer();

app.post('/echo', function(req, res){
  res.writeHead(200, req.headers);
  req.pipe(res);
});

app.get('/form-data', function(req, res){
  res.header('Content-Type', 'application/x-www-form-urlencoded');
  res.send('pet[name]=manny');
});

app.listen(3002);

// TODO: "response" event should be a Response

describe('req.data(Object)', function(){
  describe('with req.type() set to form-data', function(){
    it('should send x-www-form-urlencoded data', function(done){
      request
      .post('http://localhost:3000/echo')
      .type('form-data')
      .data({ name: 'tobi' })
      .end(function(res){
        res.header['content-type'].should.equal('application/x-www-form-urlencoded');
        res.text.should.equal('name=tobi');
        done();
      });
    })
  })
  
  describe('when called several times', function(){
    it('should merge the objects', function(done){
      request
      .post('http://localhost:3002/echo')
      .type('form-data')
      .data({ name: { first: 'tobi', last: 'holowaychuk' } })
      .data({ age: '1' })
      .end(function(res){
        res.header['content-type'].should.equal('application/x-www-form-urlencoded');
        res.text.should.equal('name[first]=tobi&name[last]=holowaychuk&age=1');
        done();
      });
    })
  })
})

describe('res.body', function(){
  describe('application/x-www-form-urlencoded', function(){
    it('should parse the body', function(done){
      request
      .get('http://localhost:3002/form-data')
      .end(function(res){
        res.text.should.equal('pet[name]=manny');
        res.body.should.eql({ pet: { name: 'manny' }});
        done();
      });
    })
  })
})
