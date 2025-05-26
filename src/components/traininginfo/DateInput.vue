<template>
  <div class="container mt-3">
    <label class="form-label">Vali treeningute alguskuupäev</label>
    <input
        type="date"
        class="form-control"
        :value="addNewTraining.startDate"
        @change="$emit('event-new-start-date', $event.target.value)"
    />

    <label class="form-label mt-3">Vali treeningute lõpukuupäev</label>
    <input
        type="date"
        class="form-control"
        :value="addNewTraining.endDate"
        @change="$emit('event-new-end-date', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'DateInput',
  props: {
    addNewTraining: Object,
  }
}
</script>
