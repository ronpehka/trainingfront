<template>
  <div class="d-flex justify-content-center align-items-center gap-4">
    <div class="form-check d-flex align-items-center">
      <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="gender-male"
          value="M"
          v-model="localGender"
      />
      <label class="form-check-label ms-2" for="gender-male">
        Mees
      </label>
    </div>
    <div class="form-check d-flex align-items-center">
      <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="gender-female"
          value="N"
          v-model="localGender"
      />
      <label class="form-check-label ms-2" for="gender-female">
        Naine
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gender: {
      type: String,
    }
  },
  data() {
    return {
      localGender: this.gender
    };
  },
  watch: {
    gender(newGender) {
      this.localGender = newGender;
    },
    localGender(newGender) {
      this.$emit('event-update-gender', newGender);
    }
  }
};
</script>
