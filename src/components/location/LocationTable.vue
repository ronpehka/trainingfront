<template>
  <div class="container text-center">
    <div class="row justify-content-center fw-bold border-bottom pb-2 mb-3">
      <div class="col col-2">Nimi</div>
      <div class="col col-2">Aadress</div>
      <div class="col col-2">Pilt</div>
      <div class="col col-2">Kinnita</div>
    </div>

    <div
        v-for="location in locations"
        :key="location.locationId"
        class="row justify-content-center align-items-center mb-3"
    >
      <div class="col col-2">{{ location.locationName }}</div>
      <div class="col col-2">{{ location.locationAddress }}</div>
      <div class="col col-2">
        <img
            v-if="!location.imageUrl"
            src="../../assets/gym.jpg"
            class="img-thumbnail"
            alt="Suvalise treeningsaali pilt"
        />
        <img
            v-else
            :src="location.imageUrl"
            class="img-thumbnail"
            alt="Treeningsaali pilt"
        />
      </div>
      <div class="col col-2 justify-content-center">
        <div class="form-check d-flex align-items-center">
          <input
              class="form-check-input"
              type="radio"
              name="location"
              :value="location.locationId"
              @change="$emit('event-location-selected', Number(location.locationId))"
          />
          <label class="form-check-label ms-2">
            Vali asukoht
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationTable",
  props: {
    locations: Array,
  },
};
</script>
