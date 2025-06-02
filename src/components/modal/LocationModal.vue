<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <AlertSuccess :success-message="successMessage"/>

    <template #title>
      <h3 v-if="!isEdit" class="text-center">Uue asukoha lisamine</h3>
      <h3 v-else class="text-center">Asukoha muutmine</h3>

    </template>

    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div class="col col-3">
              <DistrictDropDown
                  :districts="districts"
                  :selected-district-id="selectedDistrictId"
                  @new-district-selected="setNewLocationDistrictId"
                  :isEdit="isEdit"
              />
            </div>

            <div class="col col-7">
              <LocationInput :new-location="newLocation"
                             :isEdit="isEdit"
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
      <div class="row  justify-content-center">
        <div class="col col-2">
          <button v-if="!isEdit" @click="saveLocation">Lisa asukoht</button>
          <button v-else @click="updateLocation">Muuda asukoht</button>
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
import RoleService from "@/services/RoleService";
import navigation from "@/navigation/Navigation";
import DistrictService from "@/services/DistrictService";
import DistrictDropDown from "@/components/location/DistrictDropDown.vue";
import LocationInput from "@/views/LocationInput.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import ErrorCodes from "@/errors/ErrorCodes";

export default {
  name: 'LocationModal',
  components: {LocationInput, DistrictDropDown, LocationTable, CoachesTable, Modal, AlertSuccess},
  props: {
    modalIsOpen: Boolean,
    isEdit: Boolean,
    selectedLocationId: Number,
    selectedLocation:{
      type:Object,
      default: ()=>({})
    }
  },
    watch: {
      isEdit(newVal) {
        if (newVal && this.selectedLocation) {
          this.newLocation = { ...this.selectedLocation }
          this.selectedDistrictId = this.selectedLocation.districtId
        }
      },
      selectedLocation(newVal) {
        if (this.isEdit && newVal) {
          this.newLocation = { ...newVal }
          this.selectedDistrictId = newVal.districtId
        }
      }
    },
  data() {
    return {
      selectedDistrictId: 0,
      successMessage: '',
      errorMessage: '',
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
      this.$emit('event-close-modal');
    },
    updateLocation() {
      LocationService.sendLocationPutRequest(this.selectedLocationId, this.newLocation)
          .then(() => {
            this.$emit('event-update-location')
            this.$emit('event-close-isEdit');
            this.$emit('event-close-modal');

          })
          .catch(error => {
            console.error('Update failed:', error);
          });
    },
    saveLocation() {
      LocationService.sendPostLocationRequest(this.newLocation).then(() => this.handlePostLocationResponse())
          .catch(error => {
            console.error('Failed to save:', error);
          })
    },
    handleSendGetLocationResponse(response) {
      this.newLocation = response.data

    },

    handleSendGetLocationErrorResponse(error) {
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_FOREIGN_KEY) {
        this.setTimedOutErrorMessage(this.errorResponse.message)
      }

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
    },
    setTimedOutSuccessMessage(message) {
      this.successMessage = message
      setTimeout(this.resetMessages, 4000)
    },
    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    }
  },
  beforeMount() {
    if (!RoleService.isLoggedIn()) {
      navigation.navigateToErrorView();
    }

    RoleService.isCoach();

    if (this.isEdit) {
      LocationService.sendGetLocationRequest(this.selectedLocationId)
          .then(response => this.handleSendGetLocationResponse(response))
          .catch(error =>this.handleSendGetLocationErrorResponse(error));
    }

    DistrictService.sendGetDistrictRequest()
        .then(response => this.handleGetDistrictResponse(response))
        .catch(() => navigation.navigateToErrorView());
  }
}

</script>