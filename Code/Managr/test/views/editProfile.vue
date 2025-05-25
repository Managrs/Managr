<template>
  <section class="container">
    <h1> Update Your Profile </h1>

    <section v-if="!imageSrc">
      <form>
        <input
          type="file"
          id="media"
          accept="image/*"
          @change="handleFileUpload"
        />
      </form>
      <section>
        <p>Upload your profile here.</p>
      </section>
    </section>

    <section v-if="imageSrc" class="image-preview">
      <section class="image-container">
        <img :src="imageSrc" alt="Image Preview" class="image-style" />
        <section class="cross-icon">
          <button class="Remove" @click="removeImage"> Discard </button>
        </section>
      </section>
      <p class="text-center">{{ selectedFile?.name }}</p>

      <button class="Remove" @click="uploadAvatar" style="margin-top: 20px;">
        Upload Avatar
      </button>

      <p v-if="responseMessage">{{ responseMessage }}</p>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from '../stores/userStore';

export default defineComponent({
  name: "editprofile",
  setup() {
    const form = ref<{ media: string | null }>({
      media: null,
    });

    const imageSrc = ref<string | null>(null);
    const selectedFile = ref<File | null>(null);
    const responseMessage = ref<string>("");

    const userStore = useUserStore();

    const handleFileUpload = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      selectedFile.value = file;
      imageSrc.value = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = () => {
        form.value.media = reader.result as string;
        console.log("Base64 string:", form.value.media);
      };
      reader.readAsDataURL(file);
    };

    const removeImage = () => {
      imageSrc.value = null;
      selectedFile.value = null;
      form.value.media = null;
      responseMessage.value = "";
    };

    const uploadAvatar = async () => {
      if (!form.value.media) {
        responseMessage.value = "Please select an image first.";
        return;
      }

      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${backendUrl}/editprofile/${userStore.email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar : form.value.media,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          responseMessage.value = "Avatar updated successfully!";
        } else {
          responseMessage.value = "Error: " + (data.error || "Unknown error");
        }
      } catch (err: any) {
        responseMessage.value = "Request failed: " + err.message;
      }

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
    };

    return {
      form,
      imageSrc,
      selectedFile,
      handleFileUpload,
      removeImage,
      uploadAvatar,
      responseMessage,
    };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.Remove {
  color: #ffffff;
  background: #000000;
  padding: 0.55rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
}
.Remove:hover {
  background: #e77e23;
  color: #ffffff;
}

.image-preview {
  margin-top: 20px;
}

.image-container {
  position: relative;
  display: inline-block;
}

.image-style {
  width: 200px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.cross-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.text-center {
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  max-width: 200px;
  word-break: break-word;
}
</style>
