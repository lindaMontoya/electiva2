import * as firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAV2xyg37_IJyaENTC4Z7Eo4CZ7oQVQ4Yk',
  authDomain: 'cinema-react-adec8.firebaseapp.com',
  databaseURL: 'https://cinema-react-adec8.firebaseio.com',
  projectId: 'cinema-react-adec8',
  storageBucket: '',
  messagingSenderId: '360172286235',
  appId: '1:360172286235:web:777f8975c124ee4b',
});

export default app;
