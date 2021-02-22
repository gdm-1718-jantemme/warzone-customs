<template>
  <div>
    <NavBar/>
    <div class="table-container">
      <b-table striped hover :items="lobbies">
        <template #cell(streamLink)="data">
            <a :href="data.value"> {{ data.value }}</a>
        </template>
        <template #cell(signUpLink)="data">
            <a :href="data.value"> {{ data.value }}</a>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { db } from '@/db/firebase'

export default {
  data() {
    return {
      lobbies: [],
    }
  },
  components: {
    NavBar
  },
  mounted() {
    db.collection("lobbies").get()
    .then((snapshot) => {
      console.log(snapshot.docs.map(doc => doc.data()));
      this.lobbies = snapshot.docs.map(doc => doc.data())
    })
    .catch((error) => {
      console.log("Error getting cached document:", error);
      this.lobbies = []
    })
  },
}
</script>

<style>
.table-container {
  margin: 0 auto;
  width: 70%;
}
</style>