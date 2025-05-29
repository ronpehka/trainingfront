<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">


    <template #title>
      <h3 class="text-center">Asukoha valimine</h3>
    </template>

    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <LocationTable :locations="locations"
            @event-location-selected="$emit('event-location-selected', Number($event))"/>
          </div>
        </div>
      </div>
    </template>

  </Modal>


</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import LocationService from "@/services/LocationService";
import CoachesTable from "@/components/coaches/CoachesTable.vue";
import LocationTable from "@/components/location/LocationTable.vue";

export default {
  name: 'LocationModal',
  components: {LocationTable, CoachesTable, Modal},
  props: {
    modalIsOpen: Boolean,
  },
  data() {
    return {

  methods: {
    handleGetLocationsRequestResponse(response) {
      this.locations = response.data;
    },

    handleGetLocationsRequestError(error) {
      console.error("Error fetching locations:", error);
      this.errorResponse.errorMessage = error?.response?.data?.message || "Viga asukohtade laadimisel";
    }

  },


  beforeMount() {
    LocationService.sendGetLocationsRequest().then(response => this.handleGetLocationsRequestResponse(response))
        .catch(error => this.handleGetLocationsRequestError(error))
  }
}
</script>
