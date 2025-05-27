<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <CoachesTable :coaches="coaches"/>
      </div>
    </div>
  </div>
</template>

<script>
import ThumbnailImage from "@/components/image/ThumbnailImage.vue";
import CoachesTable from "@/components/coaches/CoachesTable.vue";
import CoachInfoService from "@/services/CoachInfoService";

export default {
  name: 'CoachInfoView',
  components: {CoachesTable, ThumbnailImage},
  data() {
    return {
      coaches: [
        {
          coachUserId: 0,
          coachFullName: '',
          email: '',
          phoneNumber: '',
          sports: [
            {
              sportType: ''
            }
          ],
          imageData: ''
        }
      ]
    }
  },
  methods: {

    sendGetCoachesInfoRequest() {
      CoachInfoService.sendGetCoachInfoRequest()
          .then(response => {this.coaches = response.data})
          .catch(error => {this.errorResponse = error.errorResponse})
    }


  },




  beforeMount() {

    this.sendGetCoachesInfoRequest()
  },

}


</script>