<template>
  <div>
  <LocationTable/>
  </div>
</template>


<script>
import LocationTable from "@/components/location/LocationTable.vue";

export default {
  name: 'TrainingLocation',
  components: {LocationTable},
  data(){
    return{

      selectedTrainingId:0,
      locations: [
        {
          locationId: 0,
          locationName: '',
          locationAddress: '',
          imageUrl: '',
          districtId: 0,
          districtName: ''
        }
      ],
      errorResponse: {
        errorMessage: '',
        errorResponse: 0,
      }
    };
  },
}
</script>