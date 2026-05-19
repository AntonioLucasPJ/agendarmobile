import axios from 'axios'


const api= axios.create({
    baseURL:'http://10.49.20.254:3000'
})

export default api