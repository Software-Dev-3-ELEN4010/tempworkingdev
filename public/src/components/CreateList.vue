<template>
    <div>
        <h1> Create Shopping List </h1>
        <form @submit.prevent>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Shopping list name" v-model="shoppingListName">
                <input type="checkbox" id="editableCheckbox" v-model="editableCheckbox">
                <label for="checkbox">Publically Editable</label>
                <input type="checkbox" id="visibleCheckbox" v-model="visibleCheckbox">
                <label for="checkbox">Publically Visible</label>
                <hr>

                <h3>Add new item to new shopping list</h3>
                <div class="input-group">

                    <input type="text" class="form-control" placeholder="Item name" v-model="name">
                    <input type="number" min="1" class="form-control" v-model="quantity">
                </div>
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
                                <td>T</td>
                                <td>{{item.name}}</td>
                                <td>{{item.quantity}}</td>
                                <td>{{item.shop}}</td>
                                <td>{{item.category}}</td>
                            </tr>
                    </table>
                </div>

                <button v-on:click="saveShoppingList($event)">Save</button>
            </div>
        </form>
    </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        items: [],
          sharing: [],
        typing: false,
        shoppingListName: '',
        editableCheckbox: false,
        visibleCheckbox: false
      }
    },
    methods: {
      saveShoppingList(event) {
        if (this.shoppingListName != '') {
          if (event) event.preventDefault();
          let param = {
            listName: this.shoppingListName,
            editable: this.editableCheckbox,
            visible: this.visibleCheckbox,
            items: this.items,
            creator: this.$session.get('profileId'),
            quantity: 0
          };
          axios.post('/api/add/'+this.$session.get('profileId'), param).then((response) => {
            console.log("added to db");
            this.typing = false;
          }).catch((error) => {
            console.log(error);
          })
        }
      },
      addItemToList(event) {
        this.items.push({name: this.name, quantity: this.quantity, shop: this.shop, category: this.category})
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
