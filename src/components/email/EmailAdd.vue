<template>
    <div>
      <form @submit.prevent="submitEmail">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email"
        />
        <button type="submit">Add Email</button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
 import {api, endpoints} from '/src/services/api';
  
  export default {
    data() {
      return {
        email: "",
        successMessage: "",
        errorMessage: "",
      };
    },
    methods: {
      async submitEmail() {
        try {
          const response = await api.post(endpoints.emailList, { email: this.email });
          window.location.reload();
        } catch (error) {
          this.successMessage = "";
          this.errorMessage = "Failed to add email. Please try again.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>