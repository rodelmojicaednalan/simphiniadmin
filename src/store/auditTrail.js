import axios from 'axios'
import moment from 'moment'

const store = {
    namespaced: true,
    state: {
        fields: ['id', 'display_logged_date', 'module', 'what_action', 'description', 'client_id', 'author_id'],
        logs: [],
        errors: {},
        results: {},
        length: 1, 
        message: ''
    },
    getters: {
        showDatas: state => {
            return state.logs.map( (data, index) => {
                if (index % 2 == 0) {
                    data.alignment = "left"
                } else {
                    data.alignment = "right"
                }

                const dateNow = moment(new Date())
                const dateLogged = moment(data.logged_date)
                dateLogged._i = dateLogged._d
                const duration = moment.duration(dateNow.diff(dateLogged));
                data.duration = duration.humanize() + ' ago'
                data.index = index + 1;
                return data
            });
        },
        paging: state => {
            return state.logs.length;
        },
        getLength: () => {
            return this.showDatas.length
        },
        getResults: state => state.results,

    },
    mutations: {
        FETCH_DATAS(state,logs){
            state.logs = logs;
            state.length = logs.length;
        },
        SET_ERRORS(state,errors){
            state.errors = errors
        },
        SET_RESULTS(state, results){
            state.results = results
        }
    },
    actions: {
        deleteData({commit}, payload){
            axios.delete(`/picklists/countries/${payload.hashedid}`,payload,{
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
            axios.get('/reports/audit_trail',{
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
    },
}

export default store
