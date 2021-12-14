import axios from "axios"

const store = {
    namespaced: true,
    state:{
        firstname: '',
        lastname: '',
        token: '',
        email: '',
    },
    getters:{
        getInfo: state => state,
        getToken: state => state.token,
    },
    mutations:{
        SET_INFO(state,data){
            state.firstname = data.firstname,
            state.lastname = data.lastname,
            state.email = data.email
        }
    },
    actions:{
        fetchInfo({commit},payload){
            const authUser = JSON.parse(payload)
            commit('SET_INFO',authUser)
        },
        updateInfo({commit},payload){
            axios.post('/admin/profile/update?_method=PATCH',payload.payload,{
                headers:{
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${payload.token}`
                }
            })
            .then(res  => {
                commit('SET_INFO',res.data)
            })
            .catch(err => console.log(err))
        }
    },
}


export default store