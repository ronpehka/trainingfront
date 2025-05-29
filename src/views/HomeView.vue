<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Vasak kaart -->
      <div class="col-md-6">
        <div class="card mb-3" style="max-width: 600px;">
          <img src="https://korvpall100.ee/bw_client_files/korvpall100/public/img/Image/ESMF201_96-C561_1.jpg" class="card-img-top" alt="trennipilt">
          <div class="card-body text-start">
            <h5 class="card-title">Meeskonnasport massidesse!</h5>
            <p class="card-text">Meie veebiplatvorm ühendab spordihuvilisi...</p>
            <p class="card-text"><small class="text-body-secondary">Viimati uuendatud mai 2025</small></p>
          </div>
        </div>
      </div>

      <!-- Kalendri pool -->
      <div class="col-md-6">
        <h4>Treeningplaan</h4>

        <div class="calendar-wrapper">
          <v-calendar
              :attributes="calendarAttributes"
              @dayclick="handleDayClick"
          />

          <div v-if="selectedTrainings.length" class="training-list">
            <h3>Treeningud kuupäeval {{ selectedDate }}</h3>
            <ul>
              <li v-for="t in selectedTrainings" :key="t.trainingId">
                Treening ID: {{ t.trainingId }}
              </li>
            </ul>
          </div>
        </div>

        <ul>
          <li>Kontakt: info@sportportaal.ee</li>
          <li>Treenerite kogemus: 10+ aastat</li>
          <li>Treeningute sagedus: 3x nädalas</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TrainingDateService from "@/services/TrainingDateService";

export default {
  data() {
    return {
      trainingDates: [],
      selectedDate: null,
      selectedTrainings: [],
    };
  },
  computed: {
    calendarAttributes() {
      return this.trainingDates.map((td) => ({
        key: td.trainingId,
        highlight: {
          backgroundColor: "#FF000020",
          border: "2px solid red",
        },
        dates: new Date(td.trainingDate),
      }));
    },
  },
  methods: {
    async loadTrainingDates() {
      try {
        const response = await TrainingDateService.sendGetAllTrainingDatesRequest();
        this.trainingDates = response.data;
      } catch (err) {
        console.error("Treeningkuupäevade laadimine ebaõnnestus", err);
      }
    },
    handleDayClick(day) {
      const dateStr = day.date.toISOString().split("T")[0];
      this.selectedDate = dateStr;
      this.selectedTrainings = this.trainingDates.filter(
          (t) => t.trainingDate === dateStr
      );
    },
  },
  mounted() {
    this.loadTrainingDates();
  },
};
</script>

<style scoped>
.calendar-wrapper {
  max-width: 500px;
  margin: auto;
}
.training-list {
  margin-top: 20px;
}
</style>
