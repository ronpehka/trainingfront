<template>
  <div>
    <h1>Lisa uus trenn</h1>
    <AlertError :error-message="errorMessage"/>
    <AlertSuccess :success-message="successMessage"/>
    <NewTraining :add-new-training="addNewTraining" :sports="sports" :selected-sport-id="selectedSportId"
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
    <button @click="saveTraining" type="button" class="btn btn-outline-secondary">Salvesta trenn</button>

  </div>

</template>

<script>
import NewTraining from "@/components/traininginfo/NewTraining.vue";
import SportService from "@/services/SportService";
import WeekdayService from "@/services/WeekdayService";
import RoleService from "@/services/RoleService";
import Navigation from "@/navigation/navigation";
import AlertError from "@/components/alert/AlertError.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import TrainingService from "@/services/TrainingService";
import ErrorCodes from "@/errors/ErrorCodes";

export default {
  name: 'AddNewTrainingView',
  components: {AlertError, NewTraining, AlertSuccess},

  data() {
    return {
      modalIsOpen: false,
      errorMessage: '',
      successMessage: '',
      selectedSportId: 0,
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
      TrainingService.sendPostTrainingRequest(this.addNewTraining).then(() =>
          this.handlePostTrainingRequest()).catch(error =>this.handlePostTrainingError(error))
    },
    handlePostTrainingError(error) {
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_TRAINING_TIME) {
        this.setTimedOutErrorMessage(this.errorResponse.message)
      }
    },
    validateUserInput(){
        if (this.addNewTraining.trainingName.length < 4) {
          this.setTimedOutErrorMessage('Sisesta treeningule nimi, vähemalt 4 tähemärki')
        } else if (this.addNewTraining.trainingDescription.length < 8) {
          this.setTimedOutErrorMessage('Sisesta treeningule kirjeldus palun, vähemalt 8 tähemärki')
        } else if (!this.addNewTraining.trainingGender) {
          this.setTimedOutErrorMessage('Palun vali sihtgrupp')
        } else if (new Date(this.addNewTraining.startDate) > new Date(this.addNewTraining.endDate)) {
          this.setTimedOutErrorMessage('Alguskuupäev ei saa olla hiljem kui lõppkuupäev')
        } else if () {
          this.setTimedOutErrorMessage('Sugu on valimata')
        } else if () {
          this.setTimedOutErrorMessage('Paroolid ei kattu')
        }
    },
    handlePostTrainingRequest() {
      this.setTimedOutSuccessMessage("Treening edukalt lisatud")
      this.resetFields();
    },
    setTimedOutSuccessMessage(message){
      this.successMessage = message
      setTimeout(this.resetMessage,4000)
    },
    setTimedOutErrorMessage(message){
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
    resetMessage(){
      this.successMessage=''
      this.errorMessage=''
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