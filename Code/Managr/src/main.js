import { createApp } from 'https://unpkg.com/vue@3/dist/vue.global.js';
import App from '../src/App.vue';
import { createAuth0 } from '@auth0/auth0-vue';
import router from './router';
const app = createApp(App);
app.use(router);
app.use(createAuth0({
    domain: "dev-7jtzu3jbzi1vm4qi.us.auth0.com",
    clientId: "tKIrxFqmYQtpYb47oSNBrz8XRDNNMoXc",
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: `https://dev-7jtzu3jbzi1vm4qi.us.auth0.com/api/v2/`,
        scope: 'openid profile email'
    }
}));
app.mount('#app');
