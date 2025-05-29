<template>
  <div>
    <h1 v-if="!modalIsOpen">Lisa uus trenn</h1>
    <LocationModal :modal-is-open="modalIsOpen"
                   @event-location-selected="setSelectedLocationId"
                   @event-close-modal="setModalIsClosed"
    />
    <AlertError :error-message="errorMessage"/>
    <AlertSuccess :success-message="successMessage"/>
    <NewTraining v-if="!modalIsOpen" :add-new-training="addNewTraining" :sports="sports" :selected-sport-id="selectedSportId"
                 @event-new-sport-selected="setSportId"
                 @event-update-weekday="setWeekdays"
                 @event-update-gender="setGender"
                 @event-new-start-date="setStartDate"
                 @event-new-end-date="setEndDate"
                 @event-new-training-name="setTrainingName"
                 @event-new-training-description="setTrainingDescription"
                 @event-new-start-time="setStartTime"
                 @event-new-end-time="setEndTime"
                 @event-new-max-limit="setMaxLimit"
    />
    <button  @click="saveTraining" type="button" class="btn btn-outline-secondary">Salvesta trenn</button>

  </div>

</template>

<script>
import NewTraining from "@/components/traininginfo/NewTraining.vue";
import SportService from "@/services/SportService";
import WeekdayService from "@/services/WeekdayService";
import RoleService from "@/services/RoleService";
import TrainingLocationService from "@/services/training/TrainingLocationService";
import Navigation from "@/navigation/navigation";
import AlertError from "@/components/alert/AlertError.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import TrainingService from "@/services/training/TrainingService";
import ErrorCodes from "@/errors/ErrorCodes";
import TimeConverter from "@/util/TimeConverter";
import LocationModal from "@/components/modal/LocationModal.vue";


