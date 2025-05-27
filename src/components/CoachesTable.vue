<template>
  <div class="container text-center">
    <!--  esimene rida  -->
    <div class="row justify-content-center">
      <div class="col col-2">
        pilt
      </div>
      <div class="col col-2">
        Nimi
      </div>
      <div class="col col-2">
        Email
      </div>
      <div class="col col-2">
        Spordialad
      </div>
      <div class="col col-2">
        Telefon
      </div>
    </div>

    <!--    kõik ülejöönud read dynaamiliselt coaches pealt, row for loopi-->
    <div class="row justify-content-center">
      <div class="col col-2">
        pilt placeholder
      </div>
      <div class="col col-2">
        Nimi placeholder
      </div>
      <div class="col col-2">
        Email placeholder
      </div>
      <div class="col col-2">
        Spordialad placeholder
      </div>
      <div class="col col-2">
        Telefon placeholder
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


<style scoped>

</style>