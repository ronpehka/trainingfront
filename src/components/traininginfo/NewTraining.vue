<template>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text">Treeningu nimi</span>
      <input type="text" class="form-control" placeholder="Treeningu nimi"
             :value="addNewTraining.trainingName"
             @input="$emit('event-new-training-name', $event.target.value)"
      />
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Treeningu Kirjeldus</span>
      <input type="text" class="form-control" placeholder="Treeningu kirjeldus"
             :value="addNewTraining.trainingDescription"
             @input="$emit('event-new-training-description', $event.target.value)"/>
    </div>

    <h5>Vali spordiala</h5>
    <SportInput
        :sports="sports"
        :selected-sport-id="selectedSportId"
        @event-new-sport-selected="handleSportIdChange"
    />
    <h5 class="mt-2">Vali sugu</h5>
    <GenderInput
        :gender="addNewTraining.trainingGender"
        @event-update-gender="$emit('event-update-gender', $event)"
    />

    <DateInput :addNewTraining="addNewTraining"
               @event-new-start-date="$emit('event-new-start-date', $event)"
               @event-new-end-date="$emit('event-new-end-date', $event)"
    />
    <h5 class="mt-2">Vali päevad</h5>
    <WeekDayInput

        :add-new-training="addNewTraining"
        @event-update-weekday="$emit('event-update-weekday', $event)"
    />
    <TimeInput :add-new-training="addNewTraining"
               @event-new-start-time="$emit('event-new-start-time', $event)"
               @event-new-end-time="$emit('event-new-end-time', $event)"/>

    <h6>Maksimaalne osalejate arv</h6>
    <div class="container mt-3">
      <input type="number" class="form-control" placeholder="Max õpilaste arv"
             :value="addNewTraining.maxLimit"
             @input="$emit('event-new-max-limit', Number($event.target.value))"
      />
    </div>

  </div>
</template>

<script>
import GenderInput from "@/components/registration/GenderInput.vue";
import WeekDayInput from "@/components/traininginfo/WeekDayInput.vue";
import SportInput from "@/components/traininginfo/SportInput.vue";
import DateInput from "@/components/traininginfo/DateInput.vue";
import TimeInput from "@/components/traininginfo/TimeInput.vue";

export default {
  name: "NewTraining",
  components: {TimeInput, DateInput, SportInput, WeekDayInput, GenderInput},
  props: {
    selectedSportId: {
      type: Number,
      default: 0
    },
    addNewTraining: {
      type: Object,
      required: true
    },
    sports: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSportIdChange(sportId) {
      this.$emit('event-new-sport-selected', sportId);
    }
  }
};
</script>
