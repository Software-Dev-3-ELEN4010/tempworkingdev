'use strict'

var express = require('express')
var shoppingListRoutes = express.Router()
var ShoppingList = require('./ShoppingList')

// var userRoutes = express.Router()
var User = require('./User')

shoppingListRoutes.route('/addUser').post(function (req, callres, next) {
  User.find({googleEmail: req.body.googleEmail}, function (err, res) {
    if (res.length) {
      console.log('user is already added')
    } else {
      User.create(
        {
          googleId: req.body.googleId,
          googleName: req.body.googleName,
          googleEmail: req.body.googleEmail,
          googlePhoto: req.body.googlePhoto,
          userShoppingLists: []
        },
        function (error, shoppingList) {
          if (error) {
            callres.status(400).send('Unable to new user shopping list')
          }
          callres.status(200).json(shoppingList)
        }
      )
    }
    if (err) {
      return next(new Error(err))
    }
  })
})

// Retrieve all items from the shopping
shoppingListRoutes.route('/all').get(function (req, res, next) {
  ShoppingList.find(function (err, shoppingList) {
    if (err) {
      return next(new Error(err))
    }
    res.json(shoppingList) // return all items in shopping list
  })
})
// create a shoppingList and add to database
shoppingListRoutes.route('/add').post(function (req, res) {
  ShoppingList.create(
    {
      listName: req.body.listName,
      editable: req.body.editable,
      visible: req.body.visible,
      items: req.body.items,
      creator: req.body.creator
    },
    function (error, shoppingList) {
      if (error) {
        res.status(400).send('Unable to create shopping list')
      }
      res.status(200).json(shoppingList)
    }
  )
})

// Delete shopping list
shoppingListRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  ShoppingList.findByIdAndRemove(id, function (err, shoppingList) {
    if (err) {
      return next(new Error('shopping list was not found'))
    }
    res.status(200).json('Successfully removed')
  })
})

shoppingListRoutes.route('/deleteItem/:id').get(function (req, res, next) {
  var id = req.params.id
  console.log(id)
  ShoppingList.findById(id.substring(0, 24), function (error, shoppingList) {
    console.log(shoppingList)
    if (error) {
      console.log(error)
    }
    var newItems = shoppingList.items.filter(function (item) {
      // this is linting error is ignored cause it needs != not !==
      return item._id != id.substring(24, 48) // eslint-disable-line
    })
    console.log(newItems)
    shoppingList.items = newItems
    shoppingList.save({
      function (error, shoppingList) {
        if (error) {
          res.status(400).send('Unable to delete item on shopping list')
        } else {
          res.status(200).json(shoppingList)
        }
      }})
  })
})

// add a new item to an existing list
shoppingListRoutes.route('/addItem/:id').post(function (req, res, next) {
  ShoppingList.update({_id: req.params.id}, {$push: {items: req.body.item}}, function (err, model) {
    if (err) {
      console.log(err)
    }
  })
})

// Update existing item in the database
shoppingListRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  ShoppingList.findById(id, function (error, shoppingList) {
    if (error) {
      return next(new Error('Item was not found'))
    } else {
      shoppingList.item = req.body.item
      shoppingList.creator = req.body.creator
      shoppingList.quantity = req.body.quantity

      shoppingList.save({
        function (error, shoppingList) {
          if (error) {
            res.status(400).send('Unable to update item on shopping list')
          } else {
            res.status(200).json(shoppingList)
          }
        }
      })
    }
  })
})

module.exports = shoppingListRoutes
