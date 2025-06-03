<template>
  <div>

    <div class="input-group mb-3">
      <span v-if="isEdit" class="input-group-text">Muuda asukohanimi</span>
      <span v-else class="input-group-text">Lisa asukohanimi</span>
      <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.locationName }"
          :value="newLocation.locationName"
          @input="$emit('event-name-change', $event.target.value)"
      >
      <div class="invalid-feedback" v-if="validationErrors.locationName">
        {{ validationErrors.locationName }}
      </div>
    </div>

    <div class="input-group mb-3">

      <span v-if="isEdit" class="input-group-text">Muuda aadress</span>
      <span v-else class="input-group-text">Lisa aadress</span>
      <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.locationName }"
          :value="newLocation.locationAddress"
          @input="$emit('event-address-change', $event.target.value)"
      >
      <div class="invalid-feedback" v-if="validationErrors.locationAddress">
        {{ validationErrors.locationAddress }}
      </div>
    </div>

    <div class="input-group mb-3">

      <span v-if="isEdit" class="input-group-text">Muuda aegu</span>
      <span v-else class="input-group-text">Lisa lahtiolekuajad</span>
      <input
          placeholder="E-R 9.00-22.00"
          type="text"
          :class="{ 'is-invalid': validationErrors.locationName }"
          class="form-control"
          :value="newLocation.openingHours"
          @input="$emit('event-openingHours-change', $event.target.value)"
      >
      <div class="invalid-feedback" v-if="validationErrors.openingHours">
        {{ validationErrors.openingHours }}
      </div>
    </div>
    <div class="input-group mb-3">
      <span v-if="isEdit" class="input-group-text">Muuda pilt lingina</span>
      <span v-else class="input-group-text">Lisa pilt lingina</span>
      <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.locationName }"
          :value="newLocation.imageUrl"
          @input="$emit('event-imageUrl-change', $event.target.value)"
      >
      <div class="invalid-feedback" v-if="validationErrors.imageUrl">
        {{ validationErrors.imageUrl }}
      </div>
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
    newLocation: Object,
    isEdit: Boolean,
    validationErrors: Object

  }
}
</script>
