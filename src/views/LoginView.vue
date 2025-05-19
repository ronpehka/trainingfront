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

        <button @click="sendLoginRequest" type="button" class="btn btn-outline-secondary">Logi sisse</button>
      </div>
    </div>

  </div>

</template>


<script>
import LoginService from "@/services/LoginService";
import ErrorCodes from "@/errors/ErrorCodes";
import AlertError from "@/components/alert/AlertError.vue";

export default {
  name: 'LoginView',
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
    sendLoginRequest() {
      if(this.email.length > 0 && this.password.length > 0 ){
        LoginService.sendLoginRequest(this.email, this.password)
            .then(response => {
              this.handleLoginRequest(response);
            }).catch(error => {
          let httpStatusCode = error.response.status
          this.errorResponse = error.response.data
          if (httpStatusCode === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_CREDENTIALS) {
            this.errorMessage = this.errorResponse.message
          }
        })

      }
    },
    handleLoginRequest(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },

    resetErrorMeassage() {
      this.errorMessage = ''
    }
  },
}
</script>
