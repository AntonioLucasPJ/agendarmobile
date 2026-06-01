import { createContext,useContext,useState } from "react";
import Reservation from "react-native-calendars/src/agenda/reservation-list/reservation";

export const MecanicoContext = createContext({})
export const MecanicoProvider = ({children}) => {
    const [id_selectmecanico,setidselectmecanico] = useState('')
    const [name_selectmecanico,setname_selectmecanico] = useState('')
    const [specialty_selectmecanico,setspecialty_selectmecanico] = useState('')
    const [icon_selectmecanico,seticon_selectmecanico] = useState('')
    const [avatar_selectmecanico,setavatar_selectmecanico] = useState('')
    const [service_selectmecanico,setservice_selectmecanico] = useState('')
    return (
        <MecanicoContext.Provider value={{id_selectmecanico,setidselectmecanico,name_selectmecanico,setname_selectmecanico,specialty_selectmecanico,setspecialty_selectmecanico,icon_selectmecanico,seticon_selectmecanico,avatar_selectmecanico,setavatar_selectmecanico,service_selectmecanico,setservice_selectmecanico}}>{children}</MecanicoContext.Provider>
    )
}