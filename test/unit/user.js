/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    User      = require('../../app/models/user'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'fiction-fix-test';

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
  describe('#dashboard', function(){
    it('should find all messages', function(done){
      var id = '000000000000000000000001';
      User.findById(id, function(err, user){
        user.dashboard(function(err, dashboard){
          expect(dashboard.messages).to.have.length(2);
          done();
        });
      });
    });
    it('should find all proposals', function(done){
      var id = '000000000000000000000001';
      User.findById(id, function(err, user){
        user.dashboard(function(err, dashboard){
          expect(dashboard.proposals).to.have.length(1);
          expect(dashboard.proposals[0].sender.name).to.equal('sue');
          done();
        });
      });
    });
    it('should find all gifts', function(done){
      var id = '000000000000000000000001';
      User.findById(id, function(err, user){
        user.dashboard(function(err, dashboard){
          expect(dashboard.gifts).to.have.length(1);
          expect(dashboard.gifts[0].sender.name).to.equal('sue');
          expect(dashboard.gifts[0].item.name).to.equal('kryptonite');
          done();
        });
      });
    });
    it('should find all winks', function(done){
      var id = '000000000000000000000002';
      User.findById(id, function(err, user){
        user.dashboard(function(err, dashboard){
          expect(dashboard.winks).to.have.length(3);
          expect(dashboard.winks[0].sender.name).to.equal('bobby');
          done();
        });
      });
    });
  });

  describe('#send', function(){
    it('should send a text message to a user', function(done){
      User.findById('000000000000000000000001', function(err, sender){
        User.findById('000000000000000000000002', function(err, receiver){
          sender.send(receiver, {mtype:'text', message:'yo'}, function(err, response){
            expect(response.sid).to.be.ok;
            done();
          });
        });
      });
    });

    it('should send an email message to a user', function(done){
      User.findById('000000000000000000000001', function(err, sender){
        User.findById('000000000000000000000002', function(err, receiver){
          sender.send(receiver, {mtype:'email', message:'yo'}, function(err, response){
            expect(response.id).to.be.ok;
            done();
          });
        });
      });
    });
  });
});

