<template>
  <div class="container text-center">

    <AlertError :error-message="errorMessage"/>
    <div class="row justify-content-center">
      <div class="col col-2">
        <div class="mb-3">
          <label class="form-label"> Kasutajanimi</label>
          <input v-model="email" type="email" class="form-control" placeholder="juhan@juhan.ee">
        </div>

        <div class="input-group mb-3">
          <label class="form-label m-2"> Parool</label>
          <input v-model="password" type="password" class="form-control">
        </div>

        <button @click="login" type="button" class="btn btn-outline-secondary">Logi sisse</button>

        <div class="m-3">
          <button @click="registrationView" type="button" class="btn btn-outline-secondary">Loo konto</button>
          <button @click="coachRegistrationView" type="button" class="btn btn-outline-secondary">Registreeri teenerina
          </button>
        </div>
      </div>
    </div>

  </div>

</template>


<script>
import LoginService from "@/services/LoginService";
import ErrorCodes from "@/errors/ErrorCodes";
import AlertError from "@/components/alert/AlertError.vue";
import Navigation from "@/navigation/navigation";

export default {
  name: 'LoginView',
  computed: {
    coachRegistrationView() {
      Navigation.navigateToCoachRegistrationView()
    },
    registrationView() {
      Navigation.navigateToRegistrationView();
    }
  },
  components: {AlertError},

  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loginResponse: {
        userId: 0,
        roleName: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },
  methods: {

    login() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetErrorMessage, 4000)
      }

    },
    sendLoginRequest() {

      LoginService.sendLoginRequest(this.email, this.password)
          .then(response => this.handleLoginRequest(response))
          .catch(error => this.handleIncorrectCredentials(error))
    },
    allFieldsAreWithCorrectInput() {
      return this.email.length > 0 && this.password.length > 0;
    },
    handleLoginRequest(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu')
      Navigation.navigateToTrainingInfoView()
    },
    handleIncorrectCredentials(error) {
      let httpStatusCode = error.response.status
      this.errorResponse = error.response.data
      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetErrorMessage, 4000)
      }

    },

    isIncorrectCredentials(httpStatusCode) {
      return httpStatusCode === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_CREDENTIALS;
    },

    resetErrorMessage() {
      this.errorMessage = ''
    }
  },
}
</script>
