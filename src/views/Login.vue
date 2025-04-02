<template>
    <div>
        <h1>
            Sign In
        </h1>
        <LoginForm />
    </div>
</template>
  
<script>
import LoginForm from '../components/auth/LoginForm.vue';

export default {
    name: 'Login',
    components: {
        LoginForm,
    }
};
</script>
  
<style scoped></style>