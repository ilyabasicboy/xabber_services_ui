<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="code">Code:</label>
                <input type="text" id="code" v-model="code" required />
            </div>
            <button type="submit">Confirm</button>
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
import { API_BASE_URL } from '@/config';

export default {
    name: 'ConfirmCode',
    props: {
        jid: {
            type: String,
            required: true // Ensure 'jid' is passed as a required prop
        }
    },
    data() {
        return {
            code: '', // Stores the code input value
            serverError: '' // Stores server error messages
        };
    },
    methods: {
        async handleSubmit() {
            this.serverError = ''; // Clear server error before making a new request
            try {
                const response = await fetch(`${API_BASE_URL}/xabber_auth_jwt/xmpp_auth/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "jid": this.jid, "code": this.code })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    this.serverError = errorData.error || 'An error occurred. Please try again.';
                    return;
                }

                console.log('Request sent successfully.');
            } catch (error) {
                this.serverError = 'Failed to connect to the server. Please try again later.';
                console.error('Error during login:', error);
            }
        }
    }
};
</script>