import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue'

createApp(App).use(
    createAuth0({
      domain: "dev-7jtzu3jbzi1vm4qi.us.auth0.com",
      clientId: "tKIrxFqmYQtpYb47oSNBrz8XRDNNMoXc",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ).mount('#app');

