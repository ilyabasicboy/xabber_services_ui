<template>
    <div>
        <div>
            Manage Plan
        </div> 
        <div v-for="subscription in basicSubscriptions" :key="subscription.id">
            <div>
                <div>
                    <div>name</div>
                    <div>{{ subscription.service_id }}</div>
                </div>
                <div>
                    <div>price</div>
                    <div>{{ subscription.price }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import {api, endpoints} from '/src/services/api';

export default {
    name: 'ManagePlan',
    data() {
      return {
        basicSubscriptions: [],
      };
    },
    methods: {
        async fetchSubscriptions (){
            const queryParams = {
                type: 'subscription',
                group: 'basic',
            };
            const basicSubscriptions = await api.get(endpoints.serviceList, { params: queryParams });
            return basicSubscriptions?.data?.results || [];
        }
    },
    async created() {
      // request data from api
      try {
        this.basicSubscriptions = await this.fetchSubscriptions();
      } catch (error) {
        this.error = 'Failed to load basic subscriptions. Please try again later.';
      }
    },
};
</script>
  
<style scoped></style>