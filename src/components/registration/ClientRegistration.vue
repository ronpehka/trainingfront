<template>
  <div class="container d-flex justify-content-center">
    <div class="col-12 col-md-6">
      <div class="mb-3">
        <FirstNameInput
            :first-name="customerProfile.firstName"
            @event-update-firstname="$emit('event-update-firstname', $event)"
        />
      </div>
      <div class="mb-3">
        <LastNameInput
            :last-name="customerProfile.lastName"
            @event-update-lastname="$emit('event-update-lastname', $event)"
        />
      </div>
      <div class="mb-3">
        <EmailInput
            :email="customerProfile.email"
            @event-update-email="$emit('event-update-email', $event)"
        />
      </div>
      <div class="mb-3">
        <DateOfBirthInput
            :date-of-birth="customerProfile.dateOfBirth"
            @event-update-date-of-birth="$emit('event-update-date-of-birth', $event)"
        />
      </div>
      <div class="mb-3">
        <GenderInput
            :gender="customerProfile.gender"
            @event-update-gender="$emit('event-update-gender', $event)"
        />
      </div>
      <div class="mb-3">
        <PasswordInput
            :password="customerProfile.password"
            :password-retype="passwordRetype"
            @event-update-password="$emit('event-update-password', $event)"
            @event-update-retyped-password="$emit('event-update-retyped-password', $event)"
        />
      </div>
    </div>
  </div>
</template>


<script>
import FirstNameInput from "@/components/registration/FirstNameInput.vue";
import LastNameInput from "@/components/registration/LastNameInput.vue";
import EmailInput from "@/components/registration/EmailInput.vue";
import DateOfBirthInput from "@/components/registration/DateOfBirthInput.vue";
import GenderInput from "@/components/registration/GenderInput.vue";
import PasswordInput from "@/components/registration/PasswordInput.vue";

export default {
  name: 'ClientRegistration',
  components: {PasswordInput, GenderInput, DateOfBirthInput, EmailInput, LastNameInput, FirstNameInput},
  props: {
    passwordRetype: String,
    customerProfile: Object
  }
}
</script>
