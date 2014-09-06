'use strict';

module.exports = function(user, cb){
  //var obj = {userId:user._id};
  //cb(null, obj);
  cb(null, {userId:user._id});
};
