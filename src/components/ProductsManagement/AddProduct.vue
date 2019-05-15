<template lang=html>
  <div>
    <div v-if="loading" class="progress">
      <div class="indeterminate"></div>
    </div>
    <h2 class="center-align black-text">Add New Product</h2>
    <div class="add-product container">
      <form @submit.prevent="addProduct">
        <div class="field name">
          <label for="name">Product Name</label>
          <input type="text" name="category" v-model="name">
        </div>
        <div class="field category">
          <label for="category">Product Category</label>
          <input type="text" name="category" v-model="category">
        </div>
        <div class="feild description">
          <label for="name">Product Description</label>
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
            data-length="250"
          ></textarea>
        </div>
        <label v-if="sizes.length" for="Sizes">Added Sizes</label>
        <div v-for="(item,index) in sizes" :key="index" class="field">
          <h6>Size: {{item.size}} Price : Rs.{{item.price}}</h6>
          <!-- <input type="text" name="size" v-model="sizes[index].size"> -->
          <!-- <input type="text" name="price" v-model="sizes[index].price"> -->
          <i class="material-icons delete" @click="deleteSize(item)">delete</i>
        </div>

        <div class="field add-sizes row">
          <div class="col s6">
            <label for="add-sizes">Size</label>
            <input type="text" name="add-size" v-model="anotherSize">
          </div>
          <div class="col s6">
            <label for="add-sizes">Price</label>
            <input
              type="text"
              name="add-price"
              @keydown.tab.prevent="addSize"
              v-model="anotherPrice"
            >
          </div>
        </div>
        <div class="btn-small pink add-sizes-button center-align" @click="addSize">
          <i class="material-icons">add</i>
        </div>
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <p></p>
        <div class="field center-align">
          <button class="btn pink">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import validate from '@/js_files/validation.js'
import parser from '@/js_files/parsing.js'
import { loadavg } from 'os';

export default {
  name: "AddProduct",
  data() {
    return {
      name: null,
      category: null,
      description: null,
      sizes: [],
      anotherSize: null,
      anotherPrice: null,
      feedback: null,
      slug: null,
      loading: false,
      products: [],
    };
  },
  methods: {
    addProduct() {
      this.feedback = validate.productValidate(this.name,this.category,this.description,this.sizes.length,this.sizes,this.products)
      if (this.feedback == null) {
        this.loading = true;
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+%~()'",!\-:@]/g,
          lower: true
        });
      
        let product = parser.productTrimmer(this.name,this.category,this.sizes)
        db.collection("products")
          .add({
            name: product.name,
            category: product.category,
            sizes: product.sizes,
            image: "none",
            description: this.description,
            slug: this.slug
          })
          .then(() => {
            this.loading = false;
            alert("Product Added Sucessfully");
            this.$router.push({ name: "ProductsIndex" });
          })
          .catch(err => {
            this.loading = false;
            alert("Something went wrong please try again later");
            this.$router.push({ name: "ProductsIndex" });
          });
      }
    },
    addSize() {
      this.feedback = validate.sizeValidate(this.anotherSize,this.anotherPrice)
      if (!this.feedback) {
        this.sizes.push({
          size: this.anotherSize,
          price: Number(this.anotherPrice)
        });
        this.anotherSize = null;
        this.anotherPrice = null;
      }
    },
    deleteSize(size) {
      this.sizes = this.sizes.filter(element => element != size);
    }
  },
  created(){
    this.loading = true;
    db.collection('products').get().then((snapshot)=>{
          snapshot.forEach(doc => {
            let temp = doc.data();
            temp.id = doc.id;
            this.products.push(temp);
          })
        this.loading = false;
    }).catch(err=>{
      console.log(err);
      this.$router.push({name : "ProductsIndex"})
    })
  }
};
</script>

<style>
.add-product {
  margin-top: 60px;
  padding: 20px;
  max-width: 550px;
}
.add-product h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-product .field {
  margin: 20px auto;
  position: relative;
}
.add-product .delete {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
.add-product textarea.materialize-textarea {
  height: 5rem;
}
</style>
