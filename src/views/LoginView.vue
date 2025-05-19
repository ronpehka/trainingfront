<template>
  <div class="container text-center">

      <div class="row justify-content-center">
        <div class="col col-2">
        <div class="mb-3">
          <label class="form-label"> Kasutajanimi</label>
          <input type="email" class="form-control" placeholder="juhan@juhan.ee">
        </div>

        <div class="input-group mb-3">
          <label class="form-label m-2"> Parool</label>
          <input type="password" class="form-control">
        </div>

          <button @click="sendLoginRequest" type="button" class="btn btn-outline-secondary">Logi sisse</button>
      </div>
      </div>

    </div>

</template>


<script>
import axios from "axios";
import LoginService from "@/services/LoginService";

export default {
  name: 'LoginView',

  data(){
    return {
      email:'',
      password:'',
      errorMessage:'',
      loginResponse:{
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
    sendLoginRequest(){

   LoginService.sendLoginRequest(this.email, this.password)
       .then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
      }).catch(error => {
        let httpStatusCode = error.response.status
        this.errorResponse = error.response.data
        this.errorMessage = this.errorResponse.message
      })
    },
  },
}
</script>
