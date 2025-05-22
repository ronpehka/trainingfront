<template>
  <div>
    <h1>Loo uus konto</h1>
    <AlertError :error-message="errorMessage"/>
    <ClientRegistration :customer-profile="customerProfile"
                        :password-retype="passwordRetype"
                        @event-update-firstname="setCustomerProfileFirstName"
                        @event-update-lastname="setCustomerProfileLastName"
                        @event-update-email="setCustomerProfileEmail"
                        @event-update-date-of-birth="setCustomerProfileDateOfBirth"
                        @event-update-gender="setCustomerProfileGender"
                        @event-update-password="setCustomerProfilePassword"
                        @event-update-retyped-password="setRetypedPassword"
    />

    <button @click="addNewCustomer" type="button" class="btn btn-outline-secondary">Loo konto</button>
  </div>



</template>

<script>
import ClientRegistration from "@/components/registration/ClientRegistration.vue";
import AlertError from "@/components/alert/AlertError.vue";
import RegistrationServices from "@/services/RegistrationServices";
import ErrorCodes from "@/errors/ErrorCodes";

export default {
  name: 'RegistrationView',
  components: {AlertError, ClientRegistration},
  data() {
    return {
      passwordRetype: '',
      errorMessage: '',
      customerProfile: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        password: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    setCustomerProfileGender(gender) {
      this.customerProfile.gender = gender
    },
    setCustomerProfileFirstName(firstName) {
      this.customerProfile.firstName = firstName
    },
    setCustomerProfileLastName(lastName) {
      this.customerProfile.lastName = lastName
    },
    setCustomerProfileEmail(email) {
      this.customerProfile.email = email
    },
    setCustomerProfileDateOfBirth(dateOfBirth) {
      this.customerProfile.dateOfBirth = dateOfBirth
    },
    setCustomerProfilePassword(password) {
      this.customerProfile.password = password
    },
    setRetypedPassword(passwordRetype) {
      this.passwordRetype = passwordRetype
    },
    handleAddNewCustomerErrorResponse(error) {
      this.errorResponse = error.response.data
      if (error.response.status === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_EMAIL_UNAVAILABLE) {
        this.setTimedOutErrorMessage(this.errorResponse.message)
      }
    },
    addNewCustomer() {
      this.validateUserCorrectInput()
      if (this.errorMessage === '') {
        RegistrationServices.sendPostNewCustomerRequest(this.customerProfile)
            .then(() => this.handleAddNewCustomerResponse()).catch(error => this.handleAddNewCustomerErrorResponse(error))
      }
    },
    handleAddNewCustomerResponse() {
      this.resetAllFields()
    },
    resetAllFields() {
      this.customerProfile.firstName = ''
      this.customerProfile.lastName = ''
      this.customerProfile.email = ''
      this.customerProfile.dateOfBirth = ''
      this.customerProfile.gender = ''
      this.customerProfile.password = ''
      this.passwordRetype = ''
    },
    validateUserCorrectInput() {
      if (!this.isNameValid(this.customerProfile.firstName)) {
        this.setTimedOutErrorMessage('Eesnimi peab olema vähemalt 3 tähemärki ja tohib sisldada tähti ning vajadusel sidekriipsu')
      } else if (this.customerProfile.lastName.length < 3 && !this.isNameValid(this.customerProfile.lastName)) {
        this.setTimedOutErrorMessage('Perekonnanimi peab olema vähemalt 3 tähemärki ja tohib sisldada tähti ning vajadusel sidekriipsu')
      } else if (!this.isEmailValid(this.customerProfile.email)) {
        this.setTimedOutErrorMessage('Ebakorrektne emaili aadress')
      } else if (this.customerProfile.dateOfBirth.length === 0) {
        this.setTimedOutErrorMessage('Sünnikuupäev on valimata')
      } else if (this.customerProfile.gender.length === 0) {
        this.setTimedOutErrorMessage('Sugu on valimata')
      } else if (this.passwordRetype !== this.customerProfile.password) {
        this.setTimedOutErrorMessage('Paroolid ei kattu')
      }
    },
    isNameValid(name) {
      return /^[\p{L}\s-]+$/u.test(name)
    },
    isEmailValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },


    setTimedOutErrorMessage(message) {
      this.errorMessage = message
      setTimeout(this.resetMessage, 4000)
    },
    resetMessage() {
      this.errorMessage = ''
    }
  }
}
</script>
