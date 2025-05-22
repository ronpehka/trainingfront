<template>
  <div>
    <AlertError
    :error-message="errorMessage"
    />

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

    <CoachRegistration
        :coach-profile="coachProfile"
        @event-update-description="setCoachDescription"
        @event-update-phoneNumber="setPhoneNumber"
        @event-update-coachImage="setCoachImage"
    />

    <CoachImage/>

    <button @click="addNewCoach" type="button" class="btn btn-outline-secondary">Loo konto</button>
  </div>


</template>


<script>
import AlertError from "@/components/alert/AlertError.vue";
import CoachRegistration from "@/components/registration/CoachRegistration.vue";
import ClientRegistration from "@/components/registration/ClientRegistration.vue";
import ErrorCodes from "@/errors/ErrorCodes";
import RegistrationServices from "@/services/RegistrationServices";
import CoachImage from "@/components/image/CoachImage.vue";

export default {
  name: 'CoachRegistrationView',
  components: {CoachImage, ClientRegistration, AlertError, CoachRegistration},

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
      },

      coachProfile: {
        description: '',
        phoneNumber: '',
        imageData: '',
      },


    }
  },
  methods: {

    setCoachDescription(description) {
      this.CoachRegistration.description = description
    },
    setPhoneNumber(phoneNumber) {
      this.CoachRegistration.phoneNumber = phoneNumber
    },
    setCoachImage(coachImage) {
      this.CoachRegistration.coachImage = coachImage
    },
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
    addNewCoach() {
      this.validateUserCorrectInput()
      if (this.errorMessage === '') {
        RegistrationServices.sendPostNewCoachRequest(this.customerProfile, this.coachProfile)
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
      this.coachProfile.description = ''
      this.coachProfile.phoneNumber = ''
      this.coachProfile.coachImage = ''
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
      // } else if (this.customerProfile.password.length && this.isPasswordValid(this.customerProfile.password) ) {
      //   this.setTimedOutErrorMessage('Paroolid peab olema vähemalt 8 tähemärki')
      } else if (this.passwordRetype !== this.customerProfile.password) {
        this.setTimedOutErrorMessage('Paroolid ei kattu')
      } else if (this.coachProfile.description.length > 10) {
        this.setTimedOutErrorMessage('Kirjeldus peab olema vähemalt 100 tähemärki!')
      } else if (this.coachProfile.phoneNumber.length > 5 && this.isPhoneValid(this.coachProfile.phoneNumber)) {
        this.setTimedOutErrorMessage('Sisesta korrektne number')
      }
      // else if (this.coachProfile.coachImage !== 0) {
      //   this.setTimedOutErrorMessage('Pilt peab olema lisatud')
      // }
    },
    isNameValid(name) {
      return /^[\p{L}\s-]+$/u.test(name)
    },
    isEmailValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },
    isPhoneValid(phoneNumber) {
      return /^[^[5-9][0-9]{6,7}$/.test(phoneNumber)
    },
    isPasswordValid(password) {
      return /^.{8,}$/.test(password)
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
