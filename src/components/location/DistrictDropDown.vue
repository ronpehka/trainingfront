<template>

  <select :value="selectedDistrictId" @change="handleCityDropdownChange" class="form-select"
          aria-label="Default select example">
    <option selected value=0>Kõik linnaosad</option>
    <option v-for="district in districts" :key="district.districtId" :value="district.districtId">{{ district.districtName }}</option>
  </select>

</template>


<script>

export default {
  name: 'DistrictDropDown',
  props: {
    districts: {
      type: Array
    },
    selectedDistrictId: {
      type: Number,
      default: 0
    }
  },
  methods: {

    handleCityDropdownChange(event) {
      this.$emit('event-new-district-selected', Number(event.target.value))
    },

  }
}
</script>