export default {
  name: 'AddNewTrainingView',
  components: {LocationModal, AlertError, NewTraining, AlertSuccess},

  data() {
    return {
      modalIsOpen: false,
      errorMessage: '',
      successMessage: '',
      selectedSportId: 0,
      selectedLocationId: 0,
      selectedTrainingId:0,
      sports: [{
        sportId: 0,
        sportName: '',
      }],
      addNewTraining: {
        coachUserId: Number(sessionStorage.getItem('userId')),
        sportId: 0,
        trainingName: '',
        trainingDescription: '',
        trainingGender: '',
        startDate: '2025-05-26',
        endDate: '2025-05-26',
        trainingDays: [
          {
            weekdayId: 0,
            weekdayName: '',
            weekdayNumber: 0,
            available: false
          }
        ],
        startTime: '',
        endTime: '',
        maxLimit: 0
      },
      errorResponse: {
        errorMessage: '',
        errorCode: 0,
      }
    }
  },
  methods: {
    saveTraining() {
      if (this.validateUserInput()) {
        TrainingService.sendPostTrainingRequest(this.addNewTraining)
            .then(response => {
              this.handlePostTrainingRequest(response)
            })
            .catch(error => this.handlePostTrainingError(error))
      }
    },

    handlePostTrainingError(error) {
      if (error.response && error.response.data) {
        this.errorResponse = error.response.data;
        if (
            error.response.status === 403 &&
            this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_TRAINING_TIME
        ) {
          this.setTimedOutErrorMessage(this.errorResponse.message);
        } else {
          this.setTimedOutErrorMessage("Tekkis tundmatu viga. Palun proovi hiljem uuesti.");
        }
      } else {
        this.setTimedOutErrorMessage("Serveri viga või võrgu probleem. Palun proovi hiljem uuesti.");
        console.error("Unexpected error:", error);
      }
    },

    saveTrainingLocation() {
    TrainingLocationService.sendPostTrainingLocationRequest(this.selectedTrainingId,this.selectedLocationId).then(()=>
        this.handlePostTrainingLocationResponse()
      ).catch(error =>
        this.handlePostTrainingLocationErrorResponse(error))
    },

    handlePostTrainingLocationErrorResponse(error){
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_FOREIGN_KEY) {
        this.setTimedOutErrorMessage(this.errorResponse.message)
      }
    },

    handlePostTrainingLocationResponse(){
      this.setTimedOutSuccessMessage("Treening asukoht on edukalt lisatud")
      Navigation.navigateToTrainingInfoView()
    },

    setSelectedLocationId(locationId){
      this.selectedLocationId = locationId
    },


    validateUserInput() {
      if (this.addNewTraining.trainingName.length < 4) {
        this.setTimedOutErrorMessage('Sisesta treeningule nimi, vähemalt 4 tähemärki')
      } else if (this.addNewTraining.trainingDescription.length < 8) {
        this.setTimedOutErrorMessage('Sisesta treeningule kirjeldus palun, vähemalt 8 tähemärki')
      } else if (!this.addNewTraining.sportId) {
        this.setTimedOutErrorMessage("Palun vali spordiala")
      } else if (!this.addNewTraining.trainingGender) {
        this.setTimedOutErrorMessage('Palun vali sihtgrupp')
      } else if (new Date(this.addNewTraining.startDate) > new Date(this.addNewTraining.endDate) ||
          new Date(this.addNewTraining.startDate).toDateString() === new Date(this.addNewTraining.endDate).toDateString()) {
        this.setTimedOutErrorMessage('Alguskuupäev ei saa olla hiljem kui lõppkuupäev ja trennid ei saa kesta ainult ühe päeva')
      } else if (!this.addNewTraining.trainingDays.some(day => day.available)) {
        this.setTimedOutErrorMessage('Vali nädalapäev/Nädalapäevad')
      } else if (!TimeConverter.validateTrainingTimes(this.addNewTraining.startTime, this.addNewTraining.endTime)) {
        this.setTimedOutErrorMessage('Tuleb lisada korrektne trenni algus ja lõpuaeg')
      } else if (this.addNewTraining.maxLimit < 1) {
        this.setTimedOutErrorMessage('Trenni peab saama registreerida vähemalt 1 õpilane')
      }else{
        return true
      }

    },
    handlePostTrainingRequest(response) {
      this.selectedTrainingId = response.data
      this.setTimedOutSuccessMessage("Treening edukalt lisatud")
      this.resetFields()
      Navigation.navigateToTrainingLocationView(this.selectedTrainingId)
    },
    setModalIsOpen(){
      this.modalIsOpen = true
    },
    setModalIsClosed(){
      this.modalIsOpen = false
    },
    setTimedOutSuccessMessage(message) {
      this.successMessage = message
      setTimeout(this.resetMessage, 4000)
    },
    setTimedOutErrorMessage(message) {
      this.errorMessage = message
      setTimeout(this.resetMessage, 4000)
    },

    resetFields() {
      this.addNewTraining.sportId = 0
      this.addNewTraining.endDate = ''
      this.addNewTraining.trainingName = ''
      this.addNewTraining.startDate = ''
      this.addNewTraining.trainingGender = ''
      this.addNewTraining.maxLimit = 0
      this.addNewTraining.trainingDescription = ''
      this.addNewTraining.trainingDays.available = false
      this.addNewTraining.startTime = ''
      this.addNewTraining.endTime = ''
    },
    resetMessage() {
      this.successMessage = ''
      this.errorMessage = ''
    },
    getAllSports() {
      SportService.sendGetSportsRequest()
          .then(response => this.handleGetSportsResponse(response)).catch(() => Navigation.navigateToErrorView());
    },
    getAllWeekDays() {
      WeekdayService.sendGetWeekdayRequest()
          .then(response => this.handleGetWeekdaysRequest(response))
          .catch(() => Navigation.navigateToErrorView())
    },
    handleGetWeekdaysRequest(response) {
      this.addNewTraining.trainingDays = response.data
    },
    handleGetSportsResponse(response) {
      this.sports = response.data
    },
    setSportId(selectedSportId) {
      this.selectedSportId = selectedSportId
      this.addNewTraining.sportId = selectedSportId
    },
    setWeekdays(weekdayInfo) {
      let weekDayId = weekdayInfo.weekdayId
      let isAvailable = weekdayInfo.available
      for (let i = 0; i < this.addNewTraining.trainingDays.length; i++) {
        if (this.addNewTraining.trainingDays[i].weekdayId === weekDayId) {
          this.addNewTraining.trainingDays[i].available = isAvailable
          break
        }
      }
    },
    setGender(gender) {
      this.addNewTraining.trainingGender = gender
    },
    setEndDate(date) {
      this.addNewTraining.endDate = date
    },
    setStartDate(date) {
      this.addNewTraining.startDate = date
    },
    setTrainingName(name) {
      this.addNewTraining.trainingName = name
    },
    setTrainingDescription(description) {
      this.addNewTraining.trainingDescription = description
    },
    setStartTime(time) {
      this.addNewTraining.startTime = time
    },
    setEndTime(time) {
      this.addNewTraining.endTime = time
    },
    setMaxLimit(count) {
      this.addNewTraining.maxLimit = count
    }

  },
  beforeMount() {
    this.getAllSports()
    this.getAllWeekDays()
    RoleService.isCoach()
  }
}

</script>