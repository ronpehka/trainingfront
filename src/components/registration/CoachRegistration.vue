<template>
  <div>
    <PhoneNumberInput :coach-phone-number="coachProfile.phoneNumber"
                      @event-update-phone-number="$emit('event-update-phone-number', $event)"
                      class="mb-3"
    />
    <CoachDescriptionInput class="mb-3"
    :description="coachProfile.description"
    @event-update-description="$emit('event-update-description', $event)"
    />
    <SportCheckBox class="mb-3"
        :sports="sports"
        @event-update-checked-sport="$emit('event-update-checked-sport',$event)"/>

    <CoachImageInput class="mb-3"
        :image-data="coachProfile.imageData"
        @event-new-image-selected="$emit('event-new-image-selected',$event)"/>
  </div>
</template>


<script>

import CoachImage from "@/components/image/CoachImage.vue";
import SportCheckBox from "@/components/registration/SportCheckBox.vue";
import PhoneNumberInput from "@/components/registration/PhoneNumberInput.vue";
import CoachDescriptionInput from "@/components/registration/CoachDescriptionInput.vue";
import emailInput from "@/components/registration/EmailInput.vue";
import CoachImageInput from "@/components/registration/CoachImageInput.vue";


export default {
  name: 'CoachRegistration',

  components: {CoachImageInput, CoachDescriptionInput, PhoneNumberInput, SportCheckBox, CoachImage},
  props: {

    coachProfile: Object,
    sports: Array
  },

}

</script>
