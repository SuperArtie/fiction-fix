/* global describe, before, beforeEach, it */

'use strict';

process.env.DB   = 'fiction-fix-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../app/index'),
    cookie  = null,
    request = require('supertest');

describe('users', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bob@aol.com')
      .send('password=1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /register', function(){
    it('should show the register page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });
  describe('get /edit', function(){
    it('should show the edit user page', function(done){
      request(app)
      .get('/edit')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Edit Profile');
        done();
      });
    });
  });
  describe('put /user', function(){
    it('should redirect to the dashboard', function(done){
      request(app)
      .put('/user')
      .send('email=bob%40email.com&name=bob&age=22&tagline=fas&loc=fefef&loc=&loc=&category=Movie&seeking=Friends&about=asdfasdf')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.include('/dashboard');
        done();
      });
    });
  });
  describe('get /dashboard', function(){
    it('should display the dashboard', function(done){
      request(app)
      .get('/dashboard')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Dashboard');
        done();
      });
    });
  });

  describe('get /profile/email', function(){
    it('should display a user profile', function(done){
      request(app)
      .get('/profile/daniel.s.roden@gmail.com')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('sue');
        done();
      });
    });
  });

  describe('get /gift/:id', function(){
    it('should display gift page for a user', function(done){
      request(app)
      .get('/gift/000000000000000000000002')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('kryptonite');
        done();
      });
    });
  });

  describe('get /purchase/:receiverId/:itemId', function(){
    it('should purchase and item', function(done){
      request(app)
      .post('/purchase/000000000000000000000002/a00000000000000000000001')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.equal('/profile/daniel.s.roden@gmail.com');
        done();
      });
    });
  });

  describe('post /messages/:receiverId', function(){
    it('should send a user a message', function(done){
      request(app)
      .post('/messages/000000000000000000000002')
      .set('cookie', cookie)
      .send('mtype=text&message=Hey Sue')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.equal('/profile/daniel.s.roden@gmail.com');
        done();
      });
    });
  });

  describe('post /wink', function(){
    it('create a wink and redirect', function(done){
      request(app)
      .post('/wink')
      .send('receiverId=000000000000000000000002')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.equal('/profile/daniel.s.roden@gmail.com');
        done();
      });
    });
  });

  describe('get /photos', function(){
    it('should show the photo manager page', function(done){
      request(app)
      .get('/photos')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Manage Your Photos');
        done();
      });
    });
  });

  describe('post /proposal', function(){
    it('create a proposal and redirect', function(done){
      request(app)
      .post('/proposal/000000000000000000000002')
      .send('message=hey%dateProposed=2014-11-01')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.equal('/profile/daniel.s.roden@gmail.com');
        done();
      });
    });
  });

  describe('get /proposal/id', function(){
    it('get a proposal', function(done){
      request(app)
      .get('/proposals/e00000000000000000000001')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('daniel.s.roden@gmail.com');
        done();
      });
    });
  });
});

