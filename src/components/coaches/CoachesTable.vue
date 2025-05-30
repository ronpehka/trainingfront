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
        <img :src="coach.imageData" alt="Treeneri pilt" class="img-fluid rounded" />
      </div>
      <div class="col col-2">
        {{coach.coachFullName}}
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


export default {
  name: 'CoachesTable',
  props: {
    coaches: Array
  }
}
</script>

