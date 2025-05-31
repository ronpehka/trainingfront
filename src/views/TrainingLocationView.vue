<template>
  <div>
    <AlertError :error-message="errorMessage"/>
    <AlertSuccess :success-message="successMessage"/>
    <LocationModal :modalIsOpen="modalIsOpen"/>

    <div>
      NImi: {{ training.trainingName }},
      Sihtgrupp: {{ training.trainingGender }},
      Sport: {{ training.sportId }},
      Algus kuupäev: {{ training.startDate }},
      Lõpp: {{ training.endDate }},
      Treening ajad: {{ (training.trainingDays || []).map(day => day.weekdayName).join(', ') }}
      {{ training.startTime }} - {{ training.endTime }}
      <font-awesome-icon icon="fa-regular fa-pen-to-square" @click="editTrainingInformation"/>

    </div>


    <h4>Asukoha valimine</h4>
    <LocationTable :locations="locations"
                   @event-location-selected="saveTrainingLocation"/>
    <button @click="navigation.navigateToAddNewLocationView()">Lisa uus asukoht</button>
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
import router from "@/router";
import navigation from "@/navigation/Navigation";
import LocationModal from "@/components/modal/LocationModal.vue";

export default {
  name: 'TrainingLocation',
  computed: {
    navigation() {
      return navigation
    }
  },
  components: {LocationModal, AlertError, LocationTable, AlertSuccess},
  data() {
    return {
      coachUserId: Number(sessionStorage.getItem('userId')),
      selectedLocationId: 0,
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
      errorResponse: {
        errorMessage: '',
        errorResponse: 0,
      }
    };
  }, methods: {
    editTrainingInformation(){
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
    this.trainingId = useRoute().query.trainingId
    TrainingInfoService.sendGetTrainingRequest(this.trainingId)
        .then(response => {
          this.training = response.data
        }).catch(error => {
      this.someDataBlockErrorResponseObject = error.response.data
    })

    LocationService.sendGetLocationsRequest()
        .then(response => this.handleGetLocationsResponse(response))
        .catch(error => this.handleGetLocationsErrorResponse(error))
  }
}
</script>