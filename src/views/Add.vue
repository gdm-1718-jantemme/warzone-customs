<template>
  <div>
    <NavBar/>

    <b-container>
      <div class="form-container">
        <b-form @submit.prevent="onSubmit" v-if="true">
          <b-form-group id="input-group-1" label="Naam:" label-for="input-2">
            <b-form-input
              id="input-1"
              v-model="form.name"
              placeholder="Naam of gamertag"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Inschrijvingslink:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.signUpLink"
              type="text"
              placeholder="Discord link of link naar ander platform"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Stream link:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.streamLink"
              placeholder="Volledige https link naar stream"
            ></b-form-input>
          </b-form-group>

          <div>
            <label for="example-datepicker">Kies een datum en de starttijd</label>
            <b-form-datepicker id="example-datepicker" v-model="form.date" :min="new Date()" locale="nl" class="mb-2"></b-form-datepicker>
          </div>

          <div>
            <b-form-timepicker v-model="form.time" locale="nl"></b-form-timepicker>
          </div>

          <b-button class="button-submit" type="submit" variant="primary">
            <p v-if="!isLoading">Opslaan</p> 
            <PulseLoader v-if="isLoading" :color="color" :size="size"/>
          </b-button>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import NavBar from '@/components/NavBar'
import { db } from '@/db/firebase'

export default {
  data() {
    return {
      isLoading: false,
      color: '#FFFFFF',
      size: '10px',
      form: {
        name: "",
        signUpLink: "",
        streamLink: "",
        date: '',
        time: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.isLoading = true
      db.collection('lobbies').doc().set({
        name: this.form.name,
        signUpLink: this.form.signUpLink,
        streamLink: this.form.streamLink,
        date: this.form.date,
        time: this.form.time,
        title: this.form.name + "'s Lobby"
      })
      .then(() => {
        setTimeout(() => {
          this.isLoading = false
          window.location = '/'
        }, 1500);
      })
    }
  },
  components: {
    NavBar,
    PulseLoader,
  }
}
</script>

<style scoped>
.button-submit {
  margin-top: 20px;
  height: 40px;
  width: 100px;
}

.form-container {
  margin: 0 auto;
  width: 50%;
}

@media only screen and (max-width: 700px) {
  .form-container {
    width: 95%;
  }
}
</style>