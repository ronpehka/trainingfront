<template>
  <div class="container text-center">
    <div class="row justify-content-center fw-bold border-bottom pb-2 mb-3">
      <div class="col col-2">Nimi</div>
      <div class="col col-2">Aadress</div>
      <div class="col col-2">Pilt</div>
      <div class="col col-2">Vali</div>
      <div class="col col-2"></div>
    </div>

    <div v-for="location in locations" :key="location.locationId" class="row justify-content-center align-items-center mb-3">
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
      <div class="col col-2">
        <button
            type="button"
            class="btn btn-outline-secondary"
            @click="$emit('event-location-selected', Number(location.locationId))"
        >
          Lisa treeningu asukoht
        </button>
      </div>
      <div class="col col-2">
        <font-awesome-icon icon="trash" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationTable',
  props: {
    locations: Array
  }
}
</script>
