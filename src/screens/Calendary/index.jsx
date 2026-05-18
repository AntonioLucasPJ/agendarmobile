import { FlatList, View } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";

import { Mecanico } from "../../components/mecanico/index.jsx";
import { Agendamento } from "../../components/appointement/index.jsx";
import api from "../../constants/api.js";
import { useEffect, useState } from "react";
export function Calendary() {
    const [appointments,setappointments] = useState("")
    async function LoadAgendas(){
        try{
            const res = await api.get(`/appointements`)
            setappointments(res.data.reservas)
        }catch(error){
            console.log(error.data)
        }
    }
    useEffect(()=>{
        LoadAgendas()
    },)
    return (
        <View style={styles.container}>
            <FlatList
            data={appointments}
            keyExtractor={(appoint)=> appoint.id_appointment}
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>{
                return <Agendamento 
                servico={item.service}
                mecanico={item.mecanico}
                especialidade={item.specialty}
                imgcalendar={icon.calendar}
                booking_date={item.booking_date}
                imgwatch={icon.relogio}
                booking_hour={item.booking_hour}
                idappointment={item.id_appointment}
                ></Agendamento>
            }}
            ></FlatList>
        </View>  
    )
}