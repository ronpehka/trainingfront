<template>

  <select :value="selectedSportId" @change="handleSportDropdownChange" class="form-select"
  aria-label="Default select example">
    <option selected value="0">Kõik spordialad</option>
    <option v-for="sport in sports" :key="sport.selectedSportId" :value="sport.selectedSportId">{{sport.sportName}}</option>
  </select>

</template>

<script>
export default {
  name: "SportsDropdown",
  props: {
    sports: {
      type: Array
    },
    selectedSportId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSportDropdownChange(event) {
      this.$emit('event-new-sport-selected', Number(event.target.value))
    },
  }
}
</script>

