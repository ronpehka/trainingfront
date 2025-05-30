<template>
  <div>
    <PhoneNumberInput :coach-phone-number="coachProfile.phoneNumber"
                      @event-update-phone-number="$emit('event-update-phone-number', $event)" />
    <CoachDescriptionInput
    :description="coachProfile.description"
    @event-update-description="$emit('event-update-description', $event)"
    />
    <SportCheckBox
        :sports="sports"
        @event-update-checked-sport="$emit('event-update-checked-sport',$event)"/>

    <CoachImage @event-update-coach-image="$emit('event-update-coach-image',$event)"/>


  </div>


</template>


<script>

import CoachImage from "@/components/image/CoachImage.vue";
import SportCheckBox from "@/components/registration/SportCheckBox.vue";
import PhoneNumberInput from "@/components/registration/PhoneNumberInput.vue";
import CoachDescriptionInput from "@/components/registration/CoachDescriptionInput.vue";
import emailInput from "@/components/registration/EmailInput.vue";


export default {
  name: 'CoachRegistration',

  components: {CoachDescriptionInput, PhoneNumberInput, SportCheckBox, CoachImage},
  props: {

    coachProfile: Object,
    sports: Array
  },

}

</script>
