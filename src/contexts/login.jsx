import { createContext } from "react";

export const LoginContext = createContext({})
export const LoginProvider = ({ children }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    async function ContextLogin() {
        try {
            const response = await api.post('/users/login', {
                email,
                password
            })
            if (response.data) {
                api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.token;
                setuser(response.data)
            }
        } catch (error) {
            if (error.response.data.message) {
                Alert.alert(error.response.data.message)
            } else {
                Alert.alert("O ocorreu um erro desconhecido tente novamente!")
            }
        }
    }
    return (
        <LoginContext.Provider value={{email,setemail,password,setpassword}}>{children}</LoginContext.Provider>
    )
}