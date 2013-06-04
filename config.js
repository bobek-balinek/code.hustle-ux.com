var crypto = require('crypto');

module.exports = {
  email: 'bobak.art@gmail.com',
  title: 'Bobby Tables',
  style: 'monokai'
};

var gravatarHash = crypto.createHash('md5').update(module.exports.email).digest('hex');
module.exports.gravatar = 'http://www.gravatar.com/avatar/' + gravatarHash;
