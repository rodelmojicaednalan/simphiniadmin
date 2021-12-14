<template>
  <div class="main-content" style="min-height: 530px;">
    <b-row>
      <b-col>
        <b-card>
          <b-card-title>Print/Export Properties</b-card-title>
          <b-card-text>
            <form>
              <b-row>
                <b-col md>
                  <b-form-group
                    label="Export Name:"
                    label-for="exportname"
                    description="Specify the name for your export"
                  >
                    <b-form-input
                      id="exportname"
                      v-model="exportname"
                      type="text"
                      placeholder="Awesome Export Name"
                      class="form-control form-control-sm"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="Export as:"
                    label-for="exportas"
                  >
                    <b-form-select
                      id="exportas"
                      v-model="exportas" 
                      :options="options"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col md>
                  <b-form-group
                    label="Select Properties:"
                    label-for="properties"
                    
                  >
                    <b-form-select
                      id="properties"
                      v-model="properties" 
                      :options="p_options"
                      multiple 
                      :select-size="4"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button variant="primary">Run Export</b-button>
            </form>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <b-card-title>Available Exports</b-card-title>
        <b-card-text>
        <div class="scheduled-backups table-responsive">
          <table role="table" aria-busy="false" aria-colcount="4" class="table b-table table-hover table-sm border">
            <thead role="rowgroup">
              <tr role="row" class="">
                <th role="columnheader" scope="col" aria-colindex="1" class=""><div>Name</div></th>
                <th role="columnheader" scope="col" aria-colindex="2" class=""><div>Date</div></th>
                <th role="columnheader" scope="col" aria-colindex="3" class=""><div>Type</div></th>
                <th role="columnheader" scope="col" aria-colindex="4" class=""><div>Properties</div></th>
                <th role="columnheader" scope="col" aria-colindex="5" class=""><div>&nbsp;</div></th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              <tr role="row" class="">
                <td aria-colindex="1" role="cell" class="">All Appointments</td>
                <td aria-colindex="2" role="cell" class="">2021-08-26</td>
                <td aria-colindex="3" role="cell" class="">PDF</td>
                <td aria-colindex="4" role="cell" class="">Client Name, Date, Time, Dentist</td>
                <td aria-colindex="5" role="cell" class=""><a href="#">Re-run export</a> | <a href="#">Download</a> | <a href="#">Delete</a></td>
              </tr>
              <tr role="row" class="">
                <td aria-colindex="1" role="cell" class="">All Clients</td>
                <td aria-colindex="2" role="cell" class="">2021-08-16</td>
                <td aria-colindex="3" role="cell" class="">CSV</td>
                <td aria-colindex="4" role="cell" class="">Client Name, Address, Phone Number</td>
                <td aria-colindex="5" role="cell" class=""><a href="#">Re-run export</a> | <a href="#">Download</a> | <a href="#">Delete</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Properties",
  data() {
    return {
      form: {
        exportas: null,
        properties: null,
        exportname: null
      },
      options: [
        { text: 'PDF', value: 'pdf' },
        { text: 'CSV', value: 'csv' }
      ],
      p_options: [
        { text: 'Property 1', value: 'p1' },
        { text: 'Property 2', value: 'p2' },
        { text: 'Property 3', value: 'p3' },
        { text: 'Property 4', value: 'p4' },
        { text: 'Property 5', value: 'p5' }
      ],
      exportas: 'pdf',
      properties: 'p1'
    }
  }
}
</script>

<style lang="sass">
.custom-control-label > span
  position: relative
  top: -4px
</style>