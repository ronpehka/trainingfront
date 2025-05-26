<template>
  <div class="d-flex justify-content-center">
    <div class="row g-3 align-items-center">
      <div
          v-for="weekDay in addNewTraining.trainingDays"
          :key="weekDay.weekdayId"
          class="col-auto form-check d-flex align-items-center"
      >
        <label class="form-check-label d-flex align-items-center">
          {{ weekDay.weekdayName }}
          <input
              type="checkbox"
              class="form-check-input ms-2"
              :checked="weekDay.available"
              @change="$emit('event-update-weekday', {
              weekdayId: weekDay.weekdayId,
              available: $event.target.checked
            })"
          />
        </label>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'WeekDayInput',
  props: {
    addNewTraining: {
      type: Object
    }
  }
}
</script>
