<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="code">Code:</label>
                <input type="text" id="code" v-model="code" required />
            </div>

            <div>
                <router-link :to="{ name: 'Login' }">Back</router-link>
                <button type="submit">Confirm</button>
            </div>
            
        </form>
        
        <p v-if="serverError">{{ serverError }}</p>
    </div>
    <div>
        XMPP code was sent to {{ jid }},
        if you didn't receive XMPP code, probably, you are blocked by anti-spam protection.
        Try adding info@xabber.com to your XMPP account contacts and resend the code.
        If that does not help, please, contact support.
    </div>
</template>

<script>
import {api, endpoints} from '/src/services/api';
import authService from '/src/services/auth';
import { useRouter } from 'vue-router';

export default {
    name: 'ConfirmCode',
    data() {
        return {
            code: '', // Stores the code input value
            serverError: '', // Stores server error messages
            jid: localStorage.getItem('jid') || ''
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        async handleSubmit() {
            this.serverError = ''; // Clear server error before making a new request
            try {
                const response = await api.post(
                    endpoints.confirmCode,
                    { "jid": this.jid, "code": this.code }
                );

                if (200 >= response.status < 300) {
                    authService.setToken(response.data.token);
                    this.router.push({name: 'Home'});
                }
                else {
                    this.serverError = response.data.error || 'An error occurred. Please try again.';
                    return;
                }
            } catch (error) {
                this.serverError = 'Failed to connect to the server. Please try again later.';
                console.error('Error during login:', error);
            }
        },
        goToLogin() {
            this.router.push({ name: 'Login' });
        }
    }
};
</script>