<template>
    <div>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="jid">JID:</label>
                <input type="text" id="jid" v-model="jid" value="{{ jid }}" required />
                <p v-if="error" style="color: red;">{{ error }}</p>
            </div>
            <button type="submit">Next</button>
        </form>
        <p v-if="serverError">{{ serverError }}</p>
    </div>
</template>

<script>
import {api, endpoints} from '/src/services/api';
import { useRouter } from 'vue-router';

export default {
    name: 'LoginForm',
    data() {
        return {
            jid: '',
            error: '', // Removed validation error usage
            serverError: '', // Added to store server error messages
            jid: localStorage.getItem('jid') || ''
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        async handleLogin() { // Renamed back to handleLogin
            this.error = ''; // Clear error
            this.serverError = ''; // Clear server error before making a new request
            try {
                const response = await api.post(
                    endpoints.requestCode,
                    {"jid": this.jid, "type": "message"}
                );

                if (200 >= response.status < 300)  {
                    localStorage.setItem("jid", this.jid);
                    this.router.push({ name: 'LoginConfirm'});
                }
                else {
                    this.serverError = response.data.error || 'An error occurred. Please try again.';
                    return;
                }

            } catch (error) {
                this.serverError = 'Failed to connect to the server. Please try again later.';
                console.error('Error during login:', error);
            }
        }
    }
};
</script>