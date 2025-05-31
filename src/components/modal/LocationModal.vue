<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">


    <template #title>
      <h3 v-if="!isEdit" class="text-center">Uue asukoha lisamine</h3>
      <h3 v-else class="text-center">Asukoha muutmine</h3>

    </template>

    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div class="col col-2">
              <DistrictDropDown :districts="districts" :selected-district-id="selectedDistrictId"/>
            </div>

            <div class="col col-7">
              <LocationInput :location="location"
                             @event-imageUrl-change="setImageUrl"
                             @event-address-change="setLocationAddress"
                             @event-name-change="setLocationName"
                             @event-openingHours-change="setOpeningHours"/>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <button>Salvesta asukoht</button>
    </template>

  </Modal>


</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import LocationService from "@/services/LocationService";
import CoachesTable from "@/components/coaches/CoachesTable.vue";
import LocationTable from "@/components/location/LocationTable.vue";
import RoleService from "@/services/RoleService";
import navigation from "@/navigation/Navigation";
import {useRoute} from "vue-router";
import DistrictService from "@/services/DistrictService";
import DistrictDropDown from "@/components/location/DistrictDropDown.vue";
import LocationInput from "@/views/LocationInput.vue";

export default {
  name: 'LocationModal',
  components: {LocationInput, DistrictDropDown, LocationTable, CoachesTable, Modal},
  props: {
    modalIsOpen: Boolean,
  },
  data() {
    return {
      selectedDistrictId: 0,
      newLocation: {
        districtId: 0,
        locationName: "string",
        locationAddress: "string",
        openingHours: "string",
        imageUrl: "string"
      },
      districts: [{
        districtId: 0,
        districtName: "string"
      }],
      errorResponse:{
        errorMessage: String,
        errorCode: 0
      }
    }
  },

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
    if (!RoleService.isLoggedIn()) {
      navigation.navigateToErrorView()
    }
    RoleService.isCoach()
    this.isEdit = useRoute().query.locationId !== undefined
    this.selectedLocationId = useRoute().query.locationId
    LocationService.sendGetLocationRequest(this.selectedLocationId)
        .then(response => this.handleSendGetLocationResponse(response)).catch(error => this.handleSendGetLocationErrorResponse(error))
    DistrictService.sendGetDistrictRequest().then(response => this.handleGetDistrictResponse(response))
        .catch(() => navigation.navigateToErrorView())
  }
}

</script>
