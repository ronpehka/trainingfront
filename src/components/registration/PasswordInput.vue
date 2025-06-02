<template>
  <div>
    <div class="mb-3">
      <label class="form-label-custom d-block mb-1">Parool</label>
      <input
          type="password"
          class="form-control"
          placeholder="Parool"
          :value="password"
          @input="$emit('event-update-password', $event.target.value)"
      >
    </div>
    <div class="mb-3">
      <label class="form-label-custom d-block mb-1">Parool uuesti</label>
      <input
          type="password"
          class="form-control"
          placeholder="Parool"
          :value="passwordRetype"
          @input="$emit('event-update-retyped-password', $event.target.value)"
      >
    </div>
  </div>
</template>


<script>
export default {
  name: 'PasswordInput',
  props:{
    password:String,
    passwordRetype:String
  }

}
</script>