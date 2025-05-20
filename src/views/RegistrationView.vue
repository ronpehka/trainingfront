
<template>
  <div>
    <h1>Loo uus konto</h1>
    <ClientRegistration :customer-profile="customerProfile"/>
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
  methods:{}
}
</script>
