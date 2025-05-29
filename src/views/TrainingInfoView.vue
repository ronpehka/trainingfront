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

  </div>

  <table v-if="filteredTrainings.length > 0" class="table-bordered">
    <thead>
    <tr class="active">
      <th style="width: 200px;">Spordiala</th>
      <th style="width: 200px;">Vanuserühm</th>
      <th style="width: 200px;">Asukoht</th>
      <th style="width: 200px;">Treener</th>
      <th style="width: 200px;">Trenniajad</th>
      <th style="width: 200px;">Vabad kohad</th>
      <th v-if="isCustomer" style="width: 200px;">Registreeru</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="trainingInfo in filteredTrainings" :key="trainingInfo.trainingId" class="active">
      <td>{{ trainingInfo.sportType }}</td>
      <td>{{ trainingInfo.trainingName }}</td>
      <td>{{ trainingInfo.locationName }}</td>
      <td>{{ trainingInfo.coachFullName }}</td>
      <td :class="{'text-danger': trainingInfo.emptyPlaces === 0}">
        {{ (trainingInfo.trainingDays || []).map(day => day.weekday).join(', ') }}
        {{ trainingInfo.startTime }} - {{ trainingInfo.endTime }}
      </td>

      <td>{{ trainingInfo.emptyPlaces }} / {{trainingInfo.maxLimit}}
      <span v-if="trainingInfo.emptyPlaces === 0"> (täis) </span>
      </td>
      <td v-if="isCustomer && trainingInfo.emptyPlaces > 0">
        <button class="btn btn-success btn-sm"
                @click="register(trainingInfo.trainingId)">
          Registreeru
        </button>
        <button class="btn btn-danger btn-sm"
                @click="unregister(trainingInfo.trainingId)">
          Loobu
        </button>
      </td>


      </tr>
    </tbody>
  </table>
  <button v-if="isCoach" @click="addNewTraining" type="button" class="btn btn-outline-secondary mt-2">Lisa trenn</button>

</template>


<script>
import TrainingInfoService from "@/services/TrainingInfoService";
import SportsDropdown from "@/components/training/SportsDropdown.vue";
import sportService from "@/services/SportService";
import Navigation from "@/navigation/navigation";
import RoleService from "@/services/RoleService";
import RegisterService from "@/services/RegisterService";
import CoachInfoService from "@/services/CoachInfoService";

export default {
  name: 'TrainingInfoView',
  components: {SportsDropdown},
  data() {
    return {
      filteredTrainings: [],
      isCoach: false,
      isCustomer: false,
      trainingInfos: [],
      coachInfos: [],
      sportInfos: [],
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
            this.filterTrainingsByCoach();
          })
          .catch(error => console.error("Failed to load training info", error));
    },

    getAllSports() {
      sportService.sendGetSportsRequest()
          .then(response => {
            this.sportInfos = response.data;
          })
          .catch(error => console.error("Failed to load sports info", error));
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

    addNewTraining() {
      Navigation.navigateToAddNewTrainingView()
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

  beforeMount() {
    this.getTrainingInfos()
    this.getAllSports()
    this.getAllCoaches();
    if(RoleService.isCoach()){
      this.isCoach = true
    }
    if(RoleService.isCustomer()){
      this.isCustomer = true
    }
    }
}
</script>