<template>
  <div>

    <div>
      NImi: {{training.trainingName}},
      Sihtgrupp: {{training.trainingGender}},
      Sport: {{training.sportId}},
      Algus kuupäev: {{training.startDate}},
      Lõpp: {{training.endDate}},
      Treening ajad: {{ (training.trainingDays || []).map(day => day.weekdayName).join(', ') }}
      {{ training.startTime }} - {{ training.endTime }}
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />

    </div>


  <h4>Asukoha valimine</h4>
  <LocationTable :locations="locations"/>
    <button>Lisa uus asukoht</button>
  </div>

</template>


<script>
import LocationTable from "@/components/location/LocationTable.vue";
import LocationService from "@/services/LocationService";
import ErrorCodes from "@/errors/ErrorCodes";
import TrainingInfoService from "@/services/training/TrainingInfoService";
import {useRoute} from "vue-router";

export default {
  name: 'TrainingLocation',
  components: {LocationTable},
  data(){
    return{
      coachUserId: Number(sessionStorage.getItem('userId')),
      trainingId:0,
      sportName: '',
      training: {},

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
  },methods:{

    handleGetLocationsResponse(response){
      this.locations = response.data
    },
    handleGetLocationsErrorResponse(error){
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_FOREIGN_KEY) {
        this.setTimedOutErrorMessage(this.errorResponse.message)
      }
    },
    setTimedOutErrorMessage(message) {
      this.errorMessage = message
      setTimeout(this.resetMessage, 4000)
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
        .catch(error=>this.handleGetLocationsErrorResponse(error))
  }
}
</script>