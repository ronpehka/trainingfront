<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-5">
          <h1 v-if="!isEdit">Lisa uus asukoht</h1>
          <h1 v-else>Muuda asukoht</h1>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-7">
          <LocationInput v-model="locationData.name" />
          <DistrictDropDown v-model="locationData.districtId" />
          <AlertError v-if="error" :message="error" />
          <alertSuccess v-if="success" :message="success" />
        </div>
      </div>

      <div class="row justify-content-center mt-3">
        <div class="col col-2">
          <button v-if="!isEdit" @click="saveLocation">Lisa asukoht</button>
          <button v-else @click="updateLocation">Muuda asukoht</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import DistrictDropDown from "@/components/location/DistrictDropDown.vue";
import LocationInput from "@/views/LocationInput.vue";
import alertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertError from "@/components/alert/AlertError.vue";
import LocationService from "@/services/LocationService";
import { useRoute } from "vue-router";

export default {
  name: "AddNewLocation",
  components: {
    AlertError,
    LocationInput,
    DistrictDropDown,
    alertSuccess,
  },
  data() {
    return {
      isEdit: false,
      locationData: {
        name: "",
        districtId: null,
      },
      error: null,
      success: null,
    };
  },
  created() {
    const route = useRoute();
    const locationId = route.params.id;
    if (locationId) {
      this.isEdit = true;
      this.fetchLocation(locationId);
    }
  },
  methods: {
    async fetchLocation(id) {
      try {
        const response = await LocationService.getLocationById(id);
        this.locationData = response.data;
      } catch (err) {
        this.error = "Asukoha andmete laadimine ebaõnnestus.";
      }
    },
    async saveLocation() {
      try {
        await LocationService.createLocation(this.locationData);
        this.success = "Asukoht edukalt lisatud!";
      } catch (err) {
        this.error = "Asukoha lisamine ebaõnnestus.";
      }
    },
    async updateLocation() {
      try {
        await LocationService.updateLocation(this.locationData.id, this.locationData);
        this.success = "Asukoht edukalt muudetud!";
      } catch (err) {
        this.error = "Asukoha muutmine ebaõnnestus.";
      }
    },
  },
};
</script>


