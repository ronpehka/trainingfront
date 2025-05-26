<template>
  <div v-if="successMessage !== null &&  successMessage.length > 0" class="alert alert-success" role="alert">
    {{ successMessage }}
  </div>
</template>


<script>
export default {
  name: 'Success',
  props:{
    successMessage: String
  }
}
</script>
