<template>
<div>
    <b-modal id="sample-modal" ref="delete-modal" hide-footer title="Delete User Modal">
        <h4 class="my-4">{{ message }}</h4>
        <div class="d-flex justify-content-end">
            <b-button size="lg" class="mr-1" variant="danger" @click="deleteUser()">Delete</b-button>
            <b-button size="lg" variant="primary" @click="hideModal()">Cancel</b-button>
        </div>
    </b-modal>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        message: {
            type: String,
            default: "Are you sure you want to delete this?",
        },
        id: {
            require: false,
            type: Number,
        },
    },
    computed: {
        ...mapGetters({
            deleteStatus: 'user/deleteStatus'
        }),
    },
    watch: {
        deleteStatus: {
            deep: true,
            handler: function () {
                this.hideModal()
            }
        }
    },
    methods: {
        ...mapActions({
            deleteUserAction: 'user/deleteUser',
        }),

        deleteUser() {
            this.deleteUserAction(this.id)
        },

        hideModal() {
            this.$bvModal.hide('sample-modal')
        }
    }
}
</script>
