<template>
  <div class="form-check mb-1"
       v-for="sport in sports"
       :key="sport.sportId">
    <input
        class="form-check-input me-2"
        type="checkbox"
        :checked="sport.available"
        @change="$emit('event-update-checked-sport', {
        sportId: sport.sportId,
        available: $event.target.checked
      })"
    >
    <label class="form-check-label">
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
    }
  }
}
</script>
