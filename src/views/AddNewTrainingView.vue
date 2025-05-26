<template>
<div>
  <h1>Lisa uus trenn</h1>
  <NewTraining :add-new-training="addNewTraining" :sports="sports" :selected-sport-id="selectedSportId"
               @event-new-sport-selected="setSportId" @event-update-weekday="setWeekdays"
  />

</div>

</template>

<script>
import NewTraining from "@/components/traininginfo/NewTraining.vue";
import SportService from "@/services/SportService";
import WeekdayService from "@/services/WeekdayService";

export default {
  name: 'AddNewTrainingView',
  components: {NewTraining},

  data() {
    return {
      selectedSportId: 0,
      sports: [{
        sportId: 0,
        sportName:'',
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
   getAllSports(){
     SportService.sendGetSportsRequest() .then(response => {
       this.sports = response.data
     }).catch(error => {
           this.someDataBlockErrorResponseObject = error.response.data
         })
   },
    getAllWeekDays() {
     WeekdayService.sendGetWeekdayRequest()
          .then(response => {
            this.addNewTraining.trainingDays = response.data
          })
          .catch(error => {
            this.someDataBlockErrorResponseObject = error.response.data
          })
    },
    setSportId(selectedSportId){
     this.selectedSportId = selectedSportId
      this.addNewTraining.sportId = selectedSportId
    },
    setWeekdays(weekdayInfo){
     let weekDayId = weekdayInfo.weekdayId
      let isAvailable = weekdayInfo.available
      for(let i = 0; i < this.addNewTraining.trainingDays.length; i++){
        if (this.addNewTraining.trainingDays[i].weekdayId === weekDayId){
          this.addNewTraining.trainingDays[i].available = isAvailable
          break
        }
      }

    }
  },
  beforeMount() {
    this.getAllSports()
    this.getAllWeekDays()
  }
}

</script>