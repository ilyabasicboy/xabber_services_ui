<template>
    <div>
        <h1>
            Confirm code
        </h1>
        <ConfirmCode />
    </div>
</template>
  
<script>
import ConfirmCode from '/src/components/auth/ConfirmCode.vue';

export default {
    name: 'LoginConfirm',
    components: {
        ConfirmCode,
    },
    created() {
        if (!localStorage.getItem('jid')) {
            this.$router.push({ name: 'Login' });
        }
    },
};
</script>
  
<style scoped></style>