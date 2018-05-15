process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let ShoppingList = require('../app/ShoppingList')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../Server')
let should = chai.should()
chai.use(chaiHttp)
var expect = chai.expect

describe('Shopping List API Tests', () => {
  describe('Adding new Shopping List', () => {
    it('Should add a new shopping list, with correct parameters', (done) => {
      let listItem = {
        listName: 'Shopping List Test',
        editable: true,
        visible: false,
        items: [{'name': 'testItem1', 'quantity': 1, 'shop': 'Woolworths', 'category': 'other'}, {'name': 'testItem2', 'quantity': 2, 'shop': 'Woolworths', 'category': 'toy'}],
        creator: 'Christopher Test',
        quantity: 2
      }
      chai.request(server)
        .post('/api/add')
        .send(listItem)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('listName')
          res.body.should.have.property('editable')
          res.body.should.have.property('editable')
          res.body.should.have.property('items')
          let items = res.body.items
          items[0].should.have.property('name')
          items[0].should.have.property('quantity')
          items[0].should.have.property('shop')
          items[0].should.have.property('category')
          res.body.should.have.property('creator')
          res.body.listName.should.equal('Shopping List Test')
          done()
        })
    })
  })
  // 200 status code indicates success, whereas a 400 status codes indicates an error
  describe('Deleting items', () => {
    it('Should not delete the invalid item', (done) => {
      chai.request(server)
        .get('/api/delete/12345') // remove a random entry (does not exist as on test DB)
        .end(function (err, res) {
          res.status.should.equal(500)
          done()
        })
    })

    it('Should delete an item from the shopping list', (done) => {
      let listItem = {
        item: 'Crunchie',
        creator: 'Slav',
        quantity: 1
      }
      chai.request(server)
        .post('/api/add')
        .send(listItem)
        .end((err, res) => {
          res.should.have.status(200)
          itemID = res.body._id

          chai.request(server)
            .get('/api/delete/' + itemID)
            .end(function (err, res) {
              expect(res).to.have.status(200)
              done()
            })
          done()
        })
    })
  })

  describe('Retrieving items', () => {
    it('Should list all items from the shopping list', (done) => {
      chai.request(server)
        .get('/api/all')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          done()
        })
      done()
    })
  })

  describe('Update items', () => {
    it('Should be able to edit an existing item by its id', (done) => {
      let listItem = {
        item: 'Mentos',
        creator: 'Mickey',
        quantity: 5
      }
      let updatedListItem = {
        item: 'Airwaves',
        creator: 'Donald',
        quantity: 10
      }
      chai.request(server)
        .post('/api/add')
        .send(listItem)
        .end((err, res) => {
          res.should.have.status(200)
          itemID = res.body._id

          chai.request(server)
            .post('/api/update/' + itemID)
            .send(updatedListItem)
            .end(function (err, res) {
              expect(res).to.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('item')
              res.body.should.have.property('creator')
              res.body.should.have.property('quantity')
              res.body.item.should.equal('Airwaves')
              res.body.creator.should.equal('Donald')
              res.body.quantity.should.equal('10')
              done()
            })
        })
      done()
    })
  })
})
