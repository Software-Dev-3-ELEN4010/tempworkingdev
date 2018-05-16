var mongoose = require('mongoose')

var shoppingList = new mongoose.Schema({
        listName: {
            type: String
        },

        editable: {
            type: Boolean
        },

        visible: {
            type: Boolean
        },

        items: [
            {
                name: {type: String},
                quantity: {type: Number},
                shop: {type: String},
                category: {type: String},
                done: {type: Boolean}
            }
        ],

        creator: {
            type: String
        }
    },
    {
        collection: 'shoppingLists'
    }
)
module.exports = mongoose.model('ShoppingList', shoppingList)
