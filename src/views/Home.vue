<template>
  <div>
    <NavBar/>
    <div class="table-container">
      <!--<b-table striped hover :items="lobbies">
        <template #cell(streamLink)="data">
            <a :href="data.value"> {{ data.value }}</a>
        </template>
        <template #cell(signUpLink)="data">
            <a :href="data.value"> {{ data.value }}</a>
        </template>
      </b-table>-->

      <!--<b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Date</b-th>
            <b-th>Organiser</b-th>
            <b-th>Time</b-th>
            <b-th>Stream Link</b-th>
            <b-th>Sign Up</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(lobby) in lobbies" :key="lobby.index">
            <b-th>{{ lobby.date }}</b-th>
            <b-th class="text-right">{{ lobby.name }}</b-th>
            <b-td>{{ lobby.time }}</b-td>
            <b-td>{{ lobby.streamLink }}</b-td>
            <b-td>{{ lobby.signUpLink }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>-->

      <h1 class="title">GEPLANDE GAMES: </h1>
      <div class="divider"/>
      <div class="table-row" v-for="(lobby, index) in lobbies" :key="index">
        <div class="date-container" v-if="shouldRenderDate(lobby, index)">
          <h2 class="date">{{ lobby.date }}</h2>
          <div class="legend-container">
            <p>Organiseerder</p>
            <p>Starttijd</p>
            <p>Inschrijving</p>
            <p>Stream</p>
          </div>
        </div>
        <div class="row-container">
          <p>{{ lobby.name }}</p>
          <p>{{ lobby.time }}</p>
          <p><a :href="lobby.signUpLink">{{ lobby.signUpLink }}</a></p>
          <p><a :href="lobby.streamLink">{{ lobby.streamLink }}</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import NavBar from '@/components/NavBar'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['lobbies'])
  },
  components: {
    NavBar
  },
  mounted() {
    this.loadLobbies()
  },
  methods: {
    ...mapActions(['loadLobbies']),
    shouldRenderDate: function(lobby, index) {
      if(this.lobbies[index - 1])
        if(lobby.date !== this.lobbies[index - 1].date) return true
        else return false
      else return true
    }
  }
}
</script>

<style>
.title {
  font-size: 40px;
  font-family: 'Oswald', sans-serif;
  text-align: left;
}

.table-container {
  margin: 0 auto;
  width: 70%;
}

.table-row {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.date-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.date-container h2 {
  color:  rgb(59, 59, 59);
  align-self: flex-start;
}

.divider {
  width: 100%;
  height: 1px;
  background-color:  rgba(59, 59, 59, 0.5);
  margin-bottom: 10px;
}

.row-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.row-container p {
  width: 25%;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 10px;
}

.legend-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color:  rgba(59, 59, 59, 1);;
}

.legend-container p {
  width: 25%;
  margin: 0;
  text-align: left;
  color: white;
}
</style>