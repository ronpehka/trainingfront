<template>
  <div>
    <label class="form-label">Perekonnanimi</label>
    <input :value="lastName" @input="$emit('event-update-lastname', $event.target.value)"
        type="text" class="form-control" placeholder="Perekonnanimi">
  </div>
</template>
<script>
export default {
  name: 'LastNameInput',
  props:{
    lastName: String
  }
}
</script>