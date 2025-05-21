<template>
<CoachImageInput/>
  <CoachDescriptionInput/>
</template>

<script>
import CoachDescriptionInput from "@/components/registration/CoachDescriptionInput.vue";
import PhoneNumberInput from "@/components/registration/PhoneNumberInput.vue";
import CoachImageInput from "@/components/registration/CoachImageInput.vue";


export default {
  name: 'CoachRegistration',
  components: {CoachDescriptionInput, PhoneNumberInput, CoachImageInput},
  props: {
    passwordRetype: String,
    coachProfile: Object
  }
}
</script>
