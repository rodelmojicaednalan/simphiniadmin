<template>
  <div class="main-content" style="min-height: 530px;">
    <h3>Revenues</h3>
    <b-row>
      <b-col>
        <div class="pb-3 d-md-flex">
          <div class="flex-fill">
            <date-range-picker
              ref="picker"
              :opens="opens"
              :locale-data="{ firstDay: 1, format: 'mm/dd/yyyy' }"
              :showWeekNumbers="true"
              :showDropdowns="true"
              v-model="dateRange"
              class="date-picker-field"
            >
            </date-range-picker>
          </div>
          <div class="flex-fill">
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </div>
          <div class="report-btn flex-fill">
            <b-button variant="primary" size="lg">Generate Report</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <div class="table-responsive">
            <BootstrapTable :counter="true" :hideHeader="false" :items="items" :fields="header" :with-avatar="false" />
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import BootstrapTable from '@/components/Modules/BootstrapTable';
export default {
  components: { 
    DateRangePicker,
    BootstrapTable
  },
  data() {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 6)
    return {
      dateRange: { startDate, endDate },
      opens: 'right',
      selected: null,
      options: [
        { value: null, text: 'All Clients' },
        { value: '1', text: 'Sapere Marketing LLC' },
        { value: '2', text: 'Chesbro' }
      ],
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
          key: 'revenue',
          label: 'Total Revenue',
          class: 'text-right'
        }
      ],
      items: []
    }
  },
  filters: {
    dateCell (value) {
      let dt = new Date(value)

      return dt.getDate()
    },
    date (val) {
      return val ? val.toLocaleString() : ''
    }
  }
}
</script>

<style scoped>
.slot {
  background-color: #aaa;
  padding: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-black {
  color: #000;
}

.date-picker-field {
  width: auto;
  margin-right: 15px;
  overflow: hidden;
  white-space: nowrap;
}

.report-btn {
  width: 100%;
  margin-left: 15px;
}
.custom-select {
  width: auto;
}
.btn.btn-lg {
  padding: .50rem 1.5rem;
  font-size: 12px;
}

@media (max-width: 767px){
  .report-btn {
    width: 100%;
    margin-left: 0;
    margin-top: 15px;
  }
  
}
</style>