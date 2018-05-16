process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let ShoppingList = require('../app/ShoppingList')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../Server')
let should = chai.should()
chai.use(chaiHttp)
var expect = chai.expect

describe('Adding new Shopping List', () => {
    let creatorID = '117557445192175959912'
    let listItem = {
        listName: 'Testing List',
        editable: true,
        visible: false,
        items: [
            {
                'name': 'testItem1',
                'quantity': 1,
                'shop': 'Woolworths',
                'category': 'other'
            },
            {
                'name': 'testItem2',
                'quantity': 2,
                'shop': 'Woolworths',
                'category': 'toy'
            }],
        creator: creatorID
    }
    it('Should add a new shopping list, with correct parameters', (done) => {
        chai.request(server)
            .post('/api/add/' + creatorID)
            .send(listItem)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.listName.should.equal('Testing List')
                res.body.editable.should.equal(true)
                res.body.visible.should.equal(false)
                res.body.items[0].name.should.equal('testItem1')
                res.body.items[0].quantity.should.equal(1)
                res.body.items[0].shop.should.equal('Woolworths')
                res.body.items[0].category.should.equal('other')
                res.body.items[1].name.should.equal('testItem2')
                res.body.items[1].quantity.should.equal(2)
                res.body.items[1].shop.should.equal('Woolworths')
                res.body.items[1].category.should.equal('toy')
                res.body.creator.should.equal(creatorID)
                done()
            })
    })
})

describe('Deletion of Shopping List and Items', () => {
    let creatorID = '117557445192175959912'
    let listItem = {
        listName: 'Testing List',
        editable: true,
        visible: false,
        items: [
            {
                'name': 'testItem1',
                'quantity': 1,
                'shop': 'Woolworths',
                'category': 'other'
            },
            {
                'name': 'testItem2',
                'quantity': 2,
                'shop': 'Woolworths',
                'category': 'toy'
            }],
        creator: creatorID
    }

    it('Should not delete the invalid list', (done) => {
    chai.request(server)
      .get('/api/delete/12345') 
      .end(function (err, res) {
        res.status.should.equal(500)
        done()
      })
    })

    it('Should not delete the invalid list', (done) => {
        chai.request(server)
          .get('/api/delete/12345') 
          .end(function (err, res) {
            res.status.should.equal(500)
            done()
          })
        })

    it('Should not delete the invalid item', (done) => {
        chai.request(server)
            .get('/api/deleteItem/12345')
            .end(function (err, res) {
            res.status.should.equal(500)
            done()
        })
    })

    it('Should not update the invalid item', (done) => {
        chai.request(server)
            .get('/api/addItem/12345') 
            .end(function (err, res) {
            res.status.should.equal(404)
            done()
        })
    })

    it('Should add a new shopping list, with correct parameters and delete', (done) => {
        chai.request(server)
        .post('/api/add/' + creatorID)
        .send(listItem)
        .end((err, res) => {
            res.should.have.status(200)
            listID = res.body._id
            chai.request(server)
            .get('/api/delete/' + listID)
            .end(function (err, res) {
                res.should.have.status(200)
            })
        done()
        })
    })

})

describe('Adding new User to the DB', () => {
    userID = '' + Math.random()*10000000
    let newUser = {
        googleId:  userID,
        googleName: 'Mo Salah',
        googleEmail: 'balondor@gmail.com',
        googlePhoto: 'www.goldenbootPhoto.com'
    }

    it('Should add a new user , with correct parameters', (done) => {
        chai.request(server)
            .post('/api/addUser')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.googleId.should.equal(userID)
                res.body.googleName.should.equal('Mo Salah')
                res.body.googleEmail.should.equal('balondor@gmail.com')
                res.body.googlePhoto.should.equal('www.goldenbootPhoto.com')
                done()
            })
    })
    it('Should not add user', (done) => {
        chai.request(server)
          .get('/api/addUser')
          .end(function (err, res) {
            res.status.should.equal(404)
            done()
          })
    })


})

describe('Multiple Post tests that require the same structure', () => {
    let creatorID = '117557445192175959912'
    let listItem = {
        listName: 'Testing List',
        editable: true,
        visible: false,
        items: [
            {
                'name': 'testItem1',
                'quantity': 1,
                'shop': 'Woolworths',
                'category': 'other',
                'done' : false
            },
            {
                'name': 'testItem2',
                'quantity': 2,
                'shop': 'Woolworths',
                'category': 'toy',
                'done': false
            }],
        creator: creatorID
    }
    it('Should add a new shopping list, with correct parameters and delete', (done) => {
        chai.request(server)
        .post('/api/add/' + creatorID)
        .send(listItem)
        .end((err, res) => {
            res.should.have.status(200)
            listID = res.body._id
            chai.request(server)
            .post('/api/markdone/')
            .end(function (err, res) {
                res.should.have.status(500)
            })
        done()
        })
    })

    it('Should add a new shopping list, with correct parameters and delete', (done) => {
        chai.request(server)
        .post('/api/add/' + creatorID)
        .send(listItem)
        .end((err, res) => {
            res.should.have.status(200)
            listID = res.body._id
            chai.request(server)
            .post('/api/copyList/')
            .end(function (err, res) {
                res.should.have.status(500)
            })
        done()
        })
    })

    it('Should copylist', (done) => {
        chai.request(server)
        .post('/api/add/' + creatorID)
        .send(listItem)
        .end((err, res) => {
            res.should.have.status(200)
            list_ID = res.body._id
            item_ID = res.body.items[0]._id
            done_toggle = true
            let mark_toggle = {
                listID: list_ID,
                itemID: item_ID,
                done: false,
            }
            chai.request(server)
            .post('/api/copyList/')
            .send(mark_toggle)
            .end(function (err, res) {
                res.should.have.status(200)
            })
        done()
        })
    })

    it('Should copyList', (done) => {
        chai.request(server)
        .post('/api/add/' + creatorID)
        .send(listItem)
        .end((err, res) => {
            res.should.have.status(200)
            list_ID = res.body._id
            user_ID = res.body.creator
            done_toggle = true
            let copy = {
                listID: list_ID,
                userID: user_ID,
            }
            chai.request(server)
            .post('/api/copyList/')
            .send(copy)
            .end(function (err, res) {
                res.should.have.status(200)
            })
        done()
        })
    })
})


describe('UserLists', () => {
    it('Should not add user ', (done) => {
        chai.request(server)
          .get('/api/usersLists/' + 123) 
          .end(function (err, res) {
            res.status.should.equal(200)
            done()
          })
    })
    
})

describe('Share Lists', () => {
    it('Should not add shared lists', (done) => {
        chai.request(server)
          .get('/api/shareList/' + 12345) 
          .end(function (err, res) {
            res.status.should.equal(404)
            done()
          })
    })
})
