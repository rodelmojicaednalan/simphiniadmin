<template>
<div class="main-content" style="min-height: 530px;">
  <b-row>
    <b-col>
      <b-card>
        <b-alert v-model="successDelete" variant="success" dismissible>
            Successfully Deleted!
        </b-alert>
        <div class="float-left">
          <b-card-title>Manage User</b-card-title>
        </div>
        <div class="float-right pb-3">
          <b-button variant="success" :to="{name:'UserCreate'}">Add User</b-button>
        </div>
        <b-card-text class="pt-3 mb-0">
          <div class="table-responsive">
            <BootstrapTable
            :items="users"
            :fields="header"
            v-on:showUpdateUser="showUpdateModal($event)"
            v-on:showDeleteModal="showDeleteModal($event)"
            />
          </div>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>

  <DeleteUserModal 
    :id="deletingUser.id"
  />
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import DeleteUserModal from '@/components/Modals/Users/DeleteUser'
import BootstrapTable from '@/components/Modules/BootstrapTable.vue'

export default {
    name: "Users",
    components: {
        BootstrapTable,
        DeleteUserModal
    },
    data() {
      return {
        header: [
          {
            key: 'index',
            label: '#',
            class: 'text-center'
          },
          {
            key: 'name',
            label: 'Name'
          },
          {
            key: 'email',
            label: 'Email'
          },
          {
            key: 'created_at_display',
            label: 'Date Created'
          },
          {
            key: 'action',
            label: 'Action'
          }
        ],
        deletingUser: {
          id: null,
          name: "",
        }
      }
    },
    computed: {
        ...mapState({
          fields: state => state.user.fields,
        }),
        ...mapGetters({
            showUsers: 'user/showUsers',
            deleteStatus: 'user/deleteStatus'
        }),

        users() {
            return this.showUsers;
        },

        successDelete(){
          return this.deleteStatus
        }
    },
    methods: {
        ...mapActions({
            addNewUser: 'user/addNewUser',
            fetchUsers: 'user/fetchUsers',
            resetDeleteStatus: 'user/resetDeleteStatus'
        }),
        addUser() {
            let payload = {
                firstname: "User",
                lastname: "New",
                age: 12,
                email: "newUserEmail@gmail.com"
            }
            this.addNewUser('addNewUser', payload)
        },
        loadUsers() {
            this.fetchUsers('fetchUsers')
        },
        showUpdateModal(data){
          console.log(`this is the users id:${data.id} 2nd param: ${data.text}`);
        },
        showDeleteModal({id,name}){
          this.deletingUser.id = id
          this.deletingUser.name = name
          this.resetDeleteStatus()
          this.$bvModal.show('sample-modal')
        },
    },
    mounted() {
        this.loadUsers()
    },
}
</script>
