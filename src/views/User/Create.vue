<template>
<div class="main-content" style="min-height: 530px;">
    <b-row>
        <b-col>
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
                        <b-form-select
                            :state="field.hasError"
                            v-else-if="field.input.type === 'select'"
                            v-model="field.value"
                            :options="getStateOptions"
                            size="sm"
                            class="form-control form-control-sm"></b-form-select>
                        <b-form-invalid-feedback :state="field.hasError">
                            {{ field.error }}
                        </b-form-invalid-feedback>
                    </div>
                    <div class="d-flex justify-content-end">
                        <b-button type="submit" size="lg" variant="primary">SUBMIT</b-button>
                        <b-button class="ml-1" type="button" size="lg" @click="cancel" variant="danger">CANCEL</b-button>
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
import Spinner from '../../components/partial/Spinner.vue'

export default {
    name: "Create",
    components: {
        Spinner
    },
    data() {
        return {
            inputTypes: ['text', 'password', 'email', 'link'],
            fields: {
                firstname: {
                    label: "First Name",
                    value: "",
                    hasError: null,
                    error: "",
                    input: {
                        type: "text",
                        id: "firstname",
                        name: "firstname",
                        placeholder: "Enter First Name",
                    },
                    rules: {
                        required: true,
                    }
                },
                lastname: {
                    label: "Last Name",
                    value: "",
                    hasError: null,
                    error: "",
                    input: {
                        type: "text",
                        id: "lastname",
                        name: "lastname",
                        placeholder: "Enter Last Name"
                    },
                    rules: {
                        required: true,
                    }
                },
                email: {
                    label: "Email Address",
                    value: "",
                    hasError: null,
                    error: "",
                    input: {
                        type: "email",
                        id: "email",
                        name: "email",
                        placeholder: "Enter Email"
                    },
                    rules: {
                        required: true,
                        email: true,
                    }
                },
                password: {
                    label: "Password",
                    value: "",
                    hasError: null,
                    error: "",
                    input: {
                        type: "password",
                        id: "password",
                        name: "password",
                        placeholder: "Enter Password",
                    },
                    rules: {
                        required: true,
                    }
                },
                role: {
                    label: "Role",
                    value: "",
                    hasError: null,
                    error: "",
                    input: {
                        type: "select",
                        id: "role",
                        name: "role",
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
            addStatus: 'user/addStatus',
            getErrors: 'user/getErrors',
            getStateOptions: 'role/getOptions',
        }),
        successAdded() {
            return this.$store.state.user.successAdded
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
            successAddedToTrue: 'user/successAddedToTrue',
            successAddedToFalse: 'user/successAddedToFalse',
            getRoles: 'role/getRoles',
            addUser: 'user/addUser',
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
