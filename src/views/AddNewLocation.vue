<template>
<div>

  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">
        <AlertDanger :error-message="errorMessage">
        <h1 v-if="!isEdit">Lisa uus asukoht</h1>
        <h1 v-else>Muuda asukoht</h1>
      </div>
    </div>
    <div class="row justify-content-center">

      <div class="col col-2">
        <DistrictDropDown/>
      </div>

      <div class="col col-7">
        <LocationInput/>
      </div>


    </div>
    <div class="row  justify-content-center">
      <div class="col col-2">
        <button v-if="!isEdit">Lisa asukoht</button>
        <button v-else>Muuda asukoht</button>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import DistrictDropDown from "@/components/location/DistrictDropDown.vue";
import LocationInput from "@/views/LocationInput.vue";
import alertSuccess from "@/components/alert/AlertSuccess.vue";
import RoleService from "@/services/RoleService";
import navigation from "@/navigation/Navigation";
import {useRoute} from "vue-router";
import LocationService from "@/services/LocationService";
import DistrictService from "@/services/DistrictService";

export default {
  name: "AddNewLocation",
  components: {LocationInput, DistrictDropDown, alertSuccess},
  data(){
    return{
      newLocation:{
        districtId: 0,
        locationName: "string",
        locationAddress: "string",
        openingHours: "string",
        imageUrl: "string"
      },
      districts: [{
        districtId: 0,
        districtName: "string"
      }]
    }
  },
  methods:{
    handleSendGetLocationResponse(response){
      this.newLocation = response.data
},
    handleSendGetLocationErrorResponse(error){
      this.errorResponse = error.response.data

    }
    // thishandleResponse(response){
    //
    // }
  },
  beforeMount() {
    if(!RoleService.isLoggedIn()){
      navigation.navigateToErrorView()
    }
    RoleService.isCoach()
    this.isEdit = useRoute().query.locationId !== undefined
    this.selectedLocationId = useRoute().query.locationId
    LocationService.sendGetLocationRequest(this.selectedLocationId)
        .then(response =>this.handleSendGetLocationResponse(response)).catch(error=>this.handleSendGetLocationErrorResponse(error))
    DistrictService.sendGetDistrictRequest().then(respone=>this.handleResponse(response))
  }

}
</script>

