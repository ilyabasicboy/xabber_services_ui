<template>
    <div>
        <div>
            Email list
        </div>
        <div>
            <div v-for="email in emailList" :key="email.id">
                <div>
                    <div>
                        Email:
                    </div>
                    <div>
                        {{ email.email }}
                    </div>
                </div>
                <div>
                    <div>
                        Verified:
                    </div>
                    <div>
                        {{ email.verified }}
                    </div>
                </div>
                <button @click="deleteEmail(email.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import {api, endpoints} from '/src/services/api';

export default {
    name: 'Email',
    data() {
      return {
        emailList: [],
      };
    },
    methods: {
        async fetchEmailList (){
            const emailList = await api.get(endpoints.emailList);
            return emailList?.data?.results || [];
        },
        async deleteEmail(emailId) {
            try {
                await api.delete(`${endpoints.emailList}${emailId}/`);
                window.location.reload();
            } catch (error) {
                console.error('Failed to delete email:', error);
                alert('Failed to delete email. Please try again.');
            }
        },
    },
    async created() {
      // request data from api
      try {
        this.emailList = await this.fetchEmailList();
      } catch (error) {
        this.error = 'Failed to load email list. Please try again later.';
      }
    },
};
</script>