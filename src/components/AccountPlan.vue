<template>
    <div>
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
              <!-- Todo: fix else condition -->
              <div v-else>Hosted by blablabla</div>
            </div>

            <div>
              <div>
                  Plan
              </div>
              <div v-if="basicSubscription?.price > 0">Paid</div>
              <div v-else>Free</div>
            </div>

            <div>
              <div>
                Expires
              </div>
              <div v-if="basicAccountSubscription?.expires">
                {{ formatDate(basicAccountSubscription.expires) }}
              </div>
            </div>

            <div v-if="basicSubscription?.attributes?.message_retention">
              <div>
                  Message Retention
              </div>
              <div>
                  {{ basicSubscription.attributes.message_retention }} days
              </div>
            </div>

            <div v-if="basicSubscription?.attributes?.quota">
              <div>
                  File Storage
              </div>
              <div>
                  {{ (basicSubscription.attributes.quota / 1024).toFixed(2) }} GB
              </div>
            </div>

            <router-link :to="{ name: 'ManagePlan' }">Manage Plan</router-link>
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
        basicAccountSubscription: '',
        error: '', // Variable to store any error messages
      };
    },
    methods: {
      async fetchBasicAccountSubscription(){
        const accountServicesResponse = await api.get(endpoints.accountServices);
        const accountServices = accountServicesResponse.data || [];
        const basicSubscriptions = accountServices.filter(service => service?.group === BASIC_SUBSCRIPTION_GROUP);

        if (!basicSubscriptions.length) {
          return {};
        }

        const basicSubscription = basicSubscriptions.reduce((prev, current) => {
          return (prev.weight > current.weight) ? prev : current;
        });
        return basicSubscription || {}
      },
      async fetchBasicSubscription(basicAccountSubscription) {
        try {
          const basicSubscriptionName = basicAccountSubscription?.service_id;

          if (basicSubscriptionName) {
            const basicSubscription = await api.get(`${endpoints.serviceList}${basicSubscriptionName}/`);
            return basicSubscription.data || {};
          }
          return {};
          
        } catch (error) {
          console.error('Error fetching basic subscription details:', error);
          throw error;
        }
      },
      formatDate(value) {
        if (!value) return '';
        try {
          const date = new Date(value);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return `${day}.${month}.${year} ${hours}:${minutes}`;
        } catch (error) {
          console.error('Error formatting date:', error);
          return value; // Return original value if there's an error
        }
      }
    },
    async created() {
      // request data from api
      try {
        const accountDataResponse = await api.get(endpoints.accountData);
        this.accountData = accountDataResponse.data || {};
      } catch (error) {
        this.error = 'Failed to load data. Please try again later.';
        console.error('Error fetching data:', error);
      }

      try {
        this.basicAccountSubscription = await this.fetchBasicAccountSubscription();
      } catch (error) {
        this.error = 'Failed to load basic account subscription. Please try again later.';
      }

      try {
        this.basicSubscription = await this.fetchBasicSubscription(this.basicAccountSubscription);
      } catch (error) {
        this.error = 'Failed to load basic subscription. Please try again later.';
      }
    },
  };
</script>