<template>
  <div>
    <label class="form-label">Sünnikuupäev</label>
    <input :value="dateOfBirth" @input="$emit('event-update-date-of-birth', $event.target.value)"
           type="date" class="form-control" placeholder="date">
  </div>
</template>
<script>
export default {
  name: 'DateOfBirthInput',
  props:{
    dateOfBirth: String
  }
}
</script>