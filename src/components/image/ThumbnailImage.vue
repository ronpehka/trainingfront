
<template>
  <div class="mb-3">
    <img width="50" height="50" :src="imageData" class="img-thumbnail" alt="Treeneri pilt">
  </div>
</template>



<script>
export default {
  name: 'ThumbnailImage.vue',
  props:{
    imageData:{
      type: String,
      default:''
    }
  }
}
</script>


