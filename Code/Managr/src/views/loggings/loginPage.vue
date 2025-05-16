<template>
  <main>
    <header>
      <h2>Login</h2>
    </header>

    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" required />
      <br>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" required />
      <br>
      <button type="submit">Login</button>
    </form>

    <p v-if="errorMsg"> {{ errorMsg }} </p>

    <footer>
      <p>
        Don't have an account?
        <router-link to="/signup">Sign up here</router-link>
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore'; // Import Firestore methods
import router from '../../router';

import { useUserStore } from '../../stores/userStore';
const userStore = useUserStore();

const db = getFirestore();  // Initialize Firestore

const email = ref('');
const password = ref('');
const errorMsg = ref('');

function login() {
  // Implement login logic
  alert(`Logging in as ${email.value}`);

  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (data) => {
      console.log("Successfully Login!");
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

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);


      if (userDocSnap.exists()) {
        // Log Firestore user data
        console.log("User Info (Firestore):", userDocSnap.data());

        const userData = userDocSnap.data();

        //store user
        userStore.setUser({
          //name: user.displayName ?? 'No Name',
          name: user.displayName || userData.name || 'No Name',
          email: user.email ?? '',
          //avatar: user.photoURL ?? '/profile.jpg',
          avatar: user.photoURL || '/profile.jpg',
          role: userData.role ?? 'user'
        });

      } else {
        console.log("No user data found in Firestore.");
      }


      router.push("/display");
    })
    .catch((error) => {
      console.log(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invaild Email";
          break;

        case "auth/user-not-found":
          errorMsg.value = "No account with email found";
          break;

        case "auth/wrong-password":
          errorMsg.value = "Incorrect Password";
          break;
        case "auth/email-already-in-use":
          errorMsg.value = "This email is already used";
          break;

        default:
          errorMsg.value = "Something went wrong check input";
          break;
      }
    })
}
</script>

<style scoped>
main {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
</style>
