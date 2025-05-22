<template>


  <div class="col col-2  container text-center justify-content-center">
    <div class="row justify-content-center">

      <div>

        <div class="col col-2 input-group mb-3">
          <CoachDescriptionInput/>
        </div>
        <div class="col col-2 input-group mb-3">
          <phone-number-input/>
        </div>

        <div class="col col-2 input-group mb-3">
          <CoachImageInput/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CoachDescriptionInput from "@/components/registration/CoachDescriptionInput.vue";
import PhoneNumberInput from "@/components/registration/PhoneNumberInput.vue";
import CoachImageInput from "@/components/registration/CoachImageInput.vue";



export default {
  name: 'CoachRegistration',
  components: {
    CoachDescriptionInput,
    PhoneNumberInput,
    CoachImageInput,
  },
  props: {
    passwordRetype: String,
    coachProfile: Object
  },

}
</script>
