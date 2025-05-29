<template>
  <div class="container text-center justify-content-center">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6 mb-3">
        <CoachDescriptionInput
            :description="coachProfile.description"
            @event-update-description="$emit('event-update-description', $event)"
        />
      </div>

      <div class="col-12 col-lg-6 mb-3">
        <PhoneNumberInput
            :coach-phone-number="coachProfile.phoneNumber"
            @event-update-phone-number="$emit('event-update-phone-number', $event)"
        />
      </div>

      <div class="col-12 col-lg-6 mb-3">
        <SportCheckBox
            :sports="sports"
            @event-update-sport-id="$emit('event-update-checked-sport', $event)"
        />
      </div>

      <div class="col-12 col-lg-6 mb-3">
        <CoachImageInput
            :coach-image="coachProfile.imageData"
            @event-new-image-selected="$emit('event-new-image-selected', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CoachDescriptionInput from "@/components/registration/CoachDescriptionInput.vue";
import PhoneNumberInput from "@/components/registration/PhoneNumberInput.vue";
import CoachImageInput from "@/components/registration/CoachImageInput.vue";
import SportCheckBox from "@/components/registration/SportCheckBox.vue";



export default {
  name: 'CoachRegistration',
  components: {
    SportCheckBox,
    CoachDescriptionInput,
    PhoneNumberInput,
    CoachImageInput,
  },
  props: {
    checkedSportsId: {
      type: Number,
      default: null,
    },
    passwordRetype: String,
    coachProfile: Object,
    sports: {
      type: Array,
      default: () => []
    }

  },

  methods: {
    handleSportChecked(sportId) {
      this.$emit('event-sport-checked', sportId);
    }
  },

}
</script>
