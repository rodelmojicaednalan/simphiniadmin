import axios from 'axios'

const store = {
    namespaced: true,
    state: {
        fields: [ "company_name", "company_email", "company_address", "contact_number","status", "created_at"],
        successAdded: false,
        clients: [],
        errors: {},
    },
    getters: {
        showClients: state => {
            return state.clients.map( client => {
                delete client.hashid
                return client
            });
        },
        addStatus: state => {
            return state.successAdded
        },
        getErrors: state => {
            return state.errors;
        }
    },
    mutations: {
        FETCH_CLIENT(state,clients){
            state.clients = clients;
        },
        SUCCESS_ADDED_TO_FALSE(state){
            state.successAdded = false;
        },
        SUCCESS_ADDED(state){
            state.successAdded = true;
        },
        SET_ERRORS(state,errors){
            state.errors = errors
        }
    },
    actions: {
        addClient({commit},payload){
            axios.post('/admin/client',payload,{
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
        fetchClients({commit}){
            axios.get('/admin/client',{
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json",
                }
            })
            .then(res => {
                res.data.status ? commit('FETCH_CLIENT',res.data.data.data) : console.log("there is an error")
            })
            .catch(err => {
                console.log(err)
            })
        },
        successAddedToFalse({commit}){
            commit("SUCCESS_ADDED_TO_FALSE")
        },
        successAddedToTrue({commit}){
            commit('SUCCESS_ADDED')
        }
    },
    modules: {

    },
}

export default store