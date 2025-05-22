<template>
  <div>
    <table class="table table-bordered">
      <thead>

      </thead>
      <tbody>
      <tr v-for="location in locationInfos" :key="location.locationId">
        <td>{{ location.locationName }}</td>
        <td>{{ location.locationAddress }}</td>
        <td>{{ location.districtName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "LocationView",
  props: {
    locationInfos: {
      type: Array,
      required: true
    }
  }
}
</script>