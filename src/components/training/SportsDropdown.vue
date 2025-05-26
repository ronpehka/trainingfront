<template>

  <select
      :value="selectedSportId"
      @change="handleSportDropdownChange"
      class="form-select"
      aria-label="Default select example"
  >
    <option value="0">Kõik spordialad</option>
    <option
        v-for="sportInfo in sportInfos"
        :key="sportInfo.sportId"
        :value="sportInfo.sportId"
    >
      {{ sportInfo.sportName }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SportsDropdown",
  props: {
    sportInfos: {
      type: Array,
      required: true
    },
    selectedSportId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSportDropdownChange(event) {
      this.$emit('event-new-sport-selected', Number(event.target.value))
    }
  }
};
</script>

