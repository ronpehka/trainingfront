<template>
  <div class="container text-center justify-content-center">
    <div class="row justify-content-center">
      <div class="col col-3">
        <div class="col col-2 input-group mb-3">
          <label class="form-label">Eesnimi</label>
          <input type="text" class="form-control" placeholder="Eesnimi">
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Perekonnanimi</label>
          <input type="text" class="form-control" placeholder="Perekonnanimi">
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="email">
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Sünnikuupäev</label>
          <input type="date" class="form-control" placeholder="date">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            Mees
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
          <label class="form-check-label" for="flexRadioDefault2">
            Naine
          </label>
        </div>

        <div class="input-group mb-3">
          <label class="form-label">Parool</label>
          <input type="password" class="form-control" placeholder="Parool">
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Parool uuesti</label>
          <input type="password" class="form-control" placeholder="Parool">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientRegistration'
}
</script>
