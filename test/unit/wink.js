/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Wink      = require('../../app/models/wink'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'fiction-fix-test';

describe('Wink', function(){
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
  describe('.winks', function(){
    it('should return winks and attach sender info', function(done){
      Wink.winks('000000000000000000000002', function(err, winks){
        expect(winks).to.have.length(3);
        expect(winks[0].sender.name).to.equal('bobby');
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create and save a wink', function(done){
      Wink.create('000000000000000000000001','000000000000000000000002', function(){
        Wink.all(function(err, winks){
          expect(winks).to.have.length(6);
          done();
        });
      });
    });
  });
});

