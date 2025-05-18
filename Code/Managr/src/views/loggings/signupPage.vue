<template>
  <main>
    <div class="card">
      <header>
        <img src="../../assets/managr_logo.jpg" alt="Org Logo" class="logo" />
        <h2>Sign Up</h2>
      </header>

      <form @submit.prevent="signup">

        <label for="name">Name:</label>
        <input id="name" type="text" v-model="name" required />

        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required />

        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required />

        <fieldset>
          <legend>Select Role:</legend>
          <label>
            <input type="radio" value="client" v-model="role" />
            Client
          </label>
          <label>
            <input type="radio" value="freelancer" v-model="role" />
            Freelancer
          </label>
        </fieldset>

        <button type="submit">Sign Up</button>
      </form>

      <footer>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <p>
          Already have an account? <router-link to="/login">Login here</router-link>
        </p>
      </footer>
    </div>
  </main>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import router from '../../router';

import { useUserStore } from '../../stores/userStore';
const userStore = useUserStore();


const db = getFirestore();

const email = ref('');
const name = ref('');
const password = ref('');
const role = ref('user');
const errorMsg = ref('');


function signup() {
  //alert(`Signing up as ${email.value} with role: ${role.value}`);

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (data) => {
      console.log("Successfully registering!");
      const user = data.user;
      console.log("User Info:", {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        providerId: user.providerId
      });

      // Store user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name.value,
        role: role.value,
        createdAt: new Date()
      });

      // Store user in Pinia store
      userStore.setUser({
        name: user.displayName ?? name.value,
        email: user.email ?? '',
        avatar: user.photoURL ?? '/profile.jpg',
        role: role.value
      });


      const backendUrl = import.meta.env.VITE_API_URL;
      console.log("Got back end staring post");

      const payload = {
        fullName: user.displayName,
        email: user.email,
        avatar: user.photoURL || '/profile.jpg',
        role: role.value || "client",
      };
      console.log(`Payload: ${payload}`);

      try {
        console.log("Beining post");

        const res = await fetch(`${backendUrl}/auth/registerOrUpdateUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"/*,
            Authorization: `Bearer ${await getAccessTokenSilently()}`*/
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("User synced and saved:", data);
      } catch (error) {
        console.error("User sync failed", error);
      }


      // Redirect based on role
      if (role.value === 'client') {
        router.push('/dashboardclient');
      }
      else if (role.value === 'freelancer') {
        router.push('/dashboardfreelance');
      }
      else if (role.value === 'admin') {
        router.push('/Admindashboard');
      }
      else {
        router.push('/login');
      }
    })
    .catch((error) => {
      console.log(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid Email";
          break;

        case "auth/user-not-found":
          errorMsg.value = "No account with this email found";
          break;

        case "auth/wrong-password":
          errorMsg.value = "Incorrect Password";
          break;

        case "auth/email-already-in-use":
          errorMsg.value = "This email is already in use";
          break;

        default:
          errorMsg.value = "Something went wrong. Please check your input.";
          break;
      }
    });
}

</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;
}

.card {
  background-color: #fff;
  border: 2px solid #f57c00;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 0.5rem;
}

h2 {
  color: #f57c00;
}

label {
  display: block;
  margin-top: 1rem;
  color: #212121;
  font-weight: bold;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

fieldset {
  margin-top: 1rem;
  border: none;
  padding: 0;
}

fieldset legend {
  font-weight: bold;
  color: #212121;
  margin-bottom: 0.5rem;
}

fieldset label {
  margin-right: 1rem;
  font-weight: normal;
}

button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #f57c00;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #ef6c00;
}

footer {
  margin-top: 1.5rem;
  text-align: center;
  color: #212121;
}

footer a {
  color: #f57c00;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

.error {
  color: #e53935;
  margin-top: 0.5rem;
  font-weight: bold;
}
</style>
