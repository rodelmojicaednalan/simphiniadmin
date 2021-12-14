<template>
  <div>
    <b-row>
      <b-col>
        <b-tabs>
          <b-tab no-body title="Client List">
            <div class="table-responsive">
              <BootstrapTable :counter="true" :hideHeader="false" :items="items" :fields="header" :with-avatar="false" />
            </div>
          </b-tab>
          <b-tab no-body title="Statistical Chart">
            <apexchart height="450px" width="100%" type="bar" :options="options" :series="series"></apexchart>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BootstrapTable from '@/components/Modules/BootstrapTable';
import VueApexCharts from 'vue-apexcharts';
import axios from 'axios';
export default {
  components: {
    BootstrapTable,
    'apexchart': VueApexCharts
  },
  data() {
    return {
      header: [
        {
          key: 'index',
          label: '#',
          class: 'text-center'
        },
        {
          key: 'name',
          label: 'Client Name'
        },
        {
          key: 'subscription',
          label: 'Subscription'
        },
        {
          key: 'storage',
          label: 'Storage',
          class: 'text-center'
        },
        {
          key: 'transaction',
          label: 'Transactions',
          class: 'text-center'
        }
      ],
      items: [],
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      },
      series: [
        {
          name: 'Number of Clients',
          data: [11, 9, 7, 8, 14, 11, 9, 15, 12, 9, 14, 10]
        },
        {
          name: 'Procedures',
          data: [25, 43, 75, 53, 39, 20, 75, 81, 42, 38, 72, 84]
        }
      ]
    }
  },
  mounted() {
    axios.get('admin/dashboard').then(response => {
      this.items = response.data;
      this.$emit('client-count', response.data.length);
    })
  }
}
</script>

<style scoped>
.mb-0 {
  margin-bottom: 0;
}
</style>