<template>
  <div class="d-flex justify-content-center align-items-center gap-4">
    <div class="form-check d-flex align-items-center">
      <input
          @change="$emit('event-update-gender', $event.target.value)"
          class="form-check-input"
          type="radio"
          name="gender"
          id="gender-male"
          value="M"
      />
      <label class="form-check-label ms-2" for="gender-male">
        Mees
      </label>
    </div>
    <div class="form-check d-flex align-items-center">
      <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="gender-female"
          value="N"
          @change="$emit('event-update-gender', $event.target.value)"
      />
      <label class="form-check-label ms-2" for="gender-female">
        Naine
      </label>
    </div>
  </div>
</template>
