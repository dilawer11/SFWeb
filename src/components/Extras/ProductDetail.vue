<template>
  <div id="product-detail" class="row grid">
      <section class="testimonials padding-top-90 padding-bottom-90" id="testimonials">
      <div class="container">
        <h1>{{product.name}}</h1>
      </div>
    </section>
    <div class="container">

        <div class="row">
          <div class="col-sm-6">
            <img src="/assets/images/portfolio/work-1.jpg">
          </div>
          <div class="col-sm-6">

            <br><br>
            <ul class="list-unstyled project_info">
              <li>
                <span>Category :</span>
                {{product.category}}
              </li>
             
              <li>
                <span>Description :</span>
                {{product.description}}
              </li>
            </ul>
            
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sizeObj,index) in product.sizes" :key="index">
                    <td>{{sizeObj.size}}</td>
                    <td>{{currencySign}}{{(sizeObj.price*currencyRate).toFixed(2)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button class="button btn-default btn-lg"><a href="/#home">Back</a></button>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "ProductDetail",
  data() {
    return {

    }
  },
  computed:{
    ...mapState(['products','currencySign','currencyRate']),
    product: function(){
        return this.products[this.$route.params.product_index]
    }
  },


};
</script>

<style>
.product-detail .row{
  padding:50px;
}
.product-detail .h2{
  margin-top: 50px;
  padding:50px;
}
</style>
