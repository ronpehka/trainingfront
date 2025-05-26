<template>
  <div>
    <div class="container mt-3">
      <label class="form-label">Vali treeningu algusaeg</label>
      <input
          type="time"
          class="form-control"
          :value="addNewTraining.startTime"
          @change="$emit('event-new-start-time', $event.target.value)"
      />
    </div>
    <div class="container mt-3">
      <label class="form-label">Vali treeningu lõpuaeg</label>
      <input
          type="time"
          class="form-control"
          :value="addNewTraining.endTime"
          @change="$emit('event-new-end-time', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    addNewTraining: {
      type: Object
    }
  }
}
</script>
