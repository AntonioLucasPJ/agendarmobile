import { createContext, useContext, useEffect, useState } from "react";
import { FaS, FaSlack } from "react-icons/fa6";
import api from "../constants/api.js";
import { AuthContext } from "./auth";
import { ConstructionIcon } from "lucide-react-native";
export const LoginContext = createContext({})
export const LoginProvider = ({ children }) => {
    const [loading, setloading] = useState(false)
    const [loginemail, setloginemail] = useState('')
    const [loginpassword, setloginpassword] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    const [statusapi,setstatusapi] = useState('')
    const [msgnotification, setmsgnotification] = useState('')
    const { user, setuser } = useContext(AuthContext)
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    // useEffect(()=>{
    //     // console.log(activenotification)
    // },[activenotification])
    async function AcessLogin() {
        try {
            setloading(true)
            const response = await api.post('/users/login', {
                email:loginemail,
                password:loginpassword
            })
            if (response.data) {
                await awaiting(2500)
                api.defaults.headers.common['Authorization'] = `Bearer` + response.data.token;
                setuser(response.data)
                setstatusapi(response.status)
                setloading(false)
                props.navigation.navigate("home")
            }
        } catch (error) {
            setloading(true)
            if (error.response.data.message) {
                await awaiting(2500)
                setloading(false)
                setactivenotification(true)
                setstatusapi(error.status)
                setmsgnotification(error.response.data.message)
            } else {
                setloading(false)
                setactivenotification(true)
                setmsgnotification(error.response.data.message)
            }
        } 
    }
    return (
        <LoginContext.Provider value={{ loading,statusapi,msgnotification, activenotification,setactivenotification, setloading, loginemail, setloginemail, loginpassword, setloginpassword, AcessLogin }}>{children}</LoginContext.Provider>
    )
}