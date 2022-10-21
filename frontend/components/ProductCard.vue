<template>
  <div class="my-2 max-w-xs">
    <nuxt-link :to="`/products/${product.id}`">
      <div
        class="
        group
        transition-all
        duration-300
        opacity-75
        p-4
        rounded-sm

        hover:bg-whitish-gray"
      >
        <div>
          <h2 class="font-montserrat font-bold text-smooth-green">{{
              product.name
            }}</h2>
          <p class="text-darker-gray py-1">{{ product.quantity }} left in store</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>

export default {
  props: {
    product: {
      type: Object, default: () => {
      }
    }
  }
}
</script>

