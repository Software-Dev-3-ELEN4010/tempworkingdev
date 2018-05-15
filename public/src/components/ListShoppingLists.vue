<template>
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">-->
    <div>
        <div class="col-md-12" v-show="shoppingLists.length>0">
            <h2>All Public Shopping List</h2>
            <div class="row mrb-10" v-for="shoppingList in shoppingLists">
                <div v-show="shoppingList.visible==true">
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
                                <td>T</td>
                                <td>{{item.name}}</td>
                                <td>{{item.quantity}}</td>
                                <td>{{item.shop}}</td>
                                <td>{{item.category}}</td>
                                <td><button v-on:click="deleteItem(shoppingList._id, item._id)">X</button>
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
                    <button v-on:click="deleteShoppingList(shoppingList._id)">Delete List</button>
                    <hr>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                shoppingLists: []
            }
        },
        created: function() {
            this.fetchshoppingList();
        },
        methods: {
            fetchshoppingList() {
                axios.get('/api/all').then((response) => {
                    this.shoppingLists = response.data;
                    console.log(this.shoppingLists)

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
            }
        }
    }
</script>