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
            :checked="sport.sportId === selectedSportId"
            @change="handleSportIdChange"
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
      type: Array
    }
  },
  methods: {
    handleSportIdChange(event) {
      this.$emit('event-new-sport-selected', Number(event.target.value))
    }
  }
}
</script>
