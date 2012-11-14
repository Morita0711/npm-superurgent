
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

app.set('json spaces', 0);

app.use(function(req, res, next){
  if ('/echo' != req.url) return next();
  res.set(req.headers);
  req.pipe(res);
});

app.use(express.bodyParser());

app.get('/', function(req, res){
  res.redirect('/test/');
});

app.get('/error', function(req, res){
  res.status(500).send('fail');
});

app.get('/unauthorized', function(req, res){
  res.send(401);
});

app.get('/bad-request', function(req, res){
  res.send(400);
});

app.get('/not-acceptable', function(req, res){
  res.send(406);
});

app.get('/no-content', function(req, res){
  res.send(204);
});

app.put('/user/:id', function(req, res){
  res.send('updated');
});

app.patch('/user/:id', function(req, res){
  res.send('updated');
});

app.get('/querystring', function(req, res){
  res.send(req.query);
});

app.post('/todo/item', function(req, res){
  var buf = '';
  req.on('data', function(chunk){ buf += chunk; });
  req.on('end', function(){
    res.send('added "' + buf + '"');
  });
});

app.post('/user/:id/pet', function(req, res){
  res.send('added pet "' + req.body.pet + '"');
});

app.post('/user', function(req, res){
  res.send('created');
});

app.del('/user/:id', function(req, res){
  res.send('deleted');
});

app.all('/echo-header/:field', function(req, res){
  res.send(req.headers[req.params.field]);
});

app.post('/pet', function(req, res){
  res.send('added ' + req.body.name + ' the ' + req.body.species);
});

app.get('/pets', function(req, res){
  res.send(['tobi', 'loki', 'jane']);
});

app.get('/foo', function(req, res){
  res
    .header('Content-Type', 'application/x-www-form-urlencoded')
    .send('foo=bar');
});

app.use(express.static(__dirname + '/../'));

app.listen(3001);
console.log('Test server listening on port 3000');
