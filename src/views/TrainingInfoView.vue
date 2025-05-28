<template>
  <div class="col col-2">
    <SportsDropdown :sportInfos="sportInfos"
                    :selected-sport-id="sportInfo.sportId"
                    @event-new-sport-selected="setSportId"/>

  </div>

  <table class="table-bordered">
    <thead>
    <tr class="active">
      <th style="width: 200px;">Spordiala</th>
      <th style="width: 200px;">Vanuserühm</th>
      <th style="width: 200px;">Asukoht</th>
      <th style="width: 200px;">Treener</th>
      <th style="width: 200px;">Trenniajad</th>

    </tr>
    </thead>

    <tbody>
    <tr v-for="trainingInfo in trainingInfos" :key="trainingInfo.trainingId" class="active">
      <td>{{ trainingInfo.sportType }}</td>
      <td>{{ trainingInfo.trainingName }}</td>
      <td>{{ trainingInfo.locationName }}</td>
      <td>{{ trainingInfo.coachFullName }}</td>
      <td>
        {{ (trainingInfo.trainingDays || []).map(day => day.weekday).join(', ') }}
        {{ trainingInfo.startTime }} - {{ trainingInfo.endTime }}
      </td>
      </tr>
    </tbody>
  </table>

</template>


<script>
import TrainingInfoService from "@/services/TrainingInfoService";
import SportsDropdown from "@/components/training/SportsDropdown.vue";
import sportService from "@/services/SportService";

export default {
  name: 'TrainingInfoView',
  components: {SportsDropdown},
  data() {
    return {
      trainingInfos: [],
      sportInfos: [],
      sportInfo: {
        sportId: 0,
        sportName: ''
      },
    };
  },

  methods: {

    getTrainingInfos() {
      TrainingInfoService.sendGetTrainingInfoRequest(this.sportInfo.sportId)
          .then(response => {
            this.trainingInfos = response.data;
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

    setSportId(selectedSportId) {
      this.sportInfo.sportId = selectedSportId;
      this.getTrainingInfos();
    },

    // getFilteredTrainingInfos() {
    //   if (this.sportInfo.sportId === 0) {
    //     return this.trainingInfos;
    //   }
    //   const selectedSport = this.sportInfos.find(
    //       s => s.sportId === this.sportInfo.sportId
    //   );
    //
    //   if (!selectedSport) return [];
    //
    //   return this.trainingInfos.filter(
    //       (info) => info.sportType === selectedSport.sportName
    //   );
    // },
  },
  mounted() {
    this.getTrainingInfos()
    this.getAllSports()
    }
}
</script>