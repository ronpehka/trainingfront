<template>
  <div class="mb-3">
    <img v-if="  imageData === null || imageData.length === 0" width="150" height="150"
         src="https://media.istockphoto.com/id/1934800957/vector/man-empty-avatar-vector-photo-placeholder-for-social-networks-resumes-forums-and-dating.jpg?s=1024x1024&w=is&k=20&c=EjRPg7oLiAQ9s60K5bdvvz6TGWWS-sUVTOoesVvn9rE="
         class="img-thumbnail" alt="Treeneri pilt">
    <img v-else width="150" height="150" :src="imageData" class="img-thumbnail" alt="Treeneri pilt">
  </div>
</template>


<script>
export default {
  name: 'CoachImage',
  props: {
    imageData: {
      type: String,
      default: ''
    }
  }
}
</script>


