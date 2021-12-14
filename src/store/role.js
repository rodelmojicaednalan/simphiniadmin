import axios from 'axios'
import { capitalizeFirstLetter } from '../helpers/helpers'

const headersConfig = (token) => {
    return {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
}

const store = {
    namespaced: true,
    state: {
       options: [],
       error: null,
    },
    getters:{
        getOptions: state => state.options
    },
    mutations: {
        SET_ROLES(state,data){
            state.options = [{value: "", text:"Please select a role", disabled: true}]
            data.map(option => {
                state.options.push({
                    value: option.id,
                    text: capitalizeFirstLetter(option.name),
                    disabled: false,
                })
            })
            console.log(state.options)
        },
        SET_ERROR(state,error){
            state.error = error
        }
    },
    actions: {
        getRoles({commit},payload){
            axios.get('/admin/role',headersConfig(payload.token))
            .then(res => {
                if(res.status){ 
                    commit("SET_ROLES",res.data.data)
                } else {
                    commit("SET_ERROR",res.message)
                }
            })
        }
    }
}


export default store