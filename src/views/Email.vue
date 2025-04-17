<template>
    <div>
        <EmailList />
        <EmailAdd />
    </div>
</template>
  
<script>
import EmailList from '/src/components/email/EmailList.vue';
import EmailAdd from '/src/components/email/EmailAdd.vue';

export default {
    name: 'Email',
    components: {
        EmailList,
        EmailAdd
    }
};
</script>
  
<style scoped></style>