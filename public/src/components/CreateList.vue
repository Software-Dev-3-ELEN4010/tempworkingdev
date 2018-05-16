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

                <div class="row">
                    <div class="col-3">
                        <label for="name">Item Name</label>
                        <input type="text" id="name" class="form-control" placeholder="Item name" v-model="name">
                    </div>
                    <div class="col-2">
                        <label for="number">Select quantity</label>
                        <input type="number" id="number" min="1" class="form-control" v-model="quantity">
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label for="sel1">Select category</label>
                            <select class="form-control" id="sel1" v-model="category">
                                <option>Food</option>
                                <option>Toys</option>
                                <option>Stationary</option>
                                <option>Cloths</option>
                                <option>Toiletries</option>
                                <option>Pets</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label for="sel2">Select Shop</label>
                            <select class="form-control" id="sel2" v-model="shop">
                                <option>Woolworths</option>
                                <option>Pick 'n Pay</option>
                                <option>Checkers</option>
                                <option>Toys 'R Us</option>
                                <option>CNA</option>
                                <option>Edgers</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-2">

                        <!-- Rounded switch -->
                        <label for="switch">Complete</label>
                        <br>
                        <label id="switch" class="switch">
                            <input type="checkbox" class="checkbox" id="completeCheckbox" v-model="done">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="col-1">
                        <button v-on:click="addItemToList($event)" class="button btn-success">+</button>
                    </div>
                </div>

                <div v-if="items.length!=0" class="row">
                    <h3>Current Shopping List Items</h3>
                    <table class="table">
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


                <div v-if="sharing">
                    <div class="row">
                        <div class="col">
                            <h3>select members to share with</h3>
                            <div class="input-group">

                                <input type="text" class="form-control" placeholder="Email" v-model="email">
                                <button v-on:click="addToShareList($event)" class="button btn-info">Add Email</button>
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
                </div>
                <div class="row">
                    <div class="col">
                        <button v-on:click="share()" class="button btn-info">Share</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" v-on:click="saveShoppingList($event)">Save List</button>
                    </div>
                </div>
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
                this.sharing = !this.sharing
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
                this.$notify({
                    group: 'foo',
                    title: 'List Saved',
                    text: 'The list has been added to your account'
                });
            },
            addItemToList(event) {
                this.items.push({
                    name: this.name,
                    quantity: this.quantity,
                    shop: this.shop,
                    category: this.category,
                    done: this.done
                })
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
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        display: none;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
