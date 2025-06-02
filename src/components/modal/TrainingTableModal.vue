<template>
  <div class="modal-backdrop" v-if="visible">
    <div class="modal-content-wrapper">
      <div class="modal-content-box">
        <div class="modal-header">
          <h5>Treeningud kuupäeval: {{ selectedDate }}</h5>
          <button class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div v-for="training in selectedTrainings" :key="training.trainingId" class="mb-3 border-bottom pb-2">
            <p><strong>Treening:</strong> {{ training.trainingName }}</p>
            <p><strong>Asukoht:</strong> {{ training.locationName }}</p>
            <p><strong>Kellaaeg:</strong> {{ training.startTime }} - {{ training.endTime }}</p>
          </div>
          <a href="/trainings">➡ Vaata treeningtabelit</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "TrainingTableModal",
  props: {
    selectedDate: String,
    selectedTrainings: Array,
    visible: Boolean,
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content-wrapper {
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
