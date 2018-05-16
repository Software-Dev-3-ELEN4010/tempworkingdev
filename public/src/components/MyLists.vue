<template>
    <div class="col-12">


        <h2>View all your saved lists for your profile</h2>
        <div class="row" v-for="shoppingList in shoppingLists">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{shoppingList.listName}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted"><strong>List Creator</strong> {{shoppingList.creator}}
                    </h6>
                    <div class="card-text">
                        <div v-if="shoppingList.items.length!=0">
                            <h3>Current Shopping List Items</h3>
                            <table class="table">
                                <tr>
                                    <th>Status</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Shop</th>
                                    <th>Category</th>
                                    <th></th>
                                </tr>
                                <tr v-for="item in shoppingList.items">
                                    <td>
                                        <input type="checkbox" id="completeCheckbox" v-model="item.done"
                                               v-on:click="checkItem(item._id, shoppingList._id,item.done)">
                                    </td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.quantity}}</td>
                                    <td>{{item.shop}}</td>
                                    <td>{{item.category}}</td>
                                    <td v-if="shoppingList.editable==true">
                                        <button class="btn btn-danger" v-on:click="deleteItem(shoppingList._id, item._id)">X</button>
                                    </td>
                                    <td v-if="shoppingList.editable==false">
                                        <button class="btn btn-danger" v-on:click="deleteItem(shoppingList._id, item._id)" disabled>X</button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <p1>Add items to new shopping list</p1>
                    <div class="row">
                        <div class="col-8">
                            <input type="text" class="form-control" placeholder="Items name" v-model="listItemName">
                        </div>
                        <div class="col-4">
                            <input type="number" min="1" class="form-control" v-model="listItemQuantity">
                        </div>
                    </div>


                    <select v-model="selectedShopList">
                        <option disabled value="">Please select one</option>
                        <option>Woolworths</option>
                        <option>Pick 'n Pay</option>
                        <option>Checkers</option>
                    </select>
                    <span>Select shop</span>

                    <select v-model="selectedCategoryList">
                        <option disabled value="">Please select one</option>
                        <option>Food</option>
                        <option>Toys</option>
                        <option>Other</option>
                    </select>
                    <span>Select category</span>

                    <button class="btn btn-success" v-on:click="addItemToShoppingList(shoppingList._id)">+</button>

                    <!--sharing-->
                    <div v-if="!sharing">
                        <button v-on:click="share()">Share</button>
                    </div>
                    <div v-if="sharing">
                        <div class="row">
                            <h3>select members to share with</h3>
                            <div class="input-group">

                                <input type="text" class="form-control" placeholder="Email" v-model="email">
                                <button class="btn btn-secondary" v-on:click="addToShareList($event)">Add Email</button>
                            </div>
                            <div class="row">
                                <div v-if="sharingList!=0">
                                    <h3>Sharing List</h3>
                                    <table class="table">
                                        <tr>
                                            <th>Email</th>
                                        </tr>
                                        <tr v-for="email in sharingList">
                                            <td>{{email}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-secondary" v-on:click="send(shoppingList._id)">Send Invites</button>
                    </div>

                    <button class="btn btn-danger" v-on:click="deleteShoppingList(shoppingList._id)">Delete List</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                shoppingLists: [],
                sharingList: [],
                sharing: false
            }
        },
        created: function () {
            this.fetchShoppingLists();
        },
        methods: {
            checkItem(itemId, listId, done){
                axios.post('/api/markDone/', {listId: listId, itemId: itemId, done: !done}).then((response) => {
                    this.typing = false;
                }).catch((error) => {
                })


            },
            share(){
                this.sharing = true
            },
            fetchShoppingLists(){
                axios.get('/api/usersLists/' + this.$session.get('profileId')).then((response) => {
                    this.shoppingLists = response.data
                });
                this.$notify({
                    group: 'foo',
                    title: 'Shopping Lists Have been loaded',
                    text: 'Your profiles lists can be seen below'
                });
            },
            deleteShoppingList(id){
                axios.get('/api/delete/' + id);
                this.fetchshoppingList();
                this.$notify({
                    group: 'foo',
                    title: 'List Deleted',
                    text: 'The shopping list has been removed'
                });
                location.reload()
            },
            deleteItem(listId, itemId){
                axios.get('/api/deleteItem/' + listId + itemId);
                this.fetchshoppingList();
                this.$notify({
                    group: 'foo',
                    title: 'Item Removed',
                    text: 'removed from list'
                });
                location.reload()
            },
            addItemToShoppingList(listId){
                let param = {
                    item: {
                        name: this.listItemName,
                        quantity: this.listItemQuantity,
                        shop: this.selectedShopList,
                        category: this.selectedCategoryList
                    }
                };
                axios.post('/api/addItem/' + listId, param).then((response) => {
                    this.typing = false;
                }).catch((error) => {
                })
                this.$notify({
                    group: 'foo',
                    title: 'Item Added',
                    text: 'Item Has been added to page'
                });
                location.reload()
            },
            addToShareList(event) {
                if (this.email != '') {
                    this.sharingList.push(this.email)
                    this.email = ''
                }
                this.$notify({
                    group: 'foo',
                    title: 'Email Added',
                    text: 'New shared email link has been added'
                });
            },
            send(listid){
                axios.post('/api/shareList/' + listid, {sharingList: this.sharingList}).then((response) => {
                    this.typing = false;
                }).catch((error) => {
                })

                this.$notify({
                    group: 'foo',
                    title: 'Lists Shared',
                    text: 'You have shared lists!'
                });

            }
        }
    }
</script>
