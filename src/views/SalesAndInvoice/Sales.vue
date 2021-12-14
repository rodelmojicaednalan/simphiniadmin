<template>
  <div class="main-content" style="min-height: 530px;">
    <h3>Sales</h3>
    <b-row>
      <b-col>
        <div class="pb-3" style="display: flex">
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
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <div class="table-responsive">
            <b-table hover :fields="header"></b-table>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker'
export default {
  components: { 
    DateRangePicker
  },
  data() {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 6)
    return { dateRange: { startDate, endDate },
      opens: 'right',
      header: [
        {
          key: 'created_at',
          label: 'Date'
        },
        {
          key: 'sales_activity',
          label: 'Sales Activity'
        },{
          key: 'completed',
          label: 'Completed' 
        },
        {
          key: 'notes',
          label: 'Notes'
        }
      ],
      items: []
    }
  }
}
</script>