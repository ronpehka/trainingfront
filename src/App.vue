<template>
  <div class="taust">
    <div class="overlay">
      <div class="text-center">
        <img @click="navigation.navigateToHomeView" :src="require('@/assets/Athletica.png')" height="100" width="250"
             alt="Athletica logo" class="clickable-logo"/>
      </div>


      <LogOutModal :modal-is-open="modalIsOpen"
                   @event-close-modal="closeModal"
                   @event-logout-confirmed="executeLogOut"
      />
      <nav class="nav-menu">
        <router-link to="/">Avaleht</router-link>
        |
        <!--    <router-link to="/about">Meist</router-link>-->
        <!--    |-->
        <router-link to="/locations">Asukohad</router-link>
        |
        <router-link to="/training-info">Treeningud</router-link>
        |
        <router-link to="/coach-info">Treenerid</router-link>
        |
        <template v-if="!isLoggedIn">
          <router-link to="/login">Logi sisse</router-link>
        </template>
        <template v-else>
          <font-awesome-icon @click="startLogOutProcess" class="cursor-pointer" icon="right-from-bracket"/>
        </template>
      </nav>
      <router-view @event-update-nav-menu="updateNavMenu"/>
    </div>
  </div>
</template>



<script>
import Navigation from "@/navigation/Navigation";
import navigation from "@/navigation/Navigation";
import RoleService from "@/services/RoleService";
import Modal from "@/components/modal/Modal.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";

export default {
  computed: {
    navigation() {
      return navigation
    }
  },
  components: {LogOutModal, Modal},
  data() {
    return {
      isLoggedIn: false,
      isCoach: false,
      modalIsOpen: false
    }
  },
  methods: {

    updateNavMenu() {
      this.isLoggedIn = RoleService.isLoggedIn()
      this.isCoach = RoleService.isCoach()
    },

    startLogOutProcess() {
      this.modalIsOpen = true
    },

    executeLogOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      this.closeModal()
      Navigation.navigateToHomeView()
    },

    closeModal() {
      this.modalIsOpen = false
    },

  },
  beforeMount() {
    this.updateNavMenu()
  }

}
</script>


<style scoped>
.clickable-logo {
  cursor: pointer;
}
</style>