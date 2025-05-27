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
import CoachesTable from "@/components/CoachesTable.vue";

export default {
  name: 'CoachView',
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
}
</script>