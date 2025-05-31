<template>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text">Lisa asukohanimi</span>
      <input
          type="text"
          class="form-control"
          :value="location.locationName"
          @input="$emit('event-name-change', $event.target.value)"
      >
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Lisa aadress</span>
      <input
          type="text"
          class="form-control"
          :value="location.address"
          @input="$emit('event-address-change', $event.target.value)"
      >
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Lisa lahtiolekuajad</span>
      <input
          type="text"
          class="form-control"
          :value="location.openingHours"
          @input="$emit('event-openingHours-change', $event.target.value)"
      >
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Lisa pilt lingina</span>
      <input
          type="text"
          class="form-control"
          :value="location.imageUrl"
          @input="$emit('event-imageUrl-change', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationInput',
  props: {
    location: Object
  }
}
</script>
