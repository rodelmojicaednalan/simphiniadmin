<template>
<div>
    <b-modal id="country-modal" ref="country-modal" hide-footer title="Country">
        <h4 class="my-4">{{ message }}</h4>
        <div class="d-flex justify-content-end">
            <b-button size="lg" class="mr-1" variant="primary" @click="saveModal()">Save</b-button>
            <b-button size="lg" variant="danger" @click="hideModal()">Cancel</b-button>
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
            this.$bvModal.hide('country-modal')
        }
    }
}
</script>
