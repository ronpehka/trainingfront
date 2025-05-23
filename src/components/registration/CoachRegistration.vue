<template>


  <div class="col col-2  container text-center justify-content-center">
    <div class="row justify-content-center">

      <div>

        <div class="col col-2 input-group mb-3">
          <CoachDescriptionInput :description="coachProfile.description"
          @event-update-description="$emit('event-update-description', $event)"
          />
        </div>
        <div class="col col-2 input-group mb-3">
          <PhoneNumberInput :coach-phone-number="coachProfile.phoneNumber"
                              @event-update-phone-number="$emit('event-update-phone-number', $event)"

          />
        </div>

        <div class="col col-2 input-group mb-3">
          <CoachImageInput :coach-image="coachProfile.imageData"
          @event-new-image-selected="$emit('event-new-image-selected', $event)"
          />
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
