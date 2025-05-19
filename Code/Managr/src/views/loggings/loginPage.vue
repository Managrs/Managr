<template>
  <main>
    <div class="card">
      <header>
        <img src="../../assets/managr_logo.jpg" alt="Org Logo" class="logo" />
        <h2>Login</h2>
      </header>

      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required />

        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required />

        <button type="submit">Login</button>
      </form>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <footer>
        <p>
          Don't have an account?
          <router-link to="/signup">Sign up here</router-link>
        </p>
      </footer>
    </div>
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
  //alert(`Logging in as ${email.value}`);

  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (data) => {
      console.log("Successfully Logged In!");
      const user = data.user;
      console.log("User Info (Auth):", {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        providerId: user.providerId
      });

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("User Info (Firestore):", userData);

        // Store user in Pinia
        userStore.setUser({
          fullName: user.displayName || userData.name || 'No Name',
          email: user.email ?? '',
          avatar: user.photoURL || '/profile.jpg',
          role: userData.role ?? 'client'
        });

        try {
          const backendUrl = import.meta.env.VITE_API_URL;
          const res = await fetch(`${backendUrl}/user/${userStore.email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch user");

        userStore.setUser({
          name: data.user.fullName,
          email: data.user.email,
          avatar: data.user.avatar,
          role: data.user.role,
        });

          console.log("User synced and saved:", data);
        } catch (error) {
          console.error("User sync failed", error);
        }


        // 🔁 Role-based redirect
        if (userData.role === 'client') {
          router.push('/dashboardclient');
        }
        else if (userData.role === 'freelancer') {
          router.push('/dashboardfreelance');
        }
        else if (userData.role === 'admin') {
          router.push('/Admindashboard');
        }
        else {
          router.push('/login');
        }

      } else {
        console.log("No user data found in Firestore.");
        errorMsg.value = "User data not found.";
      }
    })
    .catch((error) => {
      console.log(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid Email";
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
          errorMsg.value = "Something went wrong. Check input.";
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
input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
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

.error {
  color: #e53935;
  margin-top: 0.5rem;
  font-weight: bold;
  text-align: center;
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
</style>
