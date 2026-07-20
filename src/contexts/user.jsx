
import { createContext, useContext, useState } from "react";
import api from "../constants/api";
import { FaS } from "react-icons/fa6";
import { Flashlight, Ruler } from "lucide-react-native";
import { AuthContext } from "./auth";
export const SingupContext = createContext({})
export const SingupProvider = ({ children }) => {
    const { setuser } = useContext(AuthContext)
    const [loading, setloading] = useState(false)
    const [user, setsinguser] = useState('')
    const [cpf, setcpf] = useState('')
    const [email, setsingemail] = useState('')
    const [telefone, settelefone] = useState('')
    const [password, setsingpassword] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const [statusapi, setstatusapi] = useState('')
    const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    async function CreateNewUser() {
        const dadosparaapi = {
            name: user,
            cpf: cpf,
            email: email,
            telefone: telefone,
            password: password,
        }
        try {
            setloading(true)
            await waiting(2500)
            const response = await api.post('/users/singup', dadosparaapi)
            if (response.data) {
                setstatusapi(response.status)
                setactivenotification(true)
                setmsgnotification(response.data.message)
                await waiting(2500)
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.users.token}`
                setuser(response.data.users)
            }
        } catch (error) {
            if (error.response.data) {
                setloading(true)
                await waiting(2500)
                setstatusapi(error.response.status)
                setactivenotification(true)
                setmsgnotification(error.response.data)

            } else {
                Alert.alert('Error de conexão, tente novamente')
                console.log(error.response.data.error)
            }
        } finally {
            setloading(false)
        }

    }

    return (
        <SingupContext.Provider value={{ loading, setloading, user, setsinguser, cpf, setcpf, email, setsingemail, telefone, settelefone, password, setsingpassword, activenotification, setactivenotification, statusapi, msgnotification, setmsgnotification, CreateNewUser }}>{children}</SingupContext.Provider>
    )
}