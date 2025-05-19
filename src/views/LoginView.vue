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

          <button type="button" class="btn btn-outline-secondary">Logi sisse</button>
      </div>
      </div>

    </div>

</template>


<script>
export default {
  name: 'LoginView',

  data(){
    return {
      username:'',
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

  },
}
</script>
