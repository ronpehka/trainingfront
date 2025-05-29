<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Vasak tulp: kaart -->
      <div class="col-md-6">
        <div class="card mb-3" style="max-width: 600px;">
          <img src="https://korvpall100.ee/bw_client_files/korvpall100/public/img/Image/ESMF201_96-C561_1.jpg" class="card-img-top" alt="trennipilt">
          <div class="card-body text-start">
            <h5 class="card-title">Meeskonnasport massidesse!</h5>

            <p class="card-text">
              Meie veebiplatvorm ühendab spordihuvilisi kvaliteetsete pallimängude treeningutega Tallinnas. Portaalist leiad treeninguvõimalused pesapallis, korvpallis ja jalgpallis, mis on mõeldud nii koolinoortele kui ka täiskasvanutele – olenemata tasemest.
            </p>

            <p class="card-text">
              Treeningud toimuvad kolmes kaasaegses treeningsaalis, mis asuvad erinevates Tallinna linnaosades – et igaühel oleks lihtne ja mugav leida sobiv asukoht ja aeg.
            </p>

            <p class="card-text">
              Registreeru treeningule, vaata vabade kohtade seisu reaalajas ning hoia end vormis lõbusal ja professionaalsel moel!
            </p>

            <p class="card-text">
              <small class="text-body-secondary">Viimati uuendatud mai 2025</small>
            </p>
          </div>
        </div>
      </div>

      <!-- Parem tulp: muu info -->
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
                <li v-for="t in selectedTrainings" :key="t.id">
                  {{ t.time }} – {{ t.title }} @ {{ t.location }}
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
export default {
  data() {
    return {
      trainings: [
        {
          id: 1,
          date: '2025-06-01',
          time: '17:00',
          title: 'Jalgpalli trenn',
          location: 'Staadion A',
        },
        {
          id: 2,
          date: '2025-06-01',
          time: '19:00',
          title: 'Tugevustreening',
          location: 'Spordiklubi X',
        },
        {
          id: 3,
          date: '2025-06-03',
          time: '18:00',
          title: 'Kergejõustiku trenn',
          location: 'Staadion B',
        },
      ],
      selectedDate: null,
      selectedTrainings: [],
    }
  },
  computed: {
    calendarAttributes() {
      // Märgime päevad, millel on treeningud (punane ring ümber)
      const uniqueDates = [
        new Set(this.trainings.map((t) => t.date)),
      ]
      return uniqueDates.map((date) => ({
        key: date,
        highlight: {
          backgroundColor: '#FF000020',
          border: '2px solid red',
        },
        dates: new Date(date),
      }))
    },
  },
  methods: {
    handleDayClick(day) {
      const dateStr = day.date.toISOString().split('T')[0]
      this.selectedDate = dateStr
      this.selectedTrainings = this.trainings
          .filter(t => t.date === dateStr)
          .sort((a, b) => a.time.localeCompare(b.time));
    },
  },
}
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