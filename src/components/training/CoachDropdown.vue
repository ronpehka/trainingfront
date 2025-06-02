<template>
  <select
      class="form-select"
      :value="selectedCoachId"
      @change="handleCoachDropdownChange"
  >
    <option value="0">Kõik treenerid</option>
    <option
        v-for="coach in coachInfos"
        :key="coach.coachUserId"
        :value="coach.coachUserId"
    >
      {{ coach.coachFullName }}
    </option>
  </select>
</template>

<script>
export default {
  name: "CoachDropdown",
  props: {
    coachInfos: {
      type: Array,
      required: true,
    },
    selectedCoachId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleCoachDropdownChange(event) {
      this.$emit("event-new-coach-selected", Number(event.target.value));
    },
  },
};
</script>