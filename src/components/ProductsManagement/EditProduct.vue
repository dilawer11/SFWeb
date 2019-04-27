<template lang=html>
  <div>
    <div v-if="loading" class="progress">
      <div class="indeterminate"></div>
    </div>
    <h2 class="center-align black-text">Edit Product</h2>
    <div v-if="product" class="edit-product container">
      <form @submit.prevent="editProduct">
        <div class="field name">
          <label for="name">Product Name</label>
          <input type="text" name="category" v-model="product.name">
        </div>
        <div class="field category">
          <label for="category">Product Category</label>
          <input type="text" name="category" v-model="product.category">
        </div>
        <div class="feild description">
          <label for="name">Product Description</label>
          <textarea
            v-model="product.description"
            id="description"
            class="materialize-textarea"
            data-length="250"
          ></textarea>
        </div>
        <label v-if="product.sizes.length" for="Sizes">Added Sizes</label>
        <div v-for="(item,index) in product.sizes" :key="index" class="field">
          <h6>Size: {{item.size}} Price : Rs.{{item.price}}</h6>
          <!-- <input type="text" name="size" v-model="sizes[index].size"> -->
          <!-- <input type="text" name="price" v-model="sizes[index].price"> -->
          <i class="material-icons delete" @click="deleteSize(item)">delete</i>
        </div>

        <div class="field add-sizes">
          <label for="add-sizes">Size</label>
          <input type="text" name="add-size" v-model="anotherSize">
          <label for="add-sizes">Price</label>
          <input type="text" name="add-price" @keydown.tab.prevent="addSize" v-model="anotherPrice">
        </div>
        <div class="btn-small pink add-sizes-button center-align" @click="addSize">
          <i class="material-icons">add</i>
        </div>
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <p></p>
        <div class="field center-align">
          <button class="btn pink">Update Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import validate from "@/js_files/validation.js";
export default {
  name: "EditProduct",
  data() {
    return {
      product: null,
      feedbackTop: "Loading...",
      anotherPrice: null,
      anotherSize: null,
      feedback: null,
      loading: false
    };
  },
  methods: {
    addSize() {
      this.feedback = validate.sizeValidate(this.anotherSize, this.anotherPrice );
      if (!this.feedback) {
        this.product.sizes.push({
          size: this.anotherSize,
          price: Number(this.anotherPrice)
        });
        this.anotherSize = null;
        this.anotherPrice = null;
      }
    },
    deleteSize(size) {
      this.product.sizes = this.product.sizes.filter(
        element => element != size
      );
    },
    editProduct() {
      this.feedback = validate.productValidate(
        this.product.name,
        this.product.category,
        this.product.description,
        this.product.sizes.length
      );
      if (!this.feedback) {
        this.loading = true;
        this.product.slug = slugify(this.product.name, {
          replacement: "-",
          remove: /[$*_+%~()'",!\-:@]/g,
          lower: true
        });
        db.collection("products")
          .doc(this.product.id)
          .update({
            name: this.product.name,
            category: this.product.category,
            description: this.product.description,
            sizes: this.product.sizes,
            image: this.product.image,
            slug: this.product.slug
          })
          .then(() => {
            this.loading = false;
            alert("Product Updated Sucessfully");
            this.$router.push({ name: "ProductsIndex" });
          })
          .catch(err => {
            alert("Something went wrong please try again later");
            this.$router.push({ name: "ProductsIndex" });
            this.loading = false;
          });
      }
    }
  },
  created() {
    this.loading = true;
    let ref = db
      .collection("products")
      .where("slug", "==", this.$route.params.product_slug);
    ref
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          alert("Cannot find the product in the database");
          this.$router.push({ name: "ProductsIndex" });
        } else {
          snapshot.forEach(doc => {
            this.product = doc.data();
            this.product.id = doc.id;
          });
        }
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }
};
</script>

<style>
.edit-product {
  margin-top: 60px;
  padding: 20px;
  max-width: 550px;
}
.edit-product h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-product .field {
  margin: 20px auto;
  position: relative;
}
.edit-product .delete {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
