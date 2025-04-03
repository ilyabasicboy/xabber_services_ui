<template>
  <div>
    {{ basicSubscription }}
    <div>
      <img src="/src/assets/img/favicon.png" alt="Custom Icon" />
    </div>
    <div>
      <div>
        Xabber Account
      </div>
      <div>
        {{ accountData.jid }}
      </div>
    </div>

    <div>
      <div>
        <div>
          Account Type
        </div>
        <div v-if="accountData.managed_host">Hosted by Xabber</div>
        <!-- Todo: fix else extention -->
        <div v-else>Hosted by blablabla</div>
      </div>
      <div>
        <div>
          Plan
        </div>
        <div v-if="basicSubscription?.price">Paid</div>
        <div v-else>Free</div>
      </div>

      <div v-if="basicSubscription?.attributes?.message_retention">
        <div>
          Message Retention
        </div>
        <div>
          {{ basicSubscription.attributes.message_retention }} days
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {api, endpoints} from '/src/services/api';
  import { BASIC_SUBSCRIPTION_GROUP } from '/src/config';

  export default {
    name: 'Home',
    data() {
      return {
        accountData: '',
        basicSubscription: '',
        error: '', // Variable to store any error messages
      };
    },
    methods: {
      async fetchBasicSubscriptionDetails() {
        try {
          const accountServicesResponse = await api.get(endpoints.accountServices);
          const accountServices = accountServicesResponse.data || [];
          const basicSubscriptions = accountServices.filter(service => service?.group === BASIC_SUBSCRIPTION_GROUP);

          if (!basicSubscriptions.length) {
            return {};
          }

          const basicSubscription = basicSubscriptions.reduce((prev, current) => {
            return (prev.weight > current.weight) ? prev : current;
          });
          
          const basicSubscriptionName = basicSubscription?.service_id;

          if (basicSubscriptionName) {
            const basicSubscriptionDetails = await api.get(`${endpoints.serviceList}${basicSubscriptionName}/`);
            return basicSubscriptionDetails.data || {};
          }
          return {};
          
        } catch (error) {
          console.error('Error fetching basic subscription details:', error);
          throw error;
        }
      },
    },
    async created() {
      try {
        const accountDataResponse = await api.get(endpoints.accountData);
        this.accountData = accountDataResponse.data || {};
      } catch (error) {
        this.error = 'Failed to load data. Please try again later.';
        console.error('Error fetching data:', error);
      }

      try {
        this.basicSubscription = await this.fetchBasicSubscriptionDetails();
      } catch (error) {
        this.error = 'Failed to load subscription details. Please try again later.';
      }
    },
  };
</script>

<style scoped>
</style>