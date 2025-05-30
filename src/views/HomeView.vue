<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Vasak kaart -->
      <div class="col-md-6">
        <div class="card mb-3" style="max-width: 600px;">
          <img src="https://korvpall100.ee/bw_client_files/korvpall100/public/img/Image/ESMF201_96-C561_1.jpg" class="card-img-top" alt="trennipilt">
          <div class="card-body text-start">
            <h5 class="card-title">Meeskonnasport massidesse!</h5>
            <div class="space-y-4">
              <p>
                <strong>Tere tulemast spordiportaali Athletica!</strong><br>
                Athletica on spetsiaalselt noortele sportlastele loodud kaasaegne treeningute haldamise keskkond, kus treenerid, õpilased ja lapsevanemad saavad mugavalt organiseerida sporditegevusi. Portaali kaudu on võimalik vaadata treeningplaani, registreeruda treeningutele ning saada ülevaade treeningkoormusest ja vabadest kohtadest. Selge ja kasutajasõbralik liides teeb igapäevase halduse lihtsaks nii mobiilis kui ka arvutis.
              </p>

              <p>
                <strong>Personaalne treeningukogemus igale sportlasele</strong><br>
                Portaal võimaldab filtreerida treeninguid spordiala, treeneri, asukoha ja muu järgi, et iga kasutaja leiaks sobiva koormuse ning parima arengu võimalused. Treeneritel on võimalus hallata oma rühmi, lisada uusi treeninguid ning hoida silm peal registreerumistel ja osalejate arvul. Tänu täpsele kalendripõhisele vaatele on võimalik näha, millal ja kus treeningud toimuvad, vältides ajakattuvusi.
              </p>

              <p>
                <strong>Usaldusväärne tööriist klubidele ja kogukondadele</strong><br>
                Athletica ei ole pelgalt kalender – see on tööriist, mis ühendab kogukonda. Klubi administraatorid saavad hallata mitut treenerit ja rühma korraga, jälgida aktiivsust ning koguda tagasisidet. Portaali taustal töötab võimas ja turvaline süsteem, mis tagab andmete täpsuse ning mugava kasutajakogemuse. Athletica teeb treeningute korraldamise lihtsaks, läbipaistvaks ja tõhusaks.
              </p>
            </div>

          </div>
        </div>
      </div>

      <!-- Kalendri pool -->
      <div class="col-md-6">
        <h4>Treeningplaan</h4>

        <div class="calendar-wrapper">
          <v-calendar
              :attributes="calendarAttributes"
              @dayclick="handleDayClick"
          />

          <div v-if="selectedTrainings.length" class="training-list">
            <h3>Treeningud kuupäeval {{ selectedDate }}</h3>
            <ul>
              <li v-for="t in selectedTrainings" :key="t.trainingId">
                Treening ID: {{ t.trainingId }}
              </li>
            </ul>
          </div>
        </div>

        <ul>
          <li>Kontakt: info@sportportaal.ee</li>
          <li>Treenerite kogemus: 10+ aastat</li>
          <li>Treeningute sagedus: 3x nädalas</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TrainingDateService from "@/services/TrainingDateService";

export default {
  data() {
    return {
      trainingDates: [],
      selectedDate: null,
      selectedTrainings: [],
    };
  },
  computed: {
    calendarAttributes() {
      return this.trainingDates.map((td) => ({
        key: td.trainingId,
        highlight: {
          backgroundColor: "#FF000020",
          border: "2px solid red",
        },
        dates: new Date(td.trainingDate),
      }));
    },
  },
  methods: {
    async loadTrainingDates() {
      try {
        const response = await TrainingDateService.sendGetAllTrainingDatesRequest();
        this.trainingDates = response.data;
      } catch (err) {
        console.error("Treeningkuupäevade laadimine ebaõnnestus", err);
      }
    },
    handleDayClick(day) {
      const dateStr = day.date.toISOString().split("T")[0];
      this.selectedDate = dateStr;
      this.selectedTrainings = this.trainingDates.filter(
          (t) => t.trainingDate === dateStr
      );
    },
  },
  mounted() {
    this.loadTrainingDates();
  },
};
</script>

<style scoped>
.calendar-wrapper {
  max-width: 500px;
  margin: auto;
}
.training-list {
  margin-top: 20px;
}
</style>
