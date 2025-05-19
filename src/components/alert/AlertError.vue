
<template>
<div v-if="errorMessage !==null && errorMessage.length > 0" class="alert alert-warning" role="alert">
  {{errorMessage}}
</div>
</template>

<script>
export default {
  name: 'AlertError',
  props: {
    errorMessage: String,
  }
}
</script>
