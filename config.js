const firebase=require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyDOEvRtfYAA59gvoamyt0XuKE1IGNOkshw",
    authDomain: "nodejsserver-93e89.firebaseapp.com",
    projectId: "nodejsserver-93e89",
    storageBucket: "nodejsserver-93e89.appspot.com",
    messagingSenderId: "842988673591",
    appId: "1:842988673591:web:3a6aed60c91bac5858bdb2"
  };

  firebase.intializeApp(firebaseConfig)
  const db=getFirestore(app);
