<template>
  <div class="max-w-screen-xl mx-auto px-4 lg:px-10">
    <PageHeader text="The little Tree Store"/>
    <div class="p-4 lg:p-10">
      <div v-for="(product, index) in products" :key="index">
        <ProductCard :product="product"/>
      </div>
    </div>
  </div>
</template>

<script>
import api from '~/utils/api'

export default {
  name: 'IndexPage',
  async asyncData() {
    const data = await api.getProducts('products')
    return {
      products: data
    }
  },
  data() {
    return {
      products: null,
    }
  },
  mounted() {
    function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    this.products = this.products.sort(compare);
  }
}
</script>
