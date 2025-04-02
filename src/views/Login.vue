<template>
    <div>
        <h1>
            Sign In
        </h1>
        <LoginForm v-if="!isLoginSuccessful" @login-success="handleLoginSuccess" />
        <ConfirmCode v-if="isLoginSuccessful" :jid="jid"/>
    </div>
</template>
  
<script>
import LoginForm from '../components/auth/LoginForm.vue';
import ConfirmCode from '../components/auth/ConfirmCode.vue';

export default {
    name: 'Login',
    components: {
        LoginForm,
        ConfirmCode
    },
    data() {
        return {
            isLoginSuccessful: false,
            jid: ''
        };
    },
    methods: {
        handleLoginSuccess(jid) {
            this.isLoginSuccessful = true;
            this.jid = jid;
        }
    }
};
</script>
  
<style scoped></style>