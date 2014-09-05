/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Proposal  = require('../../app/models/proposal'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'fiction-fix-test';

describe('Proposal', function(){
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

  describe('.proposals', function(){
    it('should return proposals and attach sender info', function(done){
      Proposal.proposals('000000000000000000000001', function(err, proposals){
        expect(proposals).to.have.length(1);
        expect(proposals[0].sender.name).to.equal('sue');
        done();
      });
    });
  });
});

