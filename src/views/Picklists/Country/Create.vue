<template>
<div class="main-content" style="min-height: 530px;">
    <b-row>
        <b-col>
            <div class="float-left">
                <b-card-title>Add Country</b-card-title>
            </div>
        </b-col>
    </b-row>
    <b-row>
        <b-col md="4">
            <b-card>
                <b-alert v-model="successAdded" variant="success" dismissible>
                    Successfully Added!
                </b-alert>
                <Spinner v-if="getStateOptions.length === 0" />
                <form v-else @submit="formSubmit" class="card bg-white p-3">
                    <div @submit.prevent="formSubmit" v-for="field in fields" :key="field.id" class="form-group">
                        <label for="exampleInputEmail1 font-weight-bold" style="font-size:15px">{{ field.label }}</label>
                        <b-form-input
                            v-if="inputTypes.includes(field.input.type)"
                            v-model="field.value"
                            :state="field.hasError"
                            :type="field.input.type"
                            :id="field.input.id"
                            :placeholder="field.input.placeholder"></b-form-input>
                        <b-form-invalid-feedback :state="field.hasError">
                            {{ field.error }}
                        </b-form-invalid-feedback>
                    </div>
                    <div class="d-flex justify-content-end">
                        <b-button type="submit" size="lg" variant="primary">Save</b-button>
                        <b-button class="ml-1" type="button" size="lg" @click="cancel" variant="danger">Cancel</b-button>
                    </div>
                </form>
            </b-card>
        </b-col>
    </b-row>
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
        data() {
            return {
                inputTypes: ['text'],
                fields: {
                    name: {
                        label: "Country Name",
                        value: "",
                        hasError: null,
                        error: "",
                        input: {
                            type: "text",
                            id: "name",
                            name: "name",
                            placeholder: "Country Name",
                        },
                        rules: {
                            required: true,
                        }
                    },
                    code: {
                        label: "Country Code",
                        value: "",
                        hasError: null,
                        error: "",
                        input: {
                            type: "text",
                            id: "code",
                            name: "code",
                            placeholder: "Country Code",
                        },
                        rules: {
                            required: true,
                        }
                    },
                    nationality: {
                        label: "Nationality",
                        value: "",
                        hasError: null,
                        error: "",
                        input: {
                            type: "text",
                            id: "nationality",
                            name: "nationality",
                            placeholder: "Nationality",
                        },
                        rules: {
                            required: true,
                        }
                    }
                },
                status: {
                    message: "",
                },
            }
        },
        computed: {
            ...mapGetters({
                addStatus: 'country/addStatus',
                getErrors: 'country/getErrors',
                getStateOptions: 'role/getOptions',
            }),
            successAdded() {
                return this.$store.state.country.successAdded
            }
        },
        watch: {
            addStatus: {
                deep: true,
                handler: function (newVal) {
                    this.resetForm(newVal)
                },
            },
            getErrors: {
                deep: true,
                handler: function (newVal) {
                    for (let error in newVal) {
                        this.fields[error].error = newVal[error]
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                successAddedToTrue: 'country/successAddedToTrue',
                successAddedToFalse: 'country/successAddedToFalse',
                addUser: 'country/addCountry',
                getRoles: 'role/getRoles',
            }),
            formSubmit(e) {
                e.preventDefault()
                this.successAddedToFalse()
                if (this.validateInputs(this.fields)) {
                    let payload = {}
                    for (let field in this.fields) {
                        payload[field] = this.fields[field].value
                    }
                    this.addUser(payload)
                }
            },
            resetForm(newVal) {
                if (newVal) {
                    for (let field in this.fields) {
                        this.fields[field].value = ""
                        this.fields[field].hasError = null
                        this.fields[field].error = ""
                    }
                }
            },
            validateInputs() {
                let noError = true
                Object.keys(this.fields).map(field => {
                    let validate = true;
                    let currentField = this.fields[field];

                    if (currentField.rules.required && validate) {
                        if (currentField.value.toString().trim() === "") {
                            validate = false
                            currentField.hasError = false
                            currentField.error = `${currentField.label} should not be empty`
                        }
                    }

                    if (currentField.rules.string && validate) {
                        if (/\d/.test(currentField.value)) {
                            validate = false
                            currentField.hasError = false
                            currentField.error = `${currentField.label} should not contain numbers`
                        }
                    }

                    if (currentField.rules.email && validate) {
                        let pattern = /(.)+@(.)+\.(.)+/
                        if (!pattern.test(currentField.value)) {
                            validate = false
                            currentField.hasError = false
                            currentField.error = `${currentField.label} should be a valid email`
                        }
                    }
                    if (validate) {
                        currentField.hasError = true
                        currentField.error = ''
                    }

                    if (noError && !validate) {
                        noError = false
                    }
                })

                return noError
            },
            cancel(){
                this.$router.go(-1)
            }
        },
        mounted() {
            this.getRoles({
                token: localStorage.getItem('token')
            });
        }
    }
</script>
