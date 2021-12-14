<template>
  <div class="main-content" style="min-height: 530px;">
    <b-row>
      <b-col cols="3">
        <h3>Analytics</h3>
        <div class="pb-3">
          <b-form-select v-model="selected" :options="clients" class="mt-3"></b-form-select>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <b-card-text>
            <apexchart height="500px" width="100%" type="line" :options="options" :series="series"></apexchart>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
export default {
  name: 'Analytics',
  components: {
    'apexchart': VueApexCharts
  },
  data() {
    return {
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
          name: 'Analytics',
          data: [11, 9, 7, 8, 14, 11, 9, 15, 12, 9, 14, 10]
        }
      ],
      selected: null,
      clients: [
        { value: null, text: 'Select Client' },
        { value: '1', text: 'Sapere Marketing LLC' },
        { value: '2', text: 'Chesbro' }
      ]
    }
  }
}
</script>

<style>
b-form-select {
  width: auto;
}
</style>