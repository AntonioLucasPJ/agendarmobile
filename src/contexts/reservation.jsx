import { createContext, useContext, useState } from "react";
import api from "../constants/api";
import { AuthContext } from "./auth";
import { useNavigation } from "@react-navigation/native";
export const ReservationContext = createContext({})
export const ReservationProvider = ({ children }) => {
    const navigation = useNavigation()
    const { user } = useContext(AuthContext)
    const [loand, setloand] = useState(false)
    const [reservation, setreservation] = useState('')
    const [id_mecanico,setidmecanico] = useState('')
    const [id_service,setidservice] = useState('')
    const [selectdate, setselectdate] = useState('')
    const [booking_hour, setbooking_hour] = useState('10:00');
    const [statusapi,setstatusapi] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    let iduser = user.id_user
    const booking_date = selectdate.toString().split('T')[0]
    async function Loadrese() {
        setloand(true)
        try {
            const res = await api.get(`/appointements`)
            await waiting(1500)
            setloand(false)
            setreservation(res.data)
        } catch (error) {
            await waiting(1500)
            setloand(false)
            console.log(error)
        }
    }
    async function Createappointment() {
        if (booking_date && booking_hour != "") {
            setloand(true)
            try {
                const res = await api.post('/appointements', {
                    id_mecanico:id_mecanico,
                    id_service:id_service,
                    id_user: iduser,
                    booking_date,
                    booking_hour
                })
                await waiting(1500)
                setloand(false)
                setstatusapi(res.status)
                setmsgnotification(res.data.message)
                setactivenotification(true)
                setTimeout(() => {
                    navigation.navigate('main')
                }, 3000)
            } catch (error) {
                await waiting(1500)
                console.log(error)
                setloand(false)
                setactivenotification(true)
                console.log(error.respose.data)
                setmsgnotification(error.respose.data)
                console.log(error)

            }
        } else {

            Alert.alert('Selecione a Data')
        }


    }
    return (
        <ReservationContext.Provider value={{id_mecanico,setidmecanico,id_service,setidservice, reservation, loand,statusapi, setactivenotification, activenotification,msgnotification,setmsgnotification, selectdate, setselectdate, booking_hour, setbooking_hour, Createappointment, Loadrese }}>{children}</ReservationContext.Provider>
    )
}