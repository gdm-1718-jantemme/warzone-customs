<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  name: 'App',
  computed: {
    ...mapState(['lobbies'])
  },
  created() {
    if(!this.lobbies.length) this.loadLobbies()
  },
  methods: mapActions(['loadLobbies'])
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap');

#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
