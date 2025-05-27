<template>
  <div class="container text-center">
    <!--  esimene rida  -->
    <div class="row justify-content-center">
      <div class="col col-2">
        Pilt
      </div>
      <div class="col col-2">
        Nimi
      </div>
      <div class="col col-2">
        Email
      </div>
      <div class="col col-2">
        Telefon
      </div>
      <div class="col col-2">
        Spordialad
      </div>
    </div>

    <!--    kõik ülejöönud read dynaamiliselt coaches pealt, row for loopi-->
    <div v-for="coach in coaches" :key="coach.coachUserId" class="row justify-content-center">
      <div class="col col-2">
        {{coach.imageData}}
      </div>
      <div class="col col-2">
        {{coach.fullName}}
      </div>
      <div class="col col-2">
        {{coach.email}}
      </div>
      <div class="col col-2">
        {{coach.phoneNumber}}
      </div>
      <div class="col col-2">
        {{ coach.sports.map(s => s.sportType).join(', ') }}
      </div>
    </div>

  </div>
</template>

<script>
import CoachImage from "../image/CoachImage.vue";

export default {
  name: 'CoachesTable',
  computed: {
    CoachImage() {

      return CoachImage
    }
  },
  props: {
    coaches: Array
  }
}
</script>

