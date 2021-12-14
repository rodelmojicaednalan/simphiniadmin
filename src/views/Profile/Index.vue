<template>
<div class="main-content" style="min-height: 530px;">

    <b-form @submit.prevent="formSubmit" class="card p-3 bg-white">
        <div v-for="field in fields" :key="field.id" class="form-group">
            <label for="exampleInputEmail1 font-weight-bold" style="font-size:15px">{{ field.label }}</label>
            <b-form-input v-model="field.value" :state="field.hasError" :type="field.input.type" :id="field.input.id" :placeholder="field.input.placeholder"></b-form-input>
            <b-form-invalid-feedback :state="field.hasError">
                {{ field.error }}
            </b-form-invalid-feedback>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1 font-weight-bold" style="font-size:15px">{{ image.label }}</label>
            <b-form-file v-model="image.value" :placeholder="image.input.placeholder" @change="checkUpload" :drop-placeholder="image.input.placeholder"></b-form-file>
        </div>
        <div class="d-flex justify-content-end">
            <b-button variant="primary" size="lg" type="submit">SUBMIT</b-button>
        </div>
    </b-form>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: 'Profile',
    data() {
        return {
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
            },
            image: {
                label: "Profile Picture",
                value: [],
                hasError: null,
                input: {
                    type: "file",
                    id: "image",
                    name: "image",
                    placeholder: "Upload your profile picture or drag the picture here"
                },
                rules: {

                }
            }
        }
    },
    computed: {
        ...mapGetters({
            getInfo: 'profile/getInfo',
            getToken: 'profile/getToken'
        })
    },
    watch: {
        getInfo: {
            deep: true,
            handler(newVal) {
                Object.keys(this.fields).map(field => {
                    return this.fields[field].value = newVal[field]
                })
            }
        },
    },
    methods: {
        ...mapActions({
            fetchUserInfo: 'profile/fetchInfo',
            updateInfo: 'profile/updateInfo',
        }),
        formSubmit(event) {
            event.preventDefault()
            let payload = new FormData()
            Object.keys(this.fields).map(field => payload.append(field, this.fields[field].value))
            payload.append('image', this.image.value)
            this.updateInfo({
                payload: payload,
                token: this.getToken,
            })
        },
        checkUpload() {
            alert('uploading')
            console.log(this.image.value)
        }
    },
    mounted() {
        this.fetchUserInfo(localStorage.getItem('authuser'))
    }
}
</script>
