<template>
  <div>
    <h1>Lisa uus trenn</h1>
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
    <button type="button" class="btn btn-outline-secondary">Lisa asukoht</button>

  </div>

</template>

<script>
import NewTraining from "@/components/traininginfo/NewTraining.vue";
import SportService from "@/services/SportService";
import WeekdayService from "@/services/WeekdayService";
import RoleService from "@/services/RoleService";
import Navigation from "@/navigation/navigation";

export default {
  name: 'AddNewTrainingView',
  components: {NewTraining},

  data() {
    return {
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

      }
    }
  },
  methods: {
    getAllSports() {
      SportService.sendGetSportsRequest()
          .then(response => this.handleGetSportsResponse(response)).catch(()=> Navigation.navigateToErrorView());
    },
    getAllWeekDays() {
      WeekdayService.sendGetWeekdayRequest()
          .then(response => this.handleGetWeekdaysRequest(response))
          .catch(()=> Navigation.navigateToErrorView())
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