<template>
    <main>
        <form @submit.prevent="saveChanges">
            <h2>User Settings</h2>

            <!-- Profile Picture -->
            <fieldset>
                <legend>Profile Picture</legend>

                <!-- File Input Section -->
                <label>
                    Upload New Picture:
                    <input type="file" ref="fileInput" @change="onFileChange" hidden />
                </label>

                <!-- Dropzone Section -->
                <div class="dropzone" @dragover.prevent @drop.prevent="onDrop" @click="triggerFileInput">
                    <p v-if="!previewUrl">Drag & Drop an Image here or click to select</p>
                    <p v-else>Drop the image or click to update</p>
                </div>

                <!-- Preview Section -->
                <figure v-if="previewUrl">
                    <img :src="previewUrl" alt="Profile Preview" />
                    <figcaption>Preview</figcaption>
                </figure>
            </fieldset>

            <!-- Username -->
            <fieldset>
                <legend>Username</legend>
                <label for="username">Change Username:</label>
                <input id="username" type="text" v-model="form.username" />
            </fieldset>

            <!-- Actions -->
            <section class="actions">
                <button type="submit" class="primary">Save Changes</button>
                <button type="button" class="secondary" @click="discardChanges">Discard Changes</button>
            </section>
        </form>
    </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import { useUserStore } from '../../stores/userStore';
const userStore = useUserStore();

const db = getFirestore();

const originalData = {
    username: '',
    profilePic: null
}

const form = reactive({
    username: originalData.username,
    profilePic: originalData.profilePic
})

const previewUrl = ref(null)

// Handle file selection via input
const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        form.profilePic = file
        previewUrl.value = URL.createObjectURL(file)
    }
}

// Handle file drop into dropzone
const onDrop = (e) => {
    const file = e.dataTransfer.files[0]
    if (file) {
        form.profilePic = file
        previewUrl.value = URL.createObjectURL(file)
    }
}

// Trigger the file input when the dropzone is clicked
const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]')
    fileInput.click()
}

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Handle saving the changes (for now just show alert)
const saveChanges = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        alert('You must be logged in.');
        return;
    }

    try {
        const userDocRef = doc(db, 'users', user.uid);
        const dataToSave = {
            username: form.username
        };

        if (form.profilePic) {
            try {
                const base64String = await convertToBase64(form.profilePic);
                dataToSave.profilePic = base64String; // Now safe to assign
            } catch (err) {
                console.warn('Could not convert image to base64:', err);
            }
        }

        await setDoc(userDocRef, dataToSave, { merge: true });

        alert('Changes saved successfully.');

        // Update local userStore
        userStore.setUser({
            name: form.username,
            email: user.email,
            avatar: dataToSave.profilePic || originalData.profilePic || '',
            role: userStore.role
        });

    } catch (err) {
        console.error('Error saving changes:', err);
        alert('Failed to save changes.');
    }
};



// Discard any changes made
const discardChanges = () => {
    form.username = originalData.username;
    form.profilePic = null;
    previewUrl.value = originalData.profilePic || null;
}


onMounted(async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
        const userData = userDoc.data();

        form.username = userData.username || '';
        originalData.username = form.username;

        if (userData.profilePic) {
            previewUrl.value = userData.profilePic;
            originalData.profilePic = userData.profilePic; // Save the actual URL
        }

    }
});

</script>

<style scoped>
:root {
    --white: #ffffff;
    --black: #111111;
    --orange: #ff6f00;
    --navy: #1a1f36;
    --border: #2e2e3e;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--black);
    padding: 2rem;
}

form {
    background-color: var(--navy);
    color: var(--white);
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: 'Inter', sans-serif;
}

h2 {
    margin: 0;
    font-size: 1.8rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
    color: var(--orange);
}

fieldset {
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 1rem;
}

legend {
    color: var(--orange);
    padding: 0 0.5rem;
    font-weight: bold;
}

input[type="text"] {
    margin-top: 0.5rem;
    padding: 0.65rem;
    background-color: white;
    border: 1px solid #444c66;
    border-radius: 0.4rem;
    color: var(--white);
    width: 100%;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s ease, background-color 0.3s ease;
}

input[type="text"]:focus {
    outline: none;
    border-color: var(--orange);
    background-color: white;
}

input[type="file"] {
    display: none;
    /* Hide the file input */
}

.dropzone {
    margin-top: 1rem;
    padding: 1rem;
    border: 2px solid var(--orange);
    border-radius: 0.5rem;
    background-color: white;
    color: var(--white);
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dropzone:hover {
    background-color: #3a435c;
}

figure {
    margin-top: 1rem;
    text-align: center;
}

img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--orange);
}

figcaption {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--white);
}

.actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

button.primary {
    background-color: var(--orange);
    color: var(--white);
}

button.primary:hover {
    background-color: #e65c00;
}

button.secondary {
    background-color: transparent;
    color: var(--white);
    border: 1px solid var(--white);
}

button.secondary:hover {
    background-color: var(--white);
    color: var(--black);
}
</style>
