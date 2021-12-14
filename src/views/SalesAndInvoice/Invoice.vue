<template>
  <div class="main-content" style="min-height: 530px;">
    <h3>Invoice</h3>
    <b-row>
      <div class="pb-3">
        <b-form-select v-model="selected" :options="option" size="sm" class="mt-3"></b-form-select>
      </div>
    </b-row>
    <b-row  v-for="client in clients[selected-1]" :key="client">
      <b-col v-for="invoice in invoices[selected-1]" :key="invoice">
        <b-card v-if="selected !== null">
          <b-row>
            <b-col>
              Invoice Date: {{ invoice.created_at }}
            </b-col>
            <b-col>
              <b-card-title class="text-right">Invoice</b-card-title>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="4" md>Bill From:</b-col>
                <b-col md>
                  [Sample Company]
                </b-col>
              </b-row>
                <b-row>
                  <b-col cols="4" md>
                    Address:
                  </b-col>
                  <b-col md>
                    Sample Address
                  </b-col>
                </b-row>
                <b-row>
                  <b-col  cols="4" md>
                  </b-col>
                  <b-col md>
                    [City, State Zip code]
                  </b-col>
                </b-row>
                <b-row>
                  <b-col  cols="4">
                    Email
                  </b-col>
                  <b-col>
                    Email
                  </b-col>
                </b-row>
            </b-col>
            <b-col>
              <b-row>
                <b-col cols="4">Bill to:</b-col>
                <b-col>
                  {{ client.company }}
                </b-col>
              </b-row>
              <b-row>
                <b-col  cols="4">
                  Invoice No.:
                </b-col>
                <b-col>
                  {{ invoice.id }}
                </b-col>
              </b-row>
                <b-row>
                  <b-col cols="4">
                    Address:
                  </b-col>
                  <b-col>
                    {{client.address}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col  cols="4">
                  </b-col>
                  <b-col>
                    {{client.city}},{{client.state}} {{client.zip}}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col  cols="4">
                    Email:
                  </b-col>
                  <b-col>
                    {{ client.email }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col  cols="4">
                    Due Date
                  </b-col>
                  <b-col>
                    {{ invoice.due_date }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <hr />
            <div class="table-responsive">
              <b-table striped hover :items="items[selected-1]" :fields="fields"></b-table>
            </div>
            <hr />
            <b-row>
              <b-col class="text-right">
                Subtotal :
              </b-col>
              <b-col cols="4">
                [Subtotal]
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-right">
                Tax(0.0%) :
              </b-col>
              <b-col cols="4">
                [Tax]
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-right">
                Total :
              </b-col>
              <b-col cols="4">
                [Total]
              </b-col>
            </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Invoice',
  data(){
    return {
      value: '',
      selected: null,
      option: [
        { value: null, text: 'Select Client' },
        { value: 1, text: 'Sapere Marketing LLC' },
        { value: 2, text: 'Chesbro' }
      ],
      clients: [
        {
          1: {id: 1, company: 'Sapere Marketing LLC', address: '123 Sample Address St.', city: 'Raleigh', state: 'North Carolina', zip: '27513', email: 'sample@email.com'}
        },{
          2: {id: 2, company: 'Chesbro', address: '123 Sample2 Address St.', city: 'New York City', state: 'New York', zip: '10001', email: 'sample2@email.com'}
        }
      ],
      invoices: [
        {
          1: {id: 1, due_date: '2021-09-02', start_date:'2021-08-01', end_date: '2021-08-31', created_at:'2021-09-01'}
        },{
          2: {id: 2, due_date: '2021-08-06', start_date:'2021-07-02', end_date: '2021-08-01', created_at:'2021-08-02'}
        }
      ],
      fields: [
        {
          key: 'product_service',
          label: 'Products/Services'
        },
        'description', 
        {
          key: 'hours',
          label: 'Hours/Quantity'
        },
        {
          key: 'price',
          label: 'Prices',
          formatter: (value) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
        }
      ],
      items: [
        [
          {product_service: 'Sample Service', hours: 40, description: 'Sample1', price: 500 },
          {product_service: 'Sample Service1', hours: 21, description: 'Sample2', price: 300 },
          {product_service: 'Sample Service2', hours: 89, description: 'Sample3', price: 700 },
          {product_service: 'Sample Service3', hours: 38, description: 'Sample4', price: 400 }
        ],
        [
          {product_service: 'Sample Service4', hours: 89, description: 'Sample7', price: 700 },
          {product_service: 'Sample Service5', hours: 38, description: 'Sample8', price: 400 },
          {product_service: 'Sample Service6', hours: 40, description: 'Sample5', price: 500 },
          {product_service: 'Sample Service7',hours: 21, description: 'Sample6', price: 300 }
        ]
      ]
    }
  }
}
</script>
<style scoped>
  .custom-select {
    width: auto;
  }
</style>