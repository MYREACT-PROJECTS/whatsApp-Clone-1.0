// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWsRoO2FNO-VWxYd1GOM0Q_6OzdB1TfN4",
  authDomain: "whatsapp-clone-362d1.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-362d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whatsapp-clone-362d1",
  storageBucket: "whatsapp-clone-362d1.appspot.com",
  messagingSenderId: "450583756881",
  appId: "1:450583756881:web:d964aef7e2c75ae8d7b870",
  measurementId: "G-5G28Z3RWMG"
};
  

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider(); 


 //export default db; 

  export {auth,provider,db};




