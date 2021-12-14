<template>
    <div class="side-locker ">
        <b-modal id="sideFormModal" 
                 class="modal right fade" 
                 ref="modal" 
                 tabindex="-1" 
                 role="dialog" 
                 aria-hidden="true" 
                 aria-labelledby="myModalLabel2"
                 :header-bg-variant="headerBgVariant"
                 :footer-bg-variant="footerBgVariant"
        >
            <template #modal-title>
                Treatment
            </template>
            <div class="d-block">
                
                <Spinner v-if="getStateOptions.length === 0" />
                <form v-else @submit="formSubmit" class="card bg-white p-3">
                        <b-form-input
                            v-if="showInput"
                            v-model="inputHashedId"
                            :state="null">
                        </b-form-input>
                    <div class="form-group">
                        <label for="font-weight-bold" style="font-size:15px">Treatment Name <b class="font-red">*</b>: </label>
                        <b-form-input
                            v-model="inputTreatmentName"
                            :state="null">
                        </b-form-input>
                        <b-form-invalid-feedback :state="null"> </b-form-invalid-feedback>
                    </div>
                    <div class="form-group">
                        <label for="font-weight-bold" style="font-size:15px">Treatment Status: </label>
                        <b-form-select
                            :state="null"
                            v-model="inputTreatmentStatus"
                            :options="treatmentStatusOptions"
                            size="sm"
                            class="form-control form-control-sm"></b-form-select>
                    </div>
                    <div class="form-group">
                        <label for="font-weight-bold" style="font-size:15px">Description: </label>
                        <b-form-textarea
                            v-model="inputDescription"
                            size="sm"
                            rows="8"
                            :state="null">
                        </b-form-textarea>
                        <b-form-invalid-feedback :state="null"> </b-form-invalid-feedback>
                    </div>
                </form>
            </div>
            
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="primary mr-1" @click="formSubmit"><i></i> Save</b-button>
                    <b-button variant="danger" @click="hideSideFormModal">Close</b-button>
                </div>
            </template>
        </b-modal>
	
    </div>
</template>

<script>

    import {
        mapActions,
        mapGetters
    } from 'vuex';
    import Spinner from '@/components/partial/Spinner.vue'

    export default {
        name: "Create",
        components: {
            Spinner
        },
        props: ['treatmentName', 'treatmentStatus', 'description', 'hashedId'],
        data() {
            return {
                selectedData: { name: undefined, status: undefined, description: undefined, hashedId: undefined },
                inputTypes: ['text'],
                status: {
                    message: "",
                },
                treatmentStatusOptions: [
                    'Active', 'In-active'
                ],
                showInput: false,
                sideForm: false,
                variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
                headerBgVariant: 'secondary',
                headerTextVariant: 'light',
                bodyBgVariant: 'light',
                bodyTextVariant: 'dark',
                footerBgVariant: 'secondary',
                footerTextVariant: 'dark'
            }
        },
        computed: {
            ...mapGetters({
                getStateOptions: 'role/getOptions', 
                getResults: 'treatment/getResults'
            }),
            successAdded() {
                return this.$store.state.treatment.successAdded
            },
            inputTreatmentName: {
                get () { return this.treatmentName }, 
                set (newVal) { return this.selectedData.name = newVal }
            },
            inputTreatmentStatus: {
                get () { return this.treatmentStatus }, 
                set (newVal) { return this.selectedData.status = newVal }
            },
            inputDescription: {
                get () { return this.description }, 
                set (newVal) { return this.selectedData.description = newVal }
            },
            inputHashedId: {
                get () { return this.hashedId }, 
                set (newVal) { return this.selectedData.hashedId = newVal }
            }
        },
        watch: {
            addTreatment: {
                deep: true,
                handler: function () {
                    this.hideModal()
                }
            },
            getErrors: {
                deep: true,
                handler: function (newVal) {
                    for (let error in newVal) {
                        this.fields[error].error = newVal[error]
                    }
                }
            },
            getResults: {
                deep: true,
                handler: function (newVal) {
                    let value = newVal;

                    console.log(value)
                    if (value.status == 200) {
                        this.$swal({
                            icon: 'success',
                            title: 'Congratulations',
                            text: value.message,
                        });
                        this.$emit('reloadList')
                        this.$emit('reloadPaging')
                        this.$bvModal.hide('sideFormModal')
                    } else {
                        this.$swal({
                            icon: 'warning',
                            title: 'Ooops..',
                            text: newVal.errors.code[0],
                        });
                    }
                }
            },
            selectedData: {
                immediate: true,
                deep: true,
                handler() {}
            },
        },
        methods: {
            ...mapActions({
                addTreatment: 'treatment/addTreatment',
                updateTreatment: 'treatment/updateTreatment',
                getRoles: 'role/getRoles',
            }),
            formSubmit(e) {
                e.preventDefault()
                console.log(this.inputTreatmentStatus)
                console.log(this.selectedData.status)
                if (this.selectedData.name === undefined && this.inputTreatmentName === undefined) {
                    this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Treatment Name is Required!',
                        });
                    return false
                } else if (this.selectedData.name != '' && this.selectedData.name.length < 3) {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Treatment Name must be at least 3 characters!' }); return false
                } else if (this.selectedData.status === undefined && this.inputTreatmentStatus === undefined) {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Treatment Status is Required!',
                    });
                    return false
                } else if (this.selectedData.description === undefined && this.inputDescription === undefined) {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Description is Required!',
                    });
                    return false
                } else if (this.selectedData.name === '' && this.inputTreatmentName != '') {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Treatment Name is Required!',
                    });
                    return false
                } else if (this.selectedData.status === '' && this.inputTreatmentStatus != '') {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Treatment Status is Required!',
                    });
                    return false
                } else if (this.selectedData.description === '' && this.inputDescription != '') {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Description is Required!',
                    });
                    return false
                } 
                
                if (this.hashedId == '' || this.hashedId == undefined) {
                    let payload = this.selectedData
                    this.addTreatment(payload)
                } else {
                    let payload = { 
                        name: (this.selectedData.name == undefined) ? this.treatmentName : this.selectedData.name,
                        status: (this.selectedData.status == undefined) ? this.treatmentStatus : this.selectedData.status,
                        description: (this.selectedData.description == undefined) ? this.description : this.selectedData.description,
                        hashedId: (this.selectedData.hashedId == undefined) ? this.hashedId : this.selectedData.hashedId,
                    }
                    
                    this.updateTreatment(payload)
                }
            },
            hideSideFormModal() {
                this.$bvModal.hide('sideFormModal')
            }, 
            submitSideForm() {
                this.formSubmit();
            }
        },
        mounted() {
            this.getRoles({
                token: localStorage.getItem('token')
            });
        },
    }
</script>