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
                Country
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
                        <label for="font-weight-bold" style="font-size:15px">Country Name <b class="font-red">*</b>: </label>
                        <b-form-input
                            v-model="inputCountryName"
                            :state="null">
                        </b-form-input>
                        <b-form-invalid-feedback :state="null"> </b-form-invalid-feedback>
                    </div>
                    <div class="form-group">
                        <label for="font-weight-bold" style="font-size:15px">Country Code <b class="font-red">*</b>: </label>
                        <b-form-input
                            v-model="inputCountryCode"
                            :state="null">
                        </b-form-input>
                        <b-form-invalid-feedback :state="null"> </b-form-invalid-feedback>
                    </div>
                    <div class="form-group">
                        <label for="font-weight-bold" style="font-size:15px">Nationality <b class="font-red">*</b>: </label>
                        <b-form-input
                            v-model="inputNationality"
                            :state="null">
                        </b-form-input>
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
        props: ['countryName', 'countryCode', 'nationality', 'hashedId'],
        data() {
            return {
                selectedData: { name: undefined, code: undefined, nationality: undefined, hashedId: undefined },
                inputTypes: ['text'],
                status: {
                    message: "",
                },
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
                getResults: 'country/getResults'
            }),
            successAdded() {
                return this.$store.state.country.successAdded
            },
            inputCountryName: {
                get () { return this.countryName }, 
                set (newVal) { return this.selectedData.name = newVal }
            },
            inputCountryCode: {
                get () { return this.countryCode }, 
                set (newVal) { return this.selectedData.code = newVal }
            },
            inputNationality: {
                get () { return this.nationality }, 
                set (newVal) { return this.selectedData.nationality = newVal }
            },
            inputHashedId: {
                get () { return this.hashedId }, 
                set (newVal) { return this.selectedData.hashedId = newVal }
            }
        },
        watch: {
            addCountry: {
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
                    if (newVal.status == 200) {
                        this.$swal({
                            icon: 'success',
                            title: 'Congratulations',
                            text: newVal.message,
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
                handler() {

                }
            },
        },
        methods: {
            ...mapActions({
                addCountry: 'country/addCountry',
                updateCountry: 'country/updateCountry',
                getRoles: 'role/getRoles',
            }),
            formSubmit(e) {
                e.preventDefault()
                
                if (this.selectedData.name === undefined && this.inputCountryName === undefined) {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Country Name is Required!'}); return false
                } else if (this.selectedData.name != '' && this.selectedData.name.length < 3) {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Country Name must be at least 3 characters!' }); return false
                } else if (this.selectedData.code === undefined && this.inputCountryCode === undefined) {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Country Code is Required!' }); return false
                } else if (this.selectedData.code != '' && this.selectedData.code.length < 2) {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Country Code must be at least 2 character!' }); return false
                } else if (this.selectedData.nationality === undefined && this.inputNationality === undefined) {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Nationality is Required!', }); return false
                } else if (this.selectedData.nationality != '' && this.selectedData.nationality.length < 3) {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Nationality must be at least 3 character!' }); return false
                } else if (this.selectedData.name === '' && this.inputCountryName != '') {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Country Name is Required!' }); return false
                } else if (this.selectedData.code === '' && this.inputCountryCode != '') {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Country Code is Required!' }); return false
                } else if (this.selectedData.nationality === '' && this.inputNationality != '') {
                    this.$swal({ icon: 'error', title: 'Oops...', text: 'Nationality is Required!' }); return false
                } 
                
                if (this.hashedId == '' || this.hashedId == undefined) { //     let payload = this.selectedData
                    let payload = this.selectedData
                    this.addCountry(payload)
                } else {
                    let payload = { 
                        name: (this.selectedData.name == undefined) ? this.countryName : this.selectedData.name,
                        code: (this.selectedData.code == undefined) ? this.countryCode : this.selectedData.code,
                        nationality: (this.selectedData.nationality == undefined) ? this.nationality : this.selectedData.nationality,
                        hashedId: (this.selectedData.hashedId == undefined) ? this.hashedId : this.selectedData.hashedId,
                    }
                    this.updateCountry(payload)
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
