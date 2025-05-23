
<template>
  <div class="mb-3">
    <img width="150" height="150" v-if="  imageData === null || imageData.length === 0" src="https://media.istockphoto.com/id/1934800957/vector/man-empty-avatar-vector-photo-placeholder-for-social-networks-resumes-forums-and-dating.jpg?s=1024x1024&w=is&k=20&c=EjRPg7oLiAQ9s60K5bdvvz6TGWWS-sUVTOoesVvn9rE=" class="img-thumbnail" alt="Treeneri pilt">
    <img width="150" height="150" v-else :src="imageData" class="img-thumbnail" alt="Treeneri pilt">
  </div>
</template>



<script>
export default {
  name: 'CoachImage',
  props:{
    imageData:{
      type: String,
      default:''
    }
  }
}
</script>


