<template>
  <div>
    <div  class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Treeningu nimi</span>
      <input type="text" class="form-control" placeholder="Treeningu nimi">
    </div>
    <div v-for="sport in sports" :key="sport.sportId"
         class="form-check d-flex align-items-center">
      <input type="radio" class="form-check-input me-2" name="sport" :value="sport.sportId" @change="handleSportIdChange"
      >
      <label class="form-check-label">
        {{ sport.sportName }}
      </label>
    </div>


    <div v-for="weekDay in addNewTraining.trainingDays" :key="weekDay.weekDayId"
         class="form-check d-flex align-items-center">
      <input type="checkbox" class="form-check-input me-2"
             :checked="weekDay.isAvailable"
             @change="$emit('event-update-weekday', {
               weekdayId: weekDay.weekdayId,
               isAvailable: $event.target.checked
             })"
      >
      <label class="form-check-label">
        {{ weekDay.weekdayName }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewTraining",
  props: {
    selectedSportId: {
      type:Number,
      default:0
    },
    addNewTraining: Object,
    sports: {
      Array
    },
  },
  methods: {
    handleSportIdChange(event){
      this.$emit('event-new-sport-selected', Number(event.target.value))
    }
  }
}
</script>

