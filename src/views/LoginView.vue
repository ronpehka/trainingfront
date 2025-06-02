<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg login-card dark-card">

      <AlertError :error-message="errorMessage"/>
      <div class="row justify-content-center">
        <div class="col">
          <div class="mb-3">
            <div class="input-label">Kasutajanimi</div>
            <input v-model="email" type="email" class="form-control input-dark" placeholder="juhan@juhan.ee">
          </div>

          <div class="mb-3">
            <div class="input-label">Parool</div>
            <input v-model="password" type="password" class="form-control input-dark">
          </div>

          <div class="d-grid gap-2">
            <button @click="login" type="button" class="btn btn-danger">Logi sisse</button>
            <button @click="registrationView" type="button" class="btn btn-danger">Loo konto</button>
            <button @click="coachRegistrationView" type="button" class="btn btn-outline-danger">Registreeri treenerina</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import LoginService from "@/services/LoginService";
import ErrorCodes from "@/errors/ErrorCodes";
import AlertError from "@/components/alert/AlertError.vue";
import Navigation from "@/navigation/Navigation";

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
