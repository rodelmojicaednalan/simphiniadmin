<template>
    <div class="main-content" style="min-height: 530px;">
        <b-row>
            <b-col>
                <div class="float-left">
                    <b-card-title>Manage Country</b-card-title>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <!-- User Interface controls -->
                    <b-row>
                        <b-col lg="6" class="my-1">
                            <b-form-group
                                label="Filter"
                                label-for="filter-input"
                                label-cols-sm="3"
                                label-align-sm="right"
                                label-size="sm"
                                class="mb-0"
                            >
                                <b-input-group size="sm">
                                    <b-form-input
                                        id="filter-input"
                                        v-model="filter"
                                        type="search"
                                        placeholder="Type to Search"
                                        ></b-form-input>
                                    <b-input-group-append>
                                        <b-button :disabled="!filter" 
                                                  @click="filter = ''" 
                                                  variant="info"
                                        >
                                            Clear
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6" class="my-1">
                            <b-button variant="success float-right" @click="showSideForm()">Add Country</b-button>
                        </b-col>
                    </b-row>
                    <!-- Main table element -->
                    <b-table
                        striped 
                        :items="countries"
                        :fields="tableFields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        :filter-included-fields="filterOn"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        stacked="md"
                        show-empty
                    >
                        <!-- @filtered="onFiltered" -->
                        <template #cell(name)="data">
                            {{ data.item.name }}
                        </template>
                        <template #cell(actions)="row">
                            <b-button size="sm" 
                                variant="primary mr-1"
                                @click="getInfo(row.item, row.index, $event.target)"
                            >
                                Edit
                            </b-button>
                            <b-button size="sm" 
                                @click="deleteData(row.item, row.index, $event.target)"
                                variant="danger"
                            >
                                Delete
                            </b-button>
                        </template>
                        <template #row-details="row">
                            <b-card>
                                <ul>
                                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                                </ul>
                            </b-card>
                        </template>
                    </b-table>
                    <b-row>
                        <b-col sm="7" md="6" class="my-1">
                            <b-pagination
                                v-model="currentPage"
                                :total-rows="totalRows"
                                :per-page="perPage"
                                align="fill"
                                size="sm"
                                class="my-0"
                            ></b-pagination>
                        </b-col>
                        <b-col sm="5">
                            <div class="float-sm-right float-md-right">
                                Number of Records: <b>{{ totalRows }}</b>
                            </div>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>

        <SideFormModal ref="loadResult" 
                       :country-name="countryName" 
                       :country-code="countryCode" 
                       :nationality="nationality" 
                       :hashedId="hashedId" 
                       @reloadList="loadResult" 
                       @reloadPaging="loadPaging" />
    </div>  
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import SideFormModal from '@/components/Pages/Picklists/Country/Index.vue'
    export default {
        components: {
            SideFormModal
        },
        data() {
            return {
                selectedData: {},
                tableFields: [
                    { key: 'index', label: '#', class: 'text-center' },
                    { key: 'name', label: 'Country Name', sortable: true },
                    { key: 'code', label: 'Country Code', sortable: true },
                    { key: 'nationality', label: 'Nationality', sortable: true },
                    { key: 'actions', label: 'Action', class: 'text-center' }
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
                sortBy: '',
                sortDesc: false,
                filter: null,
                filterOn: [],
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                },
                countryName: '',
                countryCode: '',
                nationality: '', 
                hashedId: ''
            }
        },
        computed: {
            ...mapState({
                fields: state => state.countries.fields,
            }),
            ...mapGetters({
                showData: 'country/showData',
                showDatas: 'country/showDatas',
                deleteStatus: 'user/deleteStatus', 
                getPaging: 'country/paging'
            }),

            country() {
                return this.showData;
            },
    
            countries() {
                return this.showDatas;
            },
    
            successDelete(){
                return this.deleteStatus
            },
            sortOptions() {
                // Create an options list from our fields
                return this.fields.filter(f => f.sortable).map(f => {
                        return { text: f.label, value: f.key }
                    })
            }
        },
        mounted() {
            this.loadResult()
            // // Set the initial number of items
            this.totalRows = this.countries.length
        },
        methods: {
            ...mapActions({
                fetchLists: 'country/fetchDatas',
                getCountry: 'country/getData',
                deleteCountry: 'country/deleteData'
            }),
            loadResult() {
                this.fetchLists('fetchDatas')
            },
            loadPaging() {
                this.totalRows = this.countries.length
            },
            showUpdateModal(data){
                console.log(`this is the users id:${data.id} 2nd param: ${data.text}`);
            },
            showSideForm() {
                this.countryName = undefined
                this.countryCode = undefined
                this.nationality = undefined
                this.hashedId = undefined
                this.$bvModal.show('sideFormModal')
            },
            showDeleteModal({id,name}){
                this.deletingUser.id = id
                this.deletingUser.name = name
                this.$bvModal.show('sample-modal')
            },
            getInfo(item) { // , index, button
                this.countryName = item.name
                this.countryCode = item.code
                this.nationality = item.nationality
                this.hashedId = item.hashedid
                this.$bvModal.show('sideFormModal')
            },
            deleteData(item) {
                this.$swal({
                    icon: 'warning',
                    title: 'Are you sure?',
                    text: 'Once deleted, you will not be able to recover this record',
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it !",
                    cancelButtonText: "No, cancel !",
                    closeOnConfirm: false,
                    closeOnCancel: true 
                })
                .then((confirmed) => {
                    if (confirmed.value) {
                        this.deleteCountry(item)
                    } else {
                        this.$swal("Cancelled", "Removing of selected data has been cancelled!", "error");   
                    }
                });
            },
        },
        watch: {
            selectedData: {
                deep: true,
                immediate: true,
                handler: function (newVal) { // newVal
                    this.selectedData = newVal
                },
            },
            getPaging: {
                deep: true,
                handler: function (newVal) {
                    this.totalRows = newVal
                }
            },
        }
  } 
</script>