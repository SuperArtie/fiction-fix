/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gift      = require('../../app/models/gift'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'fiction-fix-test';

describe('Gift', function(){
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

  describe('.gifts', function(){
    it('should return gifts and attach item and sender info', function(done){
      Gift.gifts('000000000000000000000001', function(err, gifts){
        expect(gifts).to.have.length(1);
        expect(gifts[0].sender.name).to.equal('sue');
        expect(gifts[0].item.name).to.equal('kryptonite');
        done();
      });
    });
  });
});
