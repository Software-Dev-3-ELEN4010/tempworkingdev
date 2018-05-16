<template>
    <div>
        <h1> Create Shopping List </h1>
        <form @submit.prevent>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Shopping list name" v-model="shoppingListName">
                <input type="checkbox" id="editableCheckbox" v-model="editableCheckbox">
                <label for="checkbox">Editable</label>
                <input type="checkbox" id="visibleCheckbox" v-model="visibleCheckbox">
                <label for="checkbox">Visible</label>
                <hr>

                <h3>Add new item to new shopping list</h3>
                <div class="input-group">

                    <input type="text" class="form-control" placeholder="Item name" v-model="name">
                    <input type="number" min="1" class="form-control" v-model="quantity">
                </div>
                <input type="checkbox" id="completeCheckbox" v-model="done">
                <label for="checkbox">Complete</label>
                <select v-model="shop">
                    <option disabled value="">Please select one</option>
                    <option>Woolworths</option>
                    <option>Pick 'n Pay</option>
                    <option>Checkers</option>
                </select>
                <span>Select shop</span>

                <select v-model="category">
                    <option disabled value="">Please select one</option>
                    <option>Food</option>
                    <option>Toys</option>
                    <option>Other</option>
                </select>
                <span>Select category</span>
                <button v-on:click="addItemToList($event)">Add Item</button>

                <div v-if="items.length!=0">
                    <h3>Current Shopping List Items</h3>
                    <table>
                        <tr>
                            <th>Status</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Shop</th>
                            <th>Category</th>
                        </tr>
                        <tr v-for="item in items">
                            <td>{{item.done}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.shop}}</td>
                            <td>{{item.category}}</td>
                        </tr>
                    </table>
                </div>
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
                </div>
                <button v-on:click="saveShoppingList($event)">Save</button>

            </div>
        </form>
    </div>
</template>

<modal name="hello-world">
    hello, world!
</modal>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                items: [],
                sharing: false,
                sharingList: [],
                typing: false,
                shoppingListName: '',
                editableCheckbox: false,
                visibleCheckbox: false
            }
        },
        methods: {
            share(){
                this.sharing = true
            },

            saveShoppingList(event) {
                console.log(this.$session.get('profileName'))
                if (this.shoppingListName != '') {
                    if (event) event.preventDefault();
                    let param = {
                        listName: this.shoppingListName,
                        editable: this.editableCheckbox,
                        visible: this.visibleCheckbox,
                        items: this.items,
                        creator: this.$session.get('profileName'),
                        quantity: 0
                    };
                    axios.post('/api/add/' + this.$session.get('profileId'), param).then((response) => {
                        axios.post('/api/shareList/' + response.data._id, {sharingList: this.sharingList}).then((response2) => {
                            this.typing = false;
                        }).catch((error) => {
                            console.log(error);
                        })
                        this.typing = false;
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            addItemToList(event) {
                this.items.push({name: this.name, quantity: this.quantity, shop: this.shop, category: this.category, done:this.done})
                this.name = ''
                this.quantity = 0
                this.shop = ''
                this.category = ''
                this.done = false
            },
            addToShareList(event) {
                if (this.email != '') {
                    this.sharingList.push(this.email)
                    this.email = ''
                }
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
