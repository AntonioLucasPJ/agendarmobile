import { FlatList, View } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";

import { Mecanico } from "../../components/mecanico/index.jsx";
import { Agendamento } from "../../components/appointement/index.jsx";
import api from "../../constants/api.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.js";
import { ReservationContext } from "../../contexts/reservation.jsx";
import Loading from "../../components/loading/index.jsx";
export function Calendary() {
    const [appointments, setappointments] = useState("")
    const { user } = useContext(AuthContext)
    const { reservation, loand, Loadrese } = useContext(ReservationContext)
    function LoadData(){
        Loadrese()
    }
    useEffect(() => {
        LoadData()
    },[])
    useEffect(()=>{
        console.log(loand)
    })
    return (

        <View style={styles.container}>
            {loand ?
                <Loading visible={loand}></Loading>
                :
                <FlatList
                    data={reservation}
                    keyExtractor={(appoint) => appoint.id_appointment}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
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
            }
        </View>
    )
}