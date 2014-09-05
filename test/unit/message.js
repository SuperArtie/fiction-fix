/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Message   = require('../../app/models/message'),
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

  describe('.messages', function(){
    it('should return messages and attach sender info', function(done){
      Message.messages('000000000000000000000001', function(err, messages){
        expect(messages).to.have.length(2);
        expect(messages[0].sender.name).to.equal('sue');
        done();
      });
    });
  });
});

