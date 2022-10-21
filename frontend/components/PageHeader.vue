<template>
  <h1 class="p-4 lg:p-10 border-b tracking-wider" v-text="text"/>
</template>

<script>
export default {
  props: {
    text: {type: String, default: ''}
  },
}
</script>
