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

    <div v-for="coach in coaches" :key="coach.coachUserId" class="row justify-content-center">
      <div class="col col-2">

        <img v-if="  coach.imageData === null || coach.imageData.length === 0" width="150" height="150"
             src="https://media.istockphoto.com/id/1934800957/vector/man-empty-avatar-vector-photo-placeholder-for-social-networks-resumes-forums-and-dating.jpg?s=1024x1024&w=is&k=20&c=EjRPg7oLiAQ9s60K5bdvvz6TGWWS-sUVTOoesVvn9rE="
             class="img-thumbnail" alt="Treeneri pilt">
        <img v-else width="150" height="150" :src="coach.imageData" class="img-thumbnail" alt="Treeneri pilt">


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

