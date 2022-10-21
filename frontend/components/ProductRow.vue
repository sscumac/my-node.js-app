<template>
  <div :class="`h-28 ${headline ? 'sm:h-20' : 'sm:h-16'}`">
    <div :class="`relative flex flex-col sm:flex-row ${headline && 'text-2xl'} sm:items-center h-full`">
      <p v-if="!headline" class="mr-2 pt-2 pl-1 capitalize">{{ name }}:</p>
      <div class="pt-2">
        <component :is="headline ? 'h2' : 'p'" v-if="!edit"
                   class="border border-white flex pl-1 ">{{
            originValue
          }} <p v-if="name === 'price'" class="pl-1">€</p>
        </component>
        <div v-else class="relative">
          <p v-if="saveSuccess" class="absolute text-smooth-green bg-white w-full h-full">Saved</p>
          <input v-model="value" :class="`${(name === 'quantity' || name ==='price') && 'w-20'}`"
                 :type="`${name === 'quantity' && 'number'}`"
                 class="w-full sm:w-auto border rounded-sm border-smooth-gray pl-1 normal-case">
          <button class="text-base" @click="updateField(name)">Save</button>
        </div>
      </div>
      <div class="sm:pl-6 pb-4 absolute sm:static rightness">
        <button v-if="editable && !edit"
                class="
                rounded-full
                hover:bg-smoother-gray
                p-2
                sm:p-4
                text-base
                opacity-50
                hover:opacity-75
                transition-all
                duration-300"
                @click="editField">
          <img alt="pen" class="icon" height="12" src="/edit.svg" width="12"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    originValue: {type: [String, Number], default: ''},
    name: {type: String, default: ''},
    headline: {type: Boolean, default: false},
    editable: {type: Boolean, default: true},
  },
  data() {
    return {
      value: this.originValue,
      edit: false,
      saveSuccess: false,
    }
  },
  methods: {
    showSaved() {
      this.saveSuccess = false
      this.edit = false
    },
    editField() {
      this.edit = true
    },
    updateField(fieldName) {
      let body = {}
      body[fieldName] = this.value
      body = JSON.stringify(body)
      fetch(`http://localhost:8000/${this.$route.params.pathMatch}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
        .then((response) => {
          if (response.status === 200) {
            this.saveSuccess = true
            setTimeout(this.showSaved, 500)
            this.$emit('update', this.value)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
}
</script>
<style>
.icon {
  min-width: 12px;
}

.rightness {
  right: 10%
}
</style>
