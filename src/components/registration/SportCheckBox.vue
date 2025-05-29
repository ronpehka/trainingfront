
<template>

  <div class="form-check"
       v-for="sport in sports.sportId"
       :key="sport.sportId">


    <input class="form-check-input"
           type="checkbox"
           :checked="sport.available"
            @change="$emit('event-update-sport-id', {
            sportId: sport.sportId,
            available: $event.target.checked
            })"

    >

    <label class="form-check-label" for="flexCheckDefault">
      {{ sport.sportName }}
    </label>
  </div>



</template>

<script>
export default {
  name: 'SportCheckBox',
  props: {
    addSport: {
      type: Object
    }
  }


}
</script>
