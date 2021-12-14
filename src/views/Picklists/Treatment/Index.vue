<template>
    <div class="main-content" style="min-height: 530px;">
        <b-row>
            <b-col>
                <div class="float-left">
                    <b-card-title>Manage Treatment</b-card-title>
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
                            <b-button variant="success float-right" @click="showSideForm()">Add Treatment</b-button>
                        </b-col>
                    </b-row>
                    <!-- Main table element -->
                    <b-table
                        striped 
                        :items="treatments"
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
                        <template #cell(name)="data">
                            {{ data.item.name }}
                        </template>
                        <template #cell(actions)="data">
                            <b-button size="sm" 
                                @click="data.toggleDetails"
                                variant="info mr-1"
                            >
                                {{ data.detailsShowing ? 'Hide' : 'Show' }} Description
                            </b-button>
                            <b-button size="sm" 
                                variant="primary mr-1"
                                @click="getInfo(data.item, data.index, $event.target)"
                            >
                                Edit
                            </b-button>
                            <b-button size="sm" 
                                @click="deleteData(data.item, data.index, $event.target)"
                                variant="danger"
                            >
                                Delete
                            </b-button>
                        </template>
                        <template #row-details="data">
                            <b-card>
                                <b-row>
                                    <b-col>
                                        <h3 variant="text-info">{{ data.item.name }}</h3>
                                    </b-col>
                                </b-row>
                                <hr />
                                <b-row>
                                    <b-col>
                                        {{ data.item.description }}
                                    </b-col>
                                </b-row>
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
                       :treatment-name="treatmentName" 
                       :treatment-status="treatmentStatus" 
                       :description="description" 
                       :hashedId="hashedId" 
                       @reloadList="loadResult" 
                       @reloadPaging="loadPaging" />
    </div>  
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import SideFormModal from '@/components/Pages/Picklists/Treatment/Index.vue'
    export default {
        components: {
            SideFormModal
        },
        data() {
            return {
                selectedData: {},
                tableFields: [
                    { key: 'index', label: '#', class: 'text-center' },
                    { key: 'name', label: 'Treatment Name', sortable: true },
                    { key: 'status', label: 'Status', sortable: true },
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
                treatmentName: undefined,
                treatmentStatus: '',
                description: '', 
                hashedId: ''
            }
        },
        computed: {
            ...mapState({
                fields: state => state.treatments.fields,
            }),
            ...mapGetters({
                showData: 'treatment/showData',
                showDatas: 'treatment/showDatas',
                deleteStatus: 'user/deleteStatus', 
                getPaging: 'treatment/paging'
            }),

            country() {
                return this.showData;
            },
    
            treatments() {
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
            this.totalRows = this.treatments.length
        },
        methods: {
            ...mapActions({
                fetchLists: 'treatment/fetchDatas',
                getCountry: 'treatment/getData',
                deleteTreatment: 'treatment/deleteData'
            }),
            loadResult() {
                this.fetchLists('fetchDatas')
            },
            loadPaging() {
                this.totalRows = this.treatments.length
            },
            showUpdateModal(data){
                console.log(`this is the users id:${data.id} 2nd param: ${data.text}`);
            },
            showSideForm() {
                this.treatmentName = undefined
                this.treatmentStatus = undefined
                this.description = undefined
                this.hashedId = undefined
                this.$bvModal.show('sideFormModal')
            },
            getInfo(item) { // , index, button
                this.treatmentName = item.name
                this.treatmentStatus = item.status
                this.description = item.description
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
                        this.deleteTreatment(item)
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