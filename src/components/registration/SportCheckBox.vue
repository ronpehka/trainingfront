<template>
  <div class="form-check"
       v-for="sport in sports"
       :key="sport.sportId">
    <input
        class="form-check-input"
        type="checkbox"
        :id="'sport' + sport.sportId"
        :checked="sport.available"
        @change="$emit('event-update-checked-sports', {
        sportId: sport.sportId,
        available: $event.target.checked
      })"
    >
    <label class="form-check-label" :for="'sport-' + sport.sportId">
      {{ sport.sportName }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'SportCheckBox',
  props: {
    sports: {
      type: Array,
      required: true
    }
  }
}
</script>
