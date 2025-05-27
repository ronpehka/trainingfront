<template>
  <div class="mb-3">
    <img v-if="  imageData === null || imageData.length === 0" width="150" height="150"
         src="../../assets/coach_avatar_thumbnail.jpg"
         class="img-thumbnail" alt="Treeneri pilt">
    <img v-else width="50" height="50" :src="imageData" class="img-thumbnail" alt="Treeneri pilt">
  </div>
</template>



<script>
export default {
  name: 'ThumbnailImage',
  props:{
    imageData:{
      type: String,
      default:''
    }
  }
}
</script>


