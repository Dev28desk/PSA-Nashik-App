


import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBu6-8FLc1eGaaBeetVyvBcEX5AoL1xGqQ",
  authDomain: "psa-nashik-app.firebaseapp.com",
  projectId: "psa-nashik-app",
  storageBucket: "psa-nashik-app.appspot.com",
  messagingSenderId: "610461935332",
  appId: "1:610461935332:web:ed897ed463933072196ef1",
  measurementId: "G-M9S68NSPKR"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)


