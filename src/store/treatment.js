import axios from 'axios'


const store = {
    namespaced: true,
    state: {
        fields: [ "id", "name", "description", "status", "hashedid"],
        treatments: [],
        treatment: [],
        errors: {},
        results: {},
        length: 1, 
        message: ''
    },
    getters: {
        showDatas: state => {
            return state.treatments.map( (data, index) => {
                data.index = index + 1;
                return data
            });
        },
        paging: state => {
            return state.treatments.length;
        },
        getLength: () => {
            return this.showDatas.length
        },
        showData: state => {
            return state.treatment.map( data => {
                return data
            });
        },
        getResults: state => state.results,

    },
    mutations: {
        FETCH_DATAS(state,treatments){
            state.treatments = treatments;
            state.length = treatments.length;
        },
        GET_DATA(state,treatment){
            state.treatment = treatment;
        },
        SET_ERRORS(state,errors){
            state.errors = errors
        },
        SET_RESULTS(state, results){
            state.results = results
        }
    },
    actions: {
        addTreatment({commit},payload){
            let currentUser = localStorage.getItem("authuser");
            payload.author_id = JSON.parse(currentUser).id
            payload.is_admin = 1
            axios.post('/picklists/treatments',payload,{
                headers:{
                    "Accept": 'application/json',
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                commit('SET_RESULTS',res.data)
            })
            .catch( err => {
                let errors = {};
                for(let error in err.response.data.errors){
                    errors[error] =  err.response.data.errors[error][0]
                }
                commit('SET_ERRORS',errors)
            })
        },
        updateTreatment({commit},payload){
            let currentUser = localStorage.getItem("authuser");
            payload.author_id = JSON.parse(currentUser).id
            payload.is_admin = 1
            axios.post(`/picklists/treatments/${payload.hashedId}`,payload,{
                headers:{
                    "Accept": 'application/json',
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                commit('SET_RESULTS',res.data)
            })
            .catch( err => {
                let errors = {};
                for(let error in err.response.data.errors){
                    errors[error] =  err.response.data.errors[error][0]
                }
                commit('SET_ERRORS',errors)
            })
        },
        deleteData({commit}, payload){
            let currentUser = localStorage.getItem("authuser");
            payload.author_id = JSON.parse(currentUser).id
            axios.delete(`/picklists/treatments/${payload.hashedid}/${payload.author_id}`,payload,{
                headers:{
                    "Accept": 'application/json',
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                commit('SET_RESULTS',res.data)
            })
            .catch( err => {
                let errors = {};
                for(let error in err.response.data.errors){
                    errors[error] =  err.response.data.errors[error][0]
                }
                commit('SET_ERRORS',errors)
            })

        },
        fetchDatas({commit}){
            axios.get('/picklists/treatments',{
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json",
                }
            })
            .then(res => {
                res.data.status ? commit('FETCH_DATAS',res.data.data) : console.log("there is an error")
            })
            .catch(err => {
                console.log(err)
            })
        },
        getData({commit}, hashedid){
            axios.get(`/picklists/treatments/${hashedid}/edit`,{
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json",
                }
            })
            .then(res => {
                res.data.status ? commit('GET_DATA',res.data.data) : console.log("there is an error")
            })
            .catch(err => {
                commit('SET_ERRORS',err.response.data.message)
                return false
            })
        },
    },
    modules: {

    },
}

export default store