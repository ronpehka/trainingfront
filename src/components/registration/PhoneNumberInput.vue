
<template>
  <div>
    <label>Telefoni number:</label>
    <span class="input-group" id="basic-addon1"></span>
    <input :value="coachPhoneNumber"
           @input="$emit('event-update-phone-number',$event.target.value)"
           type="text" class="form-control">
  </div>
</template>

<script>
export default {
  name: 'PhoneNumberInput',
  props:{
    coachPhoneNumber: String,
  }
}
</script>
