<template>
  <div class="main-content" style="min-height: 530px;">
    <b-row>
      <b-col>
        <b-card title="Client List">
          <b-card-text class="pt-3 mb-0">
            <div class="table-responsive">
              <BootstrapTable :counter="true" responsive :items="items" :fields="header">
                <template #cell(actions)="data">
                  <div style="width: 30px">
                    Hello {{ data }}
                  </div>
                </template>
              </BootstrapTable>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BootstrapTable from '@/components/Modules/BootstrapTable';
import axios from 'axios';
export default {
  components: {
    BootstrapTable
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
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'text-center'
        }
      ],
      items: []
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