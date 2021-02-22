import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyC001FSTCmQzrTUdvgriQFE0dGmeZ_U_eM",
  authDomain: "warzone-customs.firebaseapp.com",
  projectId: "warzone-customs",
  storageBucket: "warzone-customs.appspot.com",
  messagingSenderId: "549466471326",
  appId: "1:549466471326:web:469e5123b90f568069f48f",
  measurementId: "G-QHHD5KV4CX"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()

// collection references
const lobbiesCollection = db.collection('lobbies')

// export utils/refs
export {
  db,
  lobbiesCollection
}