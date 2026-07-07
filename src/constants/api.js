import axios from 'axios'


const api= axios.create({
    baseURL:'http://10.49.21.74:3000'
})

export default api