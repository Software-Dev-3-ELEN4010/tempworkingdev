var mongoose = require('mongoose')

var user = new mongoose.Schema({
  googleId: {
    type: String
  },
  googleName: {
    type: String
  },

  googleEmail: {
    type: String
  },

  googlePhoto: {
    type: String
  },

  userShoppingLists: [{
    id: {type: String}
  }
  ]
},
{
  collection: 'users'
}
)
module.exports = mongoose.model('User', user)
