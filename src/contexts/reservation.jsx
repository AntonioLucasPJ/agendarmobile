import { createContext, useContext, useState } from "react";
import api from "../constants/api";

export const ReservationContext = createContext({})
export const ReservationProvider = ({ children }) => {
    const [loand, setloand] = useState(false)
    const [reservation, setreservation] = useState('')
    const bandlarg = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    async function Loadrese() {
        setloand(true)
        bandlarg(1500)
        try {
            const res = await api.get(`/appointements`)
            setloand(false)
            setreservation(res.data)
        } catch (error) {
            setloand(false)
            console.log(error)
        }
    }
    return (
        <ReservationContext.Provider value={{ reservation, loand, Loadrese }}>{children}</ReservationContext.Provider>
    )
}