<template>
  <select :value="selectedDistrictId" @change="handleCityDropdownChange"
          :class="['form-select', { 'is-invalid': error }]">
    <option value="0">Piirkonnad</option>
    <option v-for="district in districts" :key="district.districtId" :value="district.districtId">
      {{ district.districtName }}
    </option>
  </select>
  <div class="invalid-feedback" v-if="error">{{ error }}</div>
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
      default:0,
    },
    isEdit: Boolean,
    error:String
  },
  methods: {
    handleCityDropdownChange(event) {
      this.$emit('new-district-selected', Number(event.target.value))
    }
  }
}
</script>
