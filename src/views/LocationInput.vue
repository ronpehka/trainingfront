<template>
  <div>
  <div class="input-group mb-3">
    <span class="input-group-text">Lisa asukohanimi</span>
    <input type="text" class="form-control">
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">Lisa aadress</span>
    <input type="text" class="form-control">
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">Lisa pilt lingina</span>
    <input type="text" class="form-control">
  </div>
  </div>
</template>
<script>
export default {
  name: 'LocationInput',
  props:{
    location:Object
  }
}
</script>