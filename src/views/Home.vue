<template>
  <AccountPlan />

  <div>
    <div>
      <div>
        Storage
      </div>
      <div>
        Message History Retention
        <span>Keep messages longer that the default 30 days</span>
      </div>
      <div>
        Cloud Storage
        <span>Manage cloud storage for sent and received files </span>
      </div>
    </div>
    
    <div>
      <div>
        Security
      </div>

      <router-link :to="{ name: 'RecoveryEmail' }">
        Account Recovery Email
        <span>Helps you regain access to your account</span>
      </router-link>
      <div>
        2-factor authentication
        <span>Helps you regain access to your account</span>
      </div>
    </div>
  </div>

  <!-- Test button -->
  <button @click="handleLogout">Logout</button>
</template>

<script>
  import AccountPlan from '../components/AccountPlan.vue';
  import authService from '/src/services/auth';
  import { useRouter } from 'vue-router';

  export default {
      name: 'Home',
      components: {
        AccountPlan,
      },
      setup() {
        const router = useRouter();
        return { router };
      },
      methods: {
        handleLogout() {
          authService.logout();
          this.router.push({name: 'Login'});
        },
      }
  };
</script>

<style scoped>
</style>