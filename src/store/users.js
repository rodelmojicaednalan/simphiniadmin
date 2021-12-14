import axios from 'axios'


const store = {
    namespaced: true,
    state: {
        fields: [ "id", "name", "email",'created_at','action'],
        successAdded: false,
        successDelete: false,
        users: [],
        errors: {},
    },
    getters: {
        showUsers: state => {
            return state.users.map( user => {
                user.update = {}
                user.delete = {}
                user.update.label = `Success`
                user.delete.label = `Delete`
                return user
            });
        },
        addStatus: state => state.successAdded,
        getErrors: state => state.errors,
        deleteStatus: state => state.successDelete

    },
    mutations: {
        FETCH_USER(state,users){
            state.users = users;
        },
        SUCCESS_ADDED_TO_FALSE(state){
            state.successAdded = false
        },
        SUCCESS_ADDED(state){
            state.successAdded = true
        },
        SET_ERRORS(state,errors){
            state.errors = errors
        },
        SUCCESS_DELETE(state,status){
            state.successDelete = status
        },
        RESET_DELETE_STATUS(state){
            state.successDelete = false
        }
    },
    actions: {
        addUser({commit},payload){
            axios.post('/admin/user',payload,{
                headers:{
                    "Accept": 'application/json',
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                res.data.status ? commit('SUCCESS_ADDED') : console.log("There is an error")
            })
            .catch( err => {
                let errors = {};
                for(let error in err.response.data.errors){
                    errors[error] =  err.response.data.errors[error][0]
                }
                commit('SET_ERRORS',errors)
            })
        },
        fetchUsers({commit}){
            axios.get('/admin/user',{
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json",
                }
            })
            .then(res => {
                res.data.status ? commit('FETCH_USER',res.data.data.data) : console.log("there is an error")
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteUser({commit},id){
            axios.delete(`/admin/user/${id}/delete`)
            .then(res => {
                if(res.data.status){
                    commit('SUCCESS_DELETE',res.data.status)
                    return true
                } else {
                    commit('SUCCESS_DELETE',res.data.status)
                    console.log("There is an error")
                    return false
                }
            })
            .catch(err => {
                commit('SET_ERRORS',err.response.data.message)
                return false
            })
        },
        successAddedToFalse({commit}){
            commit("SUCCESS_ADDED_TO_FALSE")
        },
        successAddedToTrue({commit}){
            commit('SUCCESS_ADDED')
        },
        resetDeleteStatus({commit}){
            commit("RESET_DELETE_STATUS")
        }
    },
    modules: {

    },
}

export default store