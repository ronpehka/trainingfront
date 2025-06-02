<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Vasak kaart -->
      <div class="col-md-6">
        <div class="card mb-3" style="max-width: 600px;">
          <img src="https://korvpall100.ee/bw_client_files/korvpall100/public/img/Image/ESMF201_96-C561_1.jpg"
               class="card-img-top" alt="trennipilt">
          <div class="card-body text-start">
            <h5 class="card-title">Meeskonnasport massidesse!</h5>
            <div class="space-y-4 negatiiv">
              <p class="card-body">
                <strong>Tere tulemast spordiportaali Athletica!</strong><br>
                Athletica on spetsiaalselt noortele sportlastele loodud kaasaegne treeningute haldamise keskkond, kus
                treenerid, õpilased ja lapsevanemad saavad mugavalt organiseerida sporditegevusi. Portaali kaudu on
                võimalik vaadata treeningplaani, registreeruda treeningutele ning saada ülevaade treeningkoormusest ja
                vabadest kohtadest. Selge ja kasutajasõbralik liides teeb igapäevase halduse lihtsaks nii mobiilis kui
                ka arvutis.
              </p>

              <p class="card-body">
                <strong>Personaalne treeningukogemus igale sportlasele</strong><br>
                Portaal võimaldab filtreerida treeninguid spordiala, treeneri, asukoha ja muu järgi, et iga kasutaja
                leiaks sobiva koormuse ning parima arengu võimalused. Treeneritel on võimalus hallata oma rühmi, lisada
                uusi treeninguid ning hoida silm peal registreerumistel ja osalejate arvul. Tänu täpsele
                kalendripõhisele vaatele on võimalik näha, millal ja kus treeningud toimuvad, vältides ajakattuvusi.
              </p>

              <p class="card-body">
                <strong>Usaldusväärne tööriist klubidele ja kogukondadele</strong><br>
                Athletica ei ole pelgalt kalender – see on tööriist, mis ühendab kogukonda. Klubi administraatorid
                saavad hallata mitut treenerit ja rühma korraga, jälgida aktiivsust ning koguda tagasisidet. Portaali
                taustal töötab võimas ja turvaline süsteem, mis tagab andmete täpsuse ning mugava kasutajakogemuse.
                Athletica teeb treeningute korraldamise lihtsaks, läbipaistvaks ja tõhusaks.
              </p>
            </div>

          </div>
        </div>
      </div>

      <!-- Kalendri pool -->
      <div class="col-md-6">
        <h4 class="nav-menu">Treeningplaan</h4>

        <div class="calendar-wrapper">
          <Calendar
              :attributes="calendarAttributes"
              @dayclick="handleDayClick"
              :first-day-of-week="2"
          />

          <div v-if="selectedTrainings.length" class="training-list">
            <h3>Treeningud kuupäeval {{ selectedDate }}</h3>
            <ul>
              <p v-for="t in selectedTrainings" :key="t.trainingId" class="mb-2">
                <div><strong>Treening:</strong> {{ t.trainingName }}</div>
                <div><strong>Asukoht:</strong> {{ t.locationName }}</div>
                <div><strong>Aeg:</strong> {{ t.startTime }} - {{ t.endTime }}</div>
              </p>

            </ul>
          </div>
        </div>

        <div style="text-align: right;">
          <p>Kontakt: info@sportportaal.ee</p>
          <p>Treenerite kogemus: 10+ aastat</p>
          <p>Treeningute sagedus: 3x nädalas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrainingDateService from "@/services/TrainingDateService";
import Navigation from "@/navigation/navigation";
import TrainingInfoService from "@/services/training/TrainingInfoService";
import {Calendar} from "v-calendar";

export default {
  components: {Calendar},
  data() {
    return {
      trainingDates: [],
      selectedDate: null,
      selectedTrainings: [],
      trainingInfos: [],
      };
  },
  computed: {
    calendarAttributes() {
      return this.trainingDates
          .filter(td => td.trainingDate && !isNaN(Date.parse(td.trainingDate)))
          .map(td => ({
            key: td.trainingId,
            highlight: {
              backgroundColor: "#FF000020",
              border: "2px solid red",
            },
            dates: new Date(td.trainingDate),
          }));
    }

  },
  methods: {
    async loadTrainingDates() {
      try {
        const response = await TrainingDateService.sendGetAllTrainingDatesRequest();
        this.trainingDates = response.data;
      }
      catch {
        Navigation.navigateToErrorView();
      }

    },

    getTrainingInfos() {
      TrainingInfoService.sendGetTrainingInfoRequest()
          .then(response => {
            this.trainingInfos = response.data;
          })
          .catch(() => Navigation.navigateToErrorView());
    },

    handleDayClick(day) {
      const date = day.date;
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const dayOfMonth = date.getDate().toString().padStart(2, '0');
      const dateStr = `${year}-${month}-${dayOfMonth}`;

      this.selectedDate = dateStr;

      const trainingsOnDate = this.trainingDates.filter(t => {
        const trainingDateOnly = t.trainingDate.includes('T') ? t.trainingDate.split('T')[0] : t.trainingDate;
        return trainingDateOnly === dateStr;
      });

      this.selectedTrainings = trainingsOnDate.map(td => {
        const info = this.trainingInfos.find(info => String(info.trainingId) === String(td.trainingId));
        return {
          trainingId: td.trainingId,
          trainingName: info?.trainingName || "Nimetu treening",
          locationName: info?.locationName || "Tundmatu asukoht",
          startTime: info?.startTime || "Algusaeg puudub",
          endTime: info?.endTime || "Lõpuaeg puudub",
        };
      });
    }

  },

  beforeMount() {
    this.loadTrainingDates();
    this.getTrainingInfos();
  },
};
</script>

