<template>
  <div>
    <CoachRegistration
        @event-update-description="setCoachDescription"
        @event-update-phoneNumber="setPhoneNumber"
        @event-update-coachImage="setCoachImage"/>

  </div>


</template>


<script>
import AlertError from "@/components/alert/AlertError.vue";
import CoachRegistration from "@/components/registration/CoachRegistration.vue";
import ClientRegistration from "@/components/registration/ClientRegistration.vue";

export default {
  name: 'CoachRegistrationView',
  components: {ClientRegistration, AlertError, CoachRegistration},

  data() {
    return {

      CoachRegistration: {
        description: '',
        phoneNumber: '',
        coachImage:'',
      }


    }
  },
  methods: {

    setCoachDescription(description) {
      this.CoachRegistration.description = description
    },
    setPhoneNumber(phoneNumber) {
      this.CoachRegistration.phoneNumber=phoneNumber
    },
    setCoachImage(coachImage) {
      this.CoachRegistration.coachImage=coachImage
    },

  }

}
</script>
