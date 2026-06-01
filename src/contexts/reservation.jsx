import { createContext, useContext, useState } from "react";
import api from "../constants/api";
import { AuthContext } from "./auth";
import { useNavigation } from "@react-navigation/native";
import { MecanicoContext } from "./mecanico";
export const ReservationContext = createContext({})
export const ReservationProvider = ({ children }) => {
    const {
        id_selectmecanico, setid_selectmecanico,
        service_selectmecanico
    } = useContext(MecanicoContext)
    const navigation = useNavigation()
    const { user } = useContext(AuthContext)
    const [loand, setloand] = useState(false)
    const [horariosdisponiveis, sethorariosdisponiveis] = useState([])
    const [loadinghours, setloadhours] = useState(false)
    const [updatescreen, setupdatescreen] = useState(false)
    const [loandcalendary, setloandcalendary] = useState(false)
    const [reservation, setreservation] = useState([])
    const [id_mecan, setidmecan] = useState('')
    const [id_service, setidservice] = useState('')
    const [selectdate, setselectdate] = useState('')
    const [booking_hour, setbooking_hour] = useState('');
    const [statusapi, setstatusapi] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const [activenotificationcalendary, setactivenotificationcalendary] = useState(false)
    const [msgnotificationcalendary, setmsgnotificationcalendary] = useState('')
    const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    let iduser = user.id_user
    // const booking_date = selectdate.toString().split('T')[0]
    async function Loadrese() {
        setloandcalendary(true)
        try {
            await waiting(1500)
            const res = await api.get(`/appointements`)
            setreservation(res.data)
            setloandcalendary(false)

        } catch (error) {
            await waiting(1500)
            setloandcalendary(false)
            console.log(error)
        }
    }
    async function CheckhoursAvaileble() {
        const dadosapi = {
            id_mecanico: id_selectmecanico,
            booking_date: selectdate
        }
        try {
            const res = await api.post('/appointements/check', dadosapi)
            const horariospadrao = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
            const horariosocupados = res.data
            sethorariosdisponiveis(res.data)
            const validarhorariosdinamicos = ()=>{
                const lista = horariospadrao.map(hora =>{
                    return{
                        hora:hora,
                        disponivel:!horariosocupados.includes(hora)
                    }
                })
                console.log(lista)
            }
        } catch (error) {
            console.log(error.status)
        }
    }
    async function Createappointment() {
        const dadosparaapi = {
            id_mecanico: id_selectmecanico,
            id_service: service_selectmecanico,
            id_user: user.id_user,
            booking_date: booking_date,
            booking_hour: booking_hour
        }
        if (booking_date && booking_hour != "") {
            setloand(true)
            try {
                const res = await api.get('/appointements', dadosparaapi)
                await waiting(1500)
                setloand(false)
                setstatusapi(res.status)
                setmsgnotification(res.data.message)
                setactivenotification(true)
            } catch (error) {
                await waiting(1500)
                console.log(error)
                setloand(false)
                setactivenotification(true)
                setmsgnotification(error.respose.data)
            }
        } else {
            Alert.alert('Selecione a Data')
        }
    }
    async function DeleteReservar(id_appointment) {
        setloandcalendary(true)
        try {
            const res = await api.delete(`/appointments/delete/${id_appointment}`)
            await waiting(1500)
            setstatusapi(res.status)
            setloandcalendary(false)
            setmsgnotificationcalendary(res.data)
            setactivenotificationcalendary(true)
            setupdatescreen(true)
        } catch (error) {
            await waiting(1500)
            setloandcalendary(false)
            console.log(error)
        }
    }
    return (
        <ReservationContext.Provider value={{ id_mecan, setidmecan, loadinghours, horariosdisponiveis, id_service, setidservice, reservation, loand, loandcalendary, updatescreen, setloandcalendary, statusapi, setactivenotification, activenotification, activenotificationcalendary, setactivenotificationcalendary, msgnotification, setmsgnotification, msgnotificationcalendary, selectdate, setselectdate, booking_hour, setbooking_hour, CheckhoursAvaileble, Createappointment, Loadrese, DeleteReservar }}>{children}</ReservationContext.Provider>
    )
}