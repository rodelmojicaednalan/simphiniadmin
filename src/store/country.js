import axios from 'axios'


const store = {
    namespaced: true,
    state: {
        fields: [ "id", "name", "code", "nationality", "hashedid"],
        countries: [],
        country: [],
        errors: {},
        results: {},
        length: 1, 
        message: ''
    },
    getters: {
        showDatas: state => {
            return state.countries.map( (data, index) => {
                data.index = index + 1;
                return data
            });
        },
        paging: state => {
            return state.countries.length;
        },
        getLength: () => {
            return this.showDatas.length
        },
        showData: state => {
            return state.country.map( data => {
                return data
            });
        },
        getResults: state => state.results,

    },
    mutations: {
        FETCH_DATAS(state,countries){
            state.countries = countries;
            state.length = countries.length;
        },
        GET_DATA(state,country){
            state.country = country;
        },
        SET_ERRORS(state,errors){
            state.errors = errors
        },
        SET_RESULTS(state, results){
            state.results = results
        }
    },
    actions: {
        addCountry({commit},payload){
            let currentUser = localStorage.getItem("authuser");
            payload.author_id = JSON.parse(currentUser).id
            payload.is_admin = 1
            axios.post('/picklists/countries',payload,{
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
        updateCountry({commit},payload){
            let currentUser = localStorage.getItem("authuser");
            payload.author_id = JSON.parse(currentUser).id
            payload.is_admin = 1
            axios.post(`/picklists/countries/${payload.hashedId}`,payload,{
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
            axios.delete(`/picklists/countries/${payload.hashedid}/${payload.author_id}`,payload,{
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
            axios.get('/picklists/countries',{
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
            axios.get(`/picklists/countries/${hashedid}/edit`,{
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
        }
    },
    modules: {

    },
}

export default store