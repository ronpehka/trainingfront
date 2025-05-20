<template>
  <div class="container text-center justify-content-center">
    <div class="row justify-content-center">
      <div class="col col-3">
        <div class="col col-2 input-group mb-3">
          <FirstNameInput/>

        </div>
        <div class="input-group mb-3">
          <LastNameInput/>
        </div>
        <div class="input-group mb-3">
          <EmailInput/>
        </div>
        <div class="input-group mb-3">
          <DateOfBirthInput/>
        </div>
        <GenderInput/>

        <PasswordInput/>
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
    customerProfile: Object
  }
}
</script>
