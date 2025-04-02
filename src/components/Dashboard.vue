<template>
    <div>
      <h2>Dashboard</h2>
      <button @click="handleLogout">Logout</button>
    </div>
  </template>
  
  <script>
  import authService from '/src/services/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      return { router };
    },
    methods: {
      handleLogout() {
        authService.logout();
        this.router.push('/login');
      },
    },
  };
  </script>