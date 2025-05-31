<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-5">
          <h1 v-if="!isEdit">Lisa uus asukoht</h1>
          <h1 v-else>Muuda asukoht</h1>
        </div>
      </div>
      <div class="row justify-content-center">

        <div class="col col-2">

          <DistrictDropDown
              :districts="districts"
              :selected-district-id="selectedDistrictId"
              @new-district-selected="setNewLocationDistrictId"

          />
        </div>

        <div class="col col-7">
          <LocationInput :new-location="newLocation"
                         @event-imageUrl-change="setImageUrl"
                         @event-address-change="setLocationAddress"
                         @event-name-change="setLocationName"
                         @event-openingHours-change="setOpeningHours"/>
        </div>


      </div>
      <div class="row  justify-content-center">
        <div class="col col-2">
          <button v-if="!isEdit" @click="saveLocation">Lisa asukoht</button>
          <button v-else @click="updateLocation">Muuda asukoht</button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import DistrictDropDown from "@/components/location/DistrictDropDown.vue";
import LocationInput from "@/views/LocationInput.vue";
import alertSuccess from "@/components/alert/AlertSuccess.vue";
import RoleService from "@/services/RoleService";
import navigation from "@/navigation/Navigation";
import {useRoute} from "vue-router";
import LocationService from "@/services/LocationService";
import DistrictService from "@/services/DistrictService";
import AlertError from "@/components/alert/AlertError.vue";

export default {
  name: "AddNewLocation",
  components: {AlertError, LocationInput, DistrictDropDown, alertSuccess},
  data() {
    return {
      selectedDistrictId: 0,
      isEdit: false,
      newLocation: {
        districtId: null,
        locationName: '',
        locationAddress: '',
        openingHours: '',
        imageUrl: ''
      },
      districts: [{
        districtId: 0,
        districtName: '',
      }],
      errorResponse: {
        errorMessage: '',
        errorCode: 0
      }
    }
  },
  methods: {
    handlePostLocationResponse() {
      this.setTimedOutSuccessMessage("Asukoht edukalt lisatud")

    },
    updateLocation() {
      LocationService.sendUpdateLocationRequest(this.selectedLocationId, this.newLocation)
          .then(() => this.setTimedOutSuccessMessage("Asukoht edukalt muudetud"))
          .catch(error => {
            console.error('Update failed:', error);
          });
    },
    saveLocation() {
      LocationService.sendPostLocationRequest(this.newLocation).then(()=>this.handlePostLocationResponse())
          .catch(error => {
            console.error('Failed to save:', error);
          })
    },
    handleSendGetLocationResponse(response) {
      this.newLocation = response.data
    },
    handleSendGetLocationErrorResponse(error) {
      this.errorResponse = error.response.data
    },
    handleGetDistrictResponse(response) {
      this.districts = response.data
    },
    setImageUrl(imageUrl) {
      this.newLocation.imageUrl = imageUrl
    },
    setLocationAddress(address) {
      this.newLocation.locationAddress = address;
    },
    setLocationName(name) {
      this.newLocation.locationName = name;
    },
    setOpeningHours(hours) {
      this.newLocation.openingHours = hours;
    },
    setNewLocationDistrictId(id) {
      this.newLocation.districtId = id
      this.selectedDistrictId = id
    }
  },
  beforeMount() {
    if (!RoleService.isLoggedIn()) {
      navigation.navigateToErrorView();
    }

    RoleService.isCoach();

    this.isEdit = useRoute().query.locationId !== undefined;

    if (this.isEdit) {
      this.selectedLocationId = useRoute().query.locationId;
      LocationService.sendGetLocationRequest(this.selectedLocationId)
          .then(this.handleSendGetLocationResponse)
          .catch(this.handleSendGetLocationErrorResponse);
    }

    DistrictService.sendGetDistrictRequest()
        .then(response => this.handleGetDistrictResponse(response))
        .catch(() => navigation.navigateToErrorView());
  }
}

</script>

