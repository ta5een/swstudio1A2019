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

const wait = ms => new Promise(callback => setTimeout(callback, ms));

const retryOperation = (fn, times, delay) => {
  return new Promise((resolve, reject) => {
    return fn()
      .then(resolve)
      .catch(reason => {
        if (times - 1 > 0) {
          return wait(delay)
            .then(retryOperation.bind(null, fn, times - 1, delay))
            .then(resolve)
            .catch(reject);
        }

        return reject(reason);
      });
  })
}

const maximumAttempts = 5;

const getCurrentUser = () => new Promise((resolved, rejected) => {
  let currentUser = fire.auth().currentUser;
  if (currentUser) {
    return resolved(currentUser);
  } else {
    console.log("Unable to resolve current user. Trying again...");
    return rejected("Timeout – Failed to get current user on time.");
  }
});

export const attemptGetCurrentUser = (attempts=maximumAttempts) => {
  return retryOperation(getCurrentUser, attempts, 1000);
}