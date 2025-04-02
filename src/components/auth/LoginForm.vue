<template>
    <div>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="jid">JID:</label>
                <input type="text" id="jid" v-model="jid" required />
                <p v-if="error" style="color: red;">{{ error }}</p>
            </div>
            <button type="submit">Next</button>
        </form>
        <p v-if="serverError" ">{{ serverError }}</p>
    </div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
    name: 'LoginForm',
    data() {
        return {
            jid: '',
            error: '', // Removed validation error usage
            serverError: '' // Added to store server error messages
        };
    },
    methods: {
        async handleLogin() { // Renamed back to handleLogin
            this.error = ''; // Clear error
            this.serverError = ''; // Clear server error before making a new request
            try {
                const response = await fetch(`${API_BASE_URL}/xabber_auth_jwt/xmpp_code_request/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "jid": this.jid, "type": "message" })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    this.serverError = errorData.error || 'An error occurred. Please try again.';
                    return;
                }

                console.log('Request sent successfully.');
                this.$emit('login-success', this.jid);
            } catch (error) {
                this.serverError = 'Failed to connect to the server. Please try again later.';
                console.error('Error during login:', error);
            }
        }
    }
};
</script>