<template>
  <div class="row">
    <div class="col-md-6 mb-4" v-for="location in locations" :key="location.locationId">
      <div class="card w-75 mx-auto">
        <div class="card-body text-start">
          <h3 class="card-title">{{ location.locationName }}</h3>
          <table class="table">
            <tbody>
            <tr>
              <th>Piirkond</th>
              <td>{{ location.districtName }}</td>
            </tr>
            <tr>
              <th>Aadress</th>
              <td>{{ location.locationAddress }}</td>
            </tr>
            <tr>
              <th>Avatud</th>
              <td>{{ location.openingHours }}</td>
            </tr>
            </tbody>
          </table>
          <div class="mb-3">
            <img v-if="!location.imageUrl" src="../assets/gym.jpg" class="img-thumbnail" alt="Suvalise treeningsaali pilt"/>
            <img v-else :src="location.imageUrl" class="img-thumbnail"
                 alt="Treeningsaali pilt"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocationService from "@/services/LocationService";

export default {
  name: 'LocationView',
  data() {
    return {
      locations: [
        {
          locationId: 0,
          locationName: '',
          locationAddress: '',
          imageData: '',
          districtId: 0,
          districtName: ''
        }
      ]
    }
  },
  methods: {
    getAllLocations() {
      LocationService.sendGetLocationsRequest()
          .then(response => {
            this.locations = response.data;
          })
          .catch(error => console.error("Failed to load locations", error));
    }
  },
  mounted() {
    this.getAllLocations();
  }
}
</script>