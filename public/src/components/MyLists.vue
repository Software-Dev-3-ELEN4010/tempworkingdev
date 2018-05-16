<template>
    <div class="col-md-12">
        <h2>View all your saved lists for your profile</h2>
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
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                shoppingLists: []
            }
        },
        created: function() {
            this.fetchShoppingLists();
        },
        methods: {
            fetchShoppingLists(){
                axios.get('/api/usersLists/'+ this.$session.get('profileId')).then((response) => {
//                    this.shoppingLists = response.data;
                    console.log(response.data)
                    this.shoppingLists = response.data
                });
            }
        }
    }
</script>