
<template>
  <div>
    <span class="input-group-text" id="basic-addon1"></span>
    <input :value="description"
           @input="$emit('event-update-description-input',$event.target.value)"
           type="text" class="form-control">
  </div>

</template>

<script>
export default {
  name: 'CoachDescriptionInput',
  props:{
    description:""
  }
}
</script>
