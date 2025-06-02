<template>
  <div class="container text-center">
    <div class="row mb-3">
      <div class="col col-4">
        <SportsDropdown :sportInfos="sportInfos"
                        :selected-sport-id="sportInfo.sportId"
                        @event-new-sport-selected="setSportId"/>
      </div>
      <div class="col col-4">
        <select class="form-select" v-model="selectedCoachId" @change="filterTrainingsByCoach">
          <option value="0">Kõik treenerid</option>
          <option v-for="coach in coachInfos" :key="coach.coachUserId" :value="coach.coachUserId">
            {{ coach.coachFullName }}
          </option>
        </select>
      </div>
    </div>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Spordiala</th>
        <th>Vanuserühm</th>
        <th>Asukoht</th>
        <th>Treener</th>
        <th>Trenniajad</th>
        <th>Vabad kohad</th>
        <th>Registreeru</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="training in filteredTrainings" :key="training.trainingId">
        <td>{{ training.sportType }}</td>
        <td>{{ training.trainingName }}</td>
        <td>{{ training.locationName }}</td>
        <td>{{ training.coachFullName }}</td>
        <td>
          {{ (training.trainingDays || []).map(day => day.weekday).join(', ') }}
          {{ training.startTime }} - {{ training.endTime }}
        </td :class= "{'text-danger': training.emptyPlaces === 0}">
        <td>{{ training.emptyPlaces }} / {{training.maxLimit}}</td>
        <span v-if="training.emptyPlaces === 0"> (täis) </span>
        <td>
          <button class="btn btn-success btn-sm"
                  :disabled="training.emptyPlaces === 0"
                  @click="register(training.trainingId)">Registreeru
          </button>
          <button class="btn btn-danger btn-sm" @click="unregister(training.trainingId)">Loobu</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import SportsDropdown from "@/components/training/SportsDropdown.vue";
import TrainingInfoService from "@/services/TrainingInfoService";
import SportService from "@/services/SportService";
import RegisterService from "@/services/RegisterService";
import CoachInfoService from "@/services/CoachInfoService";

export default {
  name: "UserTrainingRegisterView",
  components: {SportsDropdown},

  data() {
    return {
      trainingInfos: [],
      filteredTrainings: [],
      sportInfos: [],
      coachInfos: [],
      sportInfo: {
        sportId: 0,
        sportName: ''
      },
      selectedCoachId: 0,
      userId: 1
    };
  },

  methods: {
    getTrainingInfos() {
      TrainingInfoService.sendGetTrainingInfoRequest(this.sportInfo.sportId)
          .then(response => {
            this.trainingInfos = response.data;
            this.filteredTrainings = response.data;
          })
          .catch(error => console.error("Failed to load training Info", error));
    },
    getAllSports() {
      SportService.sendGetSportsRequest()
          .then(response => {
            this.sportInfos = response.data;
          })
          .catch(error => console.error("Failed to load sports Info", error));
    },
    getAllCoaches() {
      CoachInfoService.sendGetCoachInfoRequest()
          .then(response => {
            this.coachInfos = response.data;
          })
          .catch(error => console.error("Failed to load coaches info", error));
    },
    setSportId(selectedSportId) {
      this.sportInfo.sportId = selectedSportId;
      this.getTrainingInfos();
    },
    filterTrainingsByCoach() {
      if (this.selectedCoachId === 0) {
        this.filteredTrainings = this.trainingInfos;
      } else {
        this.filteredTrainings = this.trainingInfos.filter(
            t => t.coachUserId === this.selectedCoachId
        );
      }
    },
    register(trainingId) {
      RegisterService.sendPostCustomerTrainingRegistrationRequest(this.userId, trainingId)
          .then(() => alert("Registreerimine õnnestus"))
          .catch(() => alert("Registreerimine ebaõnnestus"));
    },

    unregister(trainingId) {
      RegisterService.sendPostCustomerTrainingUnregistrationRequest(this.userId, trainingId)
          .then(() => {
            alert("Loobumine õnnestus!");
            this.getTrainingInfos();
          })
          .catch(() => alert("Loobumine ebaõnnestus..."));
    },
  },

  mounted() {
    this.getTrainingInfos();
    this.getAllSports();
    this.getAllCoaches();
  }

}
</script>
