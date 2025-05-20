<template>
  <div>
    <div class="form-check">
      <input
          :checked="gender === 'Mees'"
          @change="$emit('event-update-gender', $event.target.value)"
          class="form-check-input" type="radio" name="gender" id="gender-male" value="M">
      <label class="form-check-label" for="gender-male">
        Mees
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="gender" id="gender-female" value="N"
             @change="$emit('event-update-gender', $event.target.value)">
      <label class="form-check-label" for="gender-female">
        Naine
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GenderInput',
  props: {
    gender: String
  }
}
</script>