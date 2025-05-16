import { createApp } from 'vue';
import App from '../src/App.vue';
import { createAuth0 } from '@auth0/auth0-vue';
import { createPinia } from 'pinia';
import router from './router';
import { initializeApp } from "firebase/app";


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const firebaseConfig = {
  apiKey: "AIzaSyA58HtiFVijC0gxKMG8iUmpVtuSF1D8e7E",
  authDomain: "managrs-sd.firebaseapp.com",
  projectId: "managrs-sd",
  storageBucket: "managrs-sd.firebasestorage.app",
  messagingSenderId: "422570607766",
  appId: "1:422570607766:web:e01ae26c566eb4a366eeb7"
};
initializeApp(firebaseConfig);

app.use(
    createAuth0({
      domain: "dev-7jtzu3jbzi1vm4qi.us.auth0.com",
      clientId: "tKIrxFqmYQtpYb47oSNBrz8XRDNNMoXc",

      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'openid profile email'
      }
    })
  );
  app.mount('#app');


