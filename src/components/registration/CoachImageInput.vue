

<template>
  <div>
    <label>Lisa pilt:</label>
    <div>
      <input class="form-control" type="file"
             @change="handleImage" accept="image/x-png,image/jpeg,image/gif">

    </div>

  </div>

</template>


<script>
export default {
  name: 'CoachImageInput',
  props:{
    imageData: String

  },
  data() {

    return{
      imageDataBase64: String
    }

  },
  methods:{
    handleImage(event) {
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    emitBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataBase64 = reader.result;
        this.$emit('event-new-image-selected', this.imageDataBase64)
      }
          reader.onerror = function (error) {
        alert(error);
          };
      reader.readAsDataURL(fileObject);
    },
  }
}
</script>