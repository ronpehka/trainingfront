
<template>

  <div>
    <label class="form-label-custom">
      Tutvustus
    </label>
    <span class="input-group"></span>
    <input :value="description"
           @input="$emit('event-update-description',$event.target.value)"
           type="text" class="form-control">
  </div>

</template>

<script>
import LastNameInput from "@/components/registration/LastNameInput.vue";

export default {
  name: 'CoachDescriptionInput',
  components: {LastNameInput},
  props:{
    description: String,
  }
}
</script>
