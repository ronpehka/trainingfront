<template>
  <div>
    <label class="form-label">Eesnimi</label>
    <input :value="firstName"
           @input="$emit('event-update-firstname', $event.target.value)"
           type="text" class="form-control" placeholder="Eesnimi">
  </div>
</template>
<script>
export default {
  name: 'FirstNameInput',
  props:{
    firstName: String
  }
}
</script>