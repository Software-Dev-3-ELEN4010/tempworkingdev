<template>
    <div class="col-md-12">
        <h2>View all your saved lists for your profile</h2>
        <div class="row mrb-10" v-for="shoppingList in shoppingLists">
            <h4>{{shoppingList.listName}}</h4>
            <strong>List Creator</strong> {{shoppingList.creator}}
            <strong>Public</strong> {{shoppingList.visible}}
            <strong>Editable</strong> {{shoppingList.editable}}
            <div v-if="shoppingList.items.length!=0">
                <h3>Current Shopping List Items</h3>
                <table>
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
                            <input type="checkbox" id="completeCheckbox" v-model="item.done" v-on:click="checkItem(item._id, shoppingList._id,item.done)">
                        </td>
                        <td>{{item.name}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.shop}}</td>
                        <td>{{item.category}}</td>
                        <td v-if="shoppingList.editable==true">
                            <button v-on:click="deleteItem(shoppingList._id, item._id)">X</button>
                        </td>
                        <td v-if="shoppingList.editable==false">
                            <button v-on:click="deleteItem(shoppingList._id, item._id)" disabled>X</button>
                        </td>
                    </tr>
                </table>
            </div>

            <p1>Add items to new shopping list</p1>

            <input type="text" class="form-control" placeholder="Items name" v-model="listItemName">
            <input type="number" min="1" class="form-control" v-model="listItemQuantity">

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

            <button v-on:click="addItemToShoppingList(shoppingList._id)">Add item</button>

            <!--sharing-->
            <div v-if="!sharing">
                <button v-on:click="share()">Share</button>
            </div>
            <div v-if="sharing">
                <div class="row">
                    <h3>select members to share with</h3>
                    <div class="input-group">

                        <input type="text" class="form-control" placeholder="Email" v-model="email">
                        <button v-on:click="addToShareList($event)">Add Email</button>
                    </div>
                    <div class="row">
                        <div v-if="sharingList!=0">
                            <h3>Sharing List</h3>
                            <table>
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
                <button v-on:click="send(shoppingList._id)">Send Invites</button>
            </div>

            <button v-on:click="deleteShoppingList(shoppingList._id)">Delete List</button>


            <hr>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                shoppingLists: [],
                sharingList:[],
                sharing: false
            }
        },
        created: function () {
            this.fetchShoppingLists();
        },
        methods: {
            checkItem(itemId,listId,done){
                console.log(itemId)
                console.log(listId)
                console.log(done)
                axios.post('/api/markDone/', {listId:listId,itemId:itemId,done:!done}).then((response) => {
                    console.log("added to db");
                    this.typing = false;
                }).catch((error) => {
                    console.log(error);
                })


            },
            share(){
                this.sharing = true
            },
            fetchShoppingLists(){
                axios.get('/api/usersLists/' + this.$session.get('profileId')).then((response) => {
//                    this.shoppingLists = response.data;
                    console.log(response.data)
                    this.shoppingLists = response.data
                });
            },
            deleteShoppingList(id){
                axios.get('/api/delete/' + id);
                this.fetchshoppingList();
            },
            deleteItem(listId,itemId){
                axios.get('/api/deleteItem/'+listId + itemId);
                console.log(listId);
                console.log(listId.length);
                this.fetchshoppingList();
            },
            addItemToShoppingList(listId){
                let param = {
                    item:
                        {
                            name:this.listItemName, quantity:this.listItemQuantity,shop:this.selectedShopList, category:this.selectedCategoryList
                        }
                };
                console.log(param)
                axios.post('/api/addItem/'+listId, param).then((response) => {
                    console.log("added to db");
                    this.typing = false;
                }).catch((error) => {
                    console.log(error);
                })
            },
            addToShareList(event) {
                if (this.email != '') {
                    this.sharingList.push(this.email)
                    this.email = ''
                }
            },
            send(listid){
                axios.post('/api/shareList/' + listid, {sharingList: this.sharingList}).then((response) => {
                    this.typing = false;
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
