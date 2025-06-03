<template>
  <div>
    <AlertError :error-message="errorMessage"/>
    <AlertSuccess :success-message="successMessage"/>
    <LocationModal :modal-is-open="modalIsOpen"
                   :is-edit="isEdit"
                   :selected-location-id="updateLocationId"
                   :selected-location="selectedLocation"
                   @event-close-modal="closeLocationModal"
                   @event-update-location="updateLocation"
                   @event-close-isEdit="setIsEdit"
    />

    <div>
      NImi: {{ training.trainingName }},
      Sihtgrupp: {{ training.trainingGender }},
      Algus kuupäev: {{ training.startDate }},
      Lõpp: {{ training.endDate }},
      Treening ajad: {{ (training.trainingDays || []).map(day => day.weekdayName).join(', ') }}
      {{ training.startTime }} - {{ training.endTime }}
      <font-awesome-icon class="pointer-event" icon="fa-regular fa-pen-to-square" @click="editTrainingInformation"/>


    </div>


    <h4>Asukoha valimine</h4>
    <LocationTable :locations="locations"
                   @event-location-selected="saveTrainingLocation"
                   @event-edit-location-selected="startEditTrainingLocationProcess"
                   @event-delete-location="removeLocation"
    />
    <button type="button" class="btn btn-outline-light" @click="setLocationModalOpen">Lisa uus asukoht</button>
  </div>

</template>


<script>
import LocationTable from "@/components/location/LocationTable.vue";
import LocationService from "@/services/LocationService";
import ErrorCodes from "@/errors/ErrorCodes";
import TrainingInfoService from "@/services/training/TrainingInfoService";
import {useRoute} from "vue-router";
import TrainingLocationService from "@/services/training/TrainingLocationService";
import AlertError from "@/components/alert/AlertError.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import Navigation from "@/navigation/Navigation";
import LocationModal from "@/components/modal/LocationModal.vue";
import LoginService from "@/services/LoginService";
import RoleService from "@/services/RoleService";
import navigation from "@/navigation/Navigation";

export default {
  name: 'TrainingLocation',
  components: {LocationModal, AlertError, LocationTable, AlertSuccess},
  data() {
    return {
      coachUserId: Number(sessionStorage.getItem('userId')),
      selectedLocationId: 0,
      updateLocationId: 0,
      isEdit: false,
      errorMessage: '',
      successMessage: '',
      trainingId: 0,
      sportName: '',
      training: {},
      modalIsOpen: false,

      locations: [
        {
          locationId: 0,
          locationName: '',
          locationAddress: '',
          imageUrl: '',
          districtId: 0,
          districtName: ''
        }
      ],
      selectedLocation: {
        locationName: '',
        locationAddress: '',
        imageUrl: '',
        districtId: 0,
        districtName: ''
      },
      errorResponse: {
        errorMessage: '',
        errorResponse: 0,
      }
    };
  },

  methods: {

    removeLocation(locationId){
      LocationService.sendRemoveLocationRequest(locationId).then(()=>{
        LocationService.sendGetLocationsRequest()
            .then(response => this.handleGetLocationsResponse(response))
            .catch(error => this.handleGetLocationsErrorResponse(error))
      }).catch(()=>Navigation.navigateToErrorView())
    },
    updateLocation(){
      this.setTimedOutSuccessMessage("Asukoht edukalt muudetud")
      LocationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(error => this.handleGetLocationsErrorResponse(error))
    },
    startEditTrainingLocationProcess(locationId) {
      this.updateLocationId = locationId
      LocationService.sendGetLocationRequest(locationId)
          .then(response =>{ this.selectedLocation = response.data
            this.isEdit = true
            this.setLocationModalOpen()
    })
          .catch(error => {
        this.errorResponse = error.response.data
      })
    },
    setIsEdit() {
      this.isEdit = false
    },
    setLocationModalOpen() {
      this.modalIsOpen = true
    },
    closeLocationModal() {
      this.modalIsOpen = false
    },
    editTrainingInformation() {
      Navigation.navigateToEditView(this.trainingId)
    },
    saveTrainingLocation(locationId) {
      this.selectedLocationId = locationId
      TrainingLocationService.sendPostTrainingLocationRequest(this.trainingId, this.selectedLocationId)
          .then(() => this.handlePostTrainingLocationRequest()).catch(error => this.handlePostTrainingLocationErrorResponse(error))
    },
    handlePostTrainingLocationErrorResponse(error) {
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_FOREIGN_KEY) {
        this.setTimedOutErrorMessage(this.errorResponse.message)
      }
    },
    handlePostTrainingLocationRequest() {
      this.setTimedOutSuccessMessage("Treeningu asukoht edukalt lisatud")
      Navigation.navigateToTrainingInfoView()
    },
    handleGetLocationsResponse(response) {
      this.locations = response.data
    },
    handleGetLocationsErrorResponse(error) {
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_FOREIGN_KEY) {
        this.setTimedOutErrorMessage(this.errorResponse.message)
      }
    },
    setTimedOutSuccessMessage(message) {
      this.successMessage = message
      setTimeout(this.resetMessage, 4000)
    },
    setTimedOutErrorMessage(message) {
      this.errorMessage = message
      setTimeout(this.resetMessage, 4000)
    },
    resetMessage() {
      this.successMessage = ''
      this.errorMessage = ''
    },
  },
  beforeMount() {
    if (!RoleService.isLoggedIn()) {
      navigation.navigateToErrorView()
    }
    RoleService.isCoach()

    this.trainingId = useRoute().query.trainingId
    TrainingInfoService.sendGetTrainingRequest(this.trainingId)
        .then(response => {
          this.training = response.data
        }).catch(error => {
      this.errorResponse = error.response.data
    })

    LocationService.sendGetLocationsRequest()
        .then(response => this.handleGetLocationsResponse(response))
        .catch(error => this.handleGetLocationsErrorResponse(error))
  }
}
</script>