<template>
    <div :style="{ 'min-height: 530px;' : logs.length} ">
        <b-row v-if="!logs.length" class="mt100 mb70">
            <b-col>
                <b-row>
                    <b-col style="text-align: center">
                        <b-img src="/assets/img/no_result.png" fluid></b-img>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col style="text-align: center">
                        <p class="empty-state__message">
                            No records has been added yet.
                        </p>
                        <p class="empty-state__help">
                            Add a new record by simpley clicking the button on top right side.
                        </p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row v-if="logs.length">
            <b-col>
                <b-card>
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
                    </b-row>
                    <b-table
                        striped 
                        :items="logs"
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
                        
                        <template #cell(what_action)="data">
                            <span :class="{ 'badge primary' : data.item.what_action == 'Add', 
                                               'badge success' : data.item.what_action == 'Edit',   
                                               'badge danger' : data.item.what_action == 'Delete' }">
                                        {{ data.item.what_action }}
                            </span>
                        </template>
                        <template #cell(author_id)="data">
                            {{ data.item.whos_user.name }}
                        </template>
                        <template #cell(actions)="data">
                            <b-button size="sm" 
                                @click="data.toggleDetails"
                                variant="info mr-1"
                            >
                                {{ data.detailsShowing ? 'Hide' : 'Show' }} Details
                            </b-button>
                        </template>
                        <template #row-details="data">
                            <b-card>
                                <b-row>
                                    <b-col sm="9">
                                        <h3 variant="text-info">{{ data.item.module }}</h3>
                                    </b-col>
                                    <b-col sm="3">
                                        <div class="float-sm-right float-md-right">
                                            <small class="text-muted"><i class="far fa-clock"></i> {{ data.item.duration }}</small>
                                        </div>
                                    </b-col>
                                </b-row>
                                <hr />
                                <b-row>
                                    <b-col>
                                        {{ data.item.description }}
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <div class="float-sm-right float-md-right">
                                            <b><i>by: {{ data.item.whos_user.name }}</i></b>
                                        </div>
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
    </div>  
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    export default {
        data() {
            return {
                tableFields: [
                    { key: 'index', label: '#', class: 'text-center' },
                    { key: 'display_logged_date', label: 'Date Logged' },
                    { key: 'module', label: 'Module' },
                    { key: 'what_action', label: 'Action' },
                    { key: 'author_id', label: 'Made By' },
                    { key: 'actions', label: '' }
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
                }
            }
        },
        computed: {
            ...mapState({
                fields: state => state.auditTrail.fields,
            }),
            ...mapGetters({
                auditTrail: 'auditTrail/showDatas', 
                getPaging: 'auditTrail/paging'
            }),
    
            logs() {
                return this.auditTrail;
            },
    
            // successDelete(){
            //     return this.deleteStatus
            // },
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
            this.totalRows = this.logs.length
        },
        methods: {
            ...mapActions({
                fetchDatas: 'auditTrail/fetchDatas',
            }),
            loadResult() {
                this.fetchDatas('fetchDatas')
            },
            loadPaging() {
                this.totalRows = this.countries.length
            },
        },
        watch: {
            getPaging: {
                deep: true,
                handler: function (newVal) {
                    this.totalRows = newVal
                }
            },
        }
  } 
</script>

