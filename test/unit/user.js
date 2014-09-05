/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    User      = require('../../app/models/user'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'template-test';

describe('User', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new User object', function(){
      var u = new User();
      expect(u).to.be.instanceof(User);
    });
  });
  describe('.findById', function(){
    it('should return a user, based on id', function(done){
      var id = '000000000000000000000001';
      User.findById(id, function(err, user){
        expect(user).to.be.instanceof(User);
        expect(user.email).to.equal('bob@aol.com');
        done();
      });
    });
  });
  describe('#save', function(){
    it('should update the database with user data', function(done){
      var body = {name:'bob', age:22},
          id   = '000000000000000000000001';
      User.findById(id, function(err, bob){
        bob.save(body, function(){
          User.findById(id, function(err, user){
            expect(user.name).to.equal('bob');
            expect(user.age).to.equal(22);
            done();
          });
        });
      });
    });
  });
});

