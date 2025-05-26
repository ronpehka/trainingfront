<template>
  <div class="col col-2">
    <SportsDropdown :sportType="sportTypes" :selected-sport-type="trainingInfo.sportType"
                    @event-new-sport.selected="setSportTypeId()"/>

  </div>
  <div v-for="trainingInfo in trainingInfos" :key="trainingInfo.trainingId">
  <table class="table-bordered">
     <tr class="active">
      <th style="width: 200px;">Spordiala</th>
      <th style="width: 200px;">Vanuserühm</th>
      <th style="width: 200px;">Asukoht</th>
      <th style="width: 200px;">Treener</th>
      <th style="width: 200px;">Treeningajad</th>
    </tr>

    <tr class="active">
      <td>{{ trainingInfo.sportType}}</td>
      <td>{{ trainingInfo.trainingName}} </td>
      <td>{{trainingInfo.locationName}}</td>
      <td>{{trainingInfo.coachFullName}}</td>
      <td>{{trainingInfo.trainingDays}}{{trainingInfo.startTime}}{{trainingInfo.endTime}}</td>
    </tr>
  </table>
  </div>
</template>


<script>
import TrainingInfoService from "@/services/TrainingInfoService";
import SportsDropdown from "@/components/training/SportsDropdown.vue";

export default {
  name: 'TrainingInfoView',
  components: {SportsDropdown},
  data() {
    return {
      trainingInfos: [],
      trainingInfo: {
        coachUserId: 0,
        trainingId: 0,
        trainingName: '',
        coachFullName: '',
        trainingDescription: '',
        trainingGender: '',
        startDate: '',
        endDate: '',
        trainingDays: [],
        startTime: '',
        endTime: '',
        locationName: '',
        address: '',
        districtName: '',
        sportType: '',
        maxLimit: 0

      }
    }
  },
  methods: {
    getAllTrainingInfo() {
      TrainingInfoService.sendGetTrainingInfoRequest()
          .then(response => {
            this.trainingInfos = response.data;
              })
          .catch(error => console.error("Failed to load training info", error));
    },
    setSportTypeId() {

    },
  },
  mounted() {
    this.getAllTrainingInfo()
  }
}
</script>