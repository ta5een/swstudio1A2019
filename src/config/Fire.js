import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDX-KA5IcmpfcwC26by5dksCrtiQcfqBwA",
  authDomain: "swstudio1a2019.firebaseapp.com",
  databaseURL: "https://swstudio1a2019.firebaseio.com",
  projectId: "swstudio1a2019",
  storageBucket: "swstudio1a2019.appspot.com",
  messagingSenderId: "758333657659"
};

const fire = firebase.initializeApp(config);
export default fire;