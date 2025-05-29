<template>
  <div class="d-flex justify-content-center">
    <div class="row g-3 align-items-center">
      <div
          class="col-auto form-check d-flex align-items-center"
          v-for="sport in sports"
          :key="sport.sportId"
      >
        <input
            type="radio"
            class="form-check-input me-2"
            name="sport"
            :value="sport.sportId"
            v-model="localSelectedSportId"
        />
        <label class="form-check-label">
          {{ sport.sportName }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SportInput',
  props: {
    selectedSportId: {
      type: Number,
      default: 0
    },
    sports: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localSelectedSportId: this.selectedSportId
    };
  },
  watch: {
    selectedSportId(newVal) {
      this.localSelectedSportId = newVal;
    },
    localSelectedSportId(newVal) {
      this.$emit('event-new-sport-selected', newVal);
    }
  }
};
</script>
