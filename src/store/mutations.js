import { db } from '@/db/firebase'

const filterByDate = (obj) => {
  if (new Date(obj.date + 'T' + obj.time) >= new Date()) return true
  else return false
}

export default {
  loadLobbies: (state) => {
    db.collection("lobbies").get()
    .then((snapshot) => {
      let lobbies = snapshot.docs.map(doc => doc.data())

      lobbies  = lobbies.filter(filterByDate)

      state.lobbies = lobbies.sort(function(a,b){
        if (a.date === b.date) return a.time.localeCompare(b.time);
        else return  new Date(a.date) - new Date(b.date);
      });
    })
    .catch((error) => {
      console.log("Error getting cached document:", error);
      state.lobbies = []
    })
  }
};
