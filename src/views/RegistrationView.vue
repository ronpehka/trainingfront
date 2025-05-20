
<template>
  <div>
    <h1>Loo uus konto</h1>
    <ClientRegistration :customer-profile="customerProfile"
                        :password-retype="passwordRetype"
                        @event-update-firstname="setCustomerProfileFirstName"
                        @event-update-lastname="setCustomerProfileLastName"
                        @event-update-email = "setCustomerProfileEmail"
                        @event-update-date-of-birth="setCustomerProfileDateOfBirth"
                        @event-update-gender="setCustomerProfileGender"
                        @event-update-password="setCustomerProfilePassword"
                        @event-update-retyped-password="setRetypedPassword"
    />
    <button type="button" class="btn btn-outline-secondary">Loo konto</button>
  </div>


</template>

<script>
import ClientRegistration from "@/components/registration/ClientRegistration.vue";

export default {
  name: 'RegistrationView',
  components: {ClientRegistration},
  data(){
    return {
      passwordRetype: '',
      customerProfile: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        password: ''
      }
    }
  },
  methods:{
    setCustomerProfileGender(gender){
      this.customerProfile.gender = gender
    },
    setCustomerProfileFirstName(firstName){
      this.customerProfile.firstName = firstName
    },
    setCustomerProfileLastName(lastName){
      this.customerProfile.lastName = lastName
    },
    setCustomerProfileEmail(email){
      this.customerProfile.email = email
    },
    setCustomerProfileDateOfBirth(dateOfBirth){
      this.customerProfile.dateOfBirth = dateOfBirth
    },
    setCustomerProfilePassword(password){
      this.customerProfile.password = password
    },
    setRetypedPassword(passwordRetype){
      this.passwordRetype = passwordRetype
    }
  }
}
</script>
