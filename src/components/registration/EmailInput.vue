<template>
  <div>
    <label class="form-group mb-3">Email</label>
    <input :value="email" @input="$emit('event-update-email', $event.target.value)"
           type="email" class="form-control" placeholder="email">
  </div>
</template>
<script>
export default {
  name: 'EmailInput',
  props:{
    email:String
  }
}
</script>