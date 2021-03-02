import { db } from '@/db/firebase'

export default {
  loadLobbies: ({ commit }) => {
    db.collection("lobbies").get()
    .then((snapshot) => {
      let lobbies = snapshot.docs.map(doc => doc.data())
      commit("loadLobbies", lobbies)
    })
    .catch((error) => {
      console.log("Error getting cached document:", error);
    })
  }
};
