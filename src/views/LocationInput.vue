<template>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text">Lisa asukohanimi</span>
      <input
          type="text"
          class="form-control"
          :value="newLocation.locationName"
          @input="$emit('event-name-change', $event.target.value)"
      >
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Lisa aadress</span>
      <input
          type="text"
          class="form-control"
          :value="newLocation.address"
          @input="$emit('event-address-change', $event.target.value)"
      >
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Lisa lahtiolekuajad</span>
      <input
          placeholder="E-R 9.00-22.00"
          type="text"
          class="form-control"
          :value="newLocation.openingHours"
          @input="$emit('event-openingHours-change', $event.target.value)"
      >
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Lisa pilt lingina</span>
      <input
          type="text"
          class="form-control"
          :value="newLocation.imageUrl"
          @input="$emit('event-imageUrl-change', $event.target.value)"
      >
    </div>
    <div class="row justify-content-center" v-if="newLocation.imageUrl">
      <div class="col col-6">
        <img
            :src="newLocation.imageUrl"
            alt="Asukoha pilt"
            class="img-fluid rounded shadow-sm"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationInput',
  props: {
    newLocation: Object
  }
}
</script>
