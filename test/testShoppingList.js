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
      .get('/api/delete/12345') // remove a random entry (does not exist as on test DB)
      .end(function (err, res) {
        res.status.should.equal(500)
        done()
      })
    })

    it('Should not delete the invalid item', (done) => {
        chai.request(server)
            .get('/api/deleteItem/12345') // remove a random entry (does not exist as on test DB)
            .end(function (err, res) {
            res.status.should.equal(500)
            done()
        })
    })

    it('Should not update the invalid item', (done) => {
        chai.request(server)
            .get('/api/addItem/12345') // remove a random entry (does not exist as on test DB)
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

    // it('Should add a new shopping list, and delete item', (done) => {
    //     chai.request(server)
    //     .post('/api/add/' + creatorID)
    //     .send(listItem)
    //     .end((err, res) => {
    //         res.should.have.status(200)
    //         itemID = res.body.items[0]._id
    //         chai.request(server)
    //         .get('/deleteItem/' + itemID)
    //         .end(function (err, res) {
    //             res.should.have.status(200)
    //         })
    //     done()
    //     })
    // })

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
    it('Should not ', (done) => {
        chai.request(server)
          .get('/api/addUser') // remove a random entry (does not exist as on test DB)
          .end(function (err, res) {
            res.status.should.equal(404)
            done()
          })
    })
})




// describe('Retrieve User to the DB', () => {
//     userID = String(parseInt(Math.random() *10000))
//     let newUser = {
//         googleId:  userID,
//         googleName: 'Mo Salah',
//         googleEmail: 'balondor@gmail.com',
//         googlePhoto: 'www.goldenbootPhoto.com'
//     }

//     it('Should add a new user , with correct parameters', (done) => {
//         chai.request(server)
//             .post('/api/addUser')
//             .send(newUser)
//             .end((err, res) => {
//                 res.should.have.status(200)
//                 res.body.googleId.should.equal(userID)
//                 res.body.googleName.should.equal('Mo Salah')
//                 res.body.googleEmail.should.equal('balondor@gmail.com')
//                 res.body.googlePhoto.should.equal('www.goldenbootPhoto.com')
//                 done()
//             })
//     })
//     // it('Should not add user', (done) => {
//     //     chai.request(server)
//     //       .get('/api/addUser') // remove a random entry (does not exist as on test DB)
//     //       .end(function (err, res) {
//     //         res.status.should.equal(404)
//     //         done()
//     //       })
//     // })


//     // it('Should not retreive user list', (done) => {
//     //     chai.request(server)
//     //         .get('/api/usersLists/' + 123) // remove a random entry (does not exist as on test DB)
//     //         .end(function (err, res) {
            
//     //         res.status.should.equal(500)
//     //         done()
//     //     })
//     // })


   
// })




// // describe('Adding new Shopping List', () => {
// //   let listItem = {
// //     listName: 'Testing List',
// //     editable: true,
// //     visible: false,
// //     items: [
// //       { 'name': 'testItem1',
// //         'quantity': 1,
// //         'shop': 'Woolworths',
// //         'category': 'other'}, 
// //       { 'name': 'testItem2',
// //         'quantity': 2,
// //         'shop': 'Woolworths',
// //         'category': 'toy'
// //         }],
// //     creator: 'CreatorTest'
// //   }

// //     it('Should not delete the invalid item', (done) => {
// //     chai.request(server)
// //       .get('/api/delete/12345') // remove a random entry (does not exist as on test DB)
// //       .end(function (err, res) {
// //         res.status.should.equal(500)
// //         done()
// //       })

// //   it('Should add a new shopping list, with correct parameters', (done) => {
// //     chai.request(server)
// //       .post('/api/add')
// //       .send(listItem)
// //       .end((err, res) => {
// //         res.should.have.status(200)
// //         done()
// //       })
// //   })
// // })


// //  // 200 status code indicates success, whereas a 400 status codes indicates an error
// //  describe('Deleting items', () => {
// //   it('Should not delete the invalid item', (done) => {
// //     chai.request(server)
// //       .get('/api/delete/12345') // remove a random entry (does not exist as on test DB)
// //       .end(function (err, res) {
// //         res.status.should.equal(500)
// //         done()
// //       })
// //   })

// //   it('Should delete an item from the shopping list', (done) => {
// //     let listItem = {
// //       item: 'Crunchie',
// //       creator: 'Slav',
// //       quantity: 1
// //     }
// //     chai.request(server)
// //       .post('/api/add')
// //       .send(listItem)
// //       .end((err, res) => {
// //         res.should.have.status(200)
// //         itemID = res.body._id

// //         chai.request(server)
// //           .get('/api/delete/' + itemID)
// //           .end(function (err, res) {
// //             expect(res).to.have.status(200)
// //             done()
// //           })
// //         done()
// //       })
// //   })
// // })

// // describe('Retrieving items', () => {
// //   it('Should list all items from the shopping list', (done) => {
// //     chai.request(server)
// //       .get('/api/all')
// //       .end(function (err, res) {
// //         expect(res).to.have.status(200)
// //         done()
// //       })
// //     done()
// //   })
// // })

// // describe('Update items', () => {
// //   it('Should be able to edit an existing item by its id', (done) => {
// //     let listItem = {
// //       item: 'Mentos',
// //       creator: 'Mickey',
// //       quantity: 5
// //     }
// //     let updatedListItem = {
// //       item: 'Airwaves',
// //       creator: 'Donald',
// //       quantity: 10
// //     }
// //     chai.request(server)
// //       .post('/api/add')
// //       .send(listItem)
// //       .end((err, res) => {
//         res.should.have.status(200)
//         itemID = res.body._id

//         chai.request(server)
//           .post('/api/update/' + itemID)
//           .send(updatedListItem)
//           .end(function (err, res) {
//             expect(res).to.have.status(200)
//             res.body.should.be.a('object')
//             res.body.should.have.property('item')
//             res.body.should.have.property('creator')
//             res.body.should.have.property('quantity')
//             res.body.item.should.equal('Airwaves')
//             res.body.creator.should.equal('Donald')
//             res.body.quantity.should.equal('10')
//             done()
//           })
//       })
//     done()
//   })
// })