<template>
  <div class="max-w-screen-xl mx-auto px-4 lg:px-10">
    <PageHeader text="Product Details"/>
    <div v-if="productData" class="p-4 lg:p-10">
      <ProductRow :headline="true" :origin-value="name" name="name" @update="update('name',$event)"/>
      <div>
        <ProductRow :origin-value="description" name="description" @update="update('description',$event)"/>
        <ProductRow :editable="false" :origin-value="rating" name="rating" @update="update('rating',$event)"/>
        <ProductRow :origin-value="price" name="price" @update="update('price',$event)"/>
        <ProductRow :origin-value="quantity" name="quantity" @update="update('quantity',$event)"/>
      </div>
    </div>
  </div>
</template>
<script>
import api from "~/utils/api";

export default {
  async fetch() {
    this.productData = await api.getProducts(this.$route.params.pathMatch)
  },
  data() {
    return {
      productData: null,
      name: '',
      quantity: 0,
      description: '',
      price: '',
      rating: 0,
    }
  },
  watch: {
    productData() {
      this.price = this.productData[0].price
      this.name = this.productData[0].name
      this.rating = this.productData[0].rating
      this.description = this.productData[0].description
      this.quantity = this.productData[0].quantity
    }
  },
  methods: {
    update(field, event) {
      switch (field) {
        case 'price':
          this.price = event
          break
        case 'name':
          this.name = event
          break
        case 'description':
          this.description = event
          break
        case 'quantity':
          this.quantity = event
      }
    },
  },
}
</script>
