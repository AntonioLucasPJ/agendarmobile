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
import { ModalCustom } from "../../components/modalcustom/index.jsx";
export function Calendary() {
    const [appointments, setappointments] = useState("")
    const { user } = useContext(AuthContext)
    const {
        reservation,
        activenotificationcalendary,setactivenotificationcalendary,
        statusapi,
        msgnotificationcalendary,setmsgnotificationcalendary,
        loandcalendary,setloandcalendary,
        updatescreen,
        DeleteReservar,
        Loadrese } = useContext(ReservationContext)
    useEffect(() => {
        Loadrese()
    }, [updatescreen])
    return (
        <View style={styles.container}>
            {loandcalendary ?
                <Loading visible={loandcalendary}></Loading>
            :''
            }
            {activenotificationcalendary?
                <ModalCustom msgmodal={msgnotificationcalendary} statusapi={statusapi} onClose={()=>setactivenotificationcalendary(!activenotificationcalendary)}></ModalCustom>
            :''
            }
            <FlatList
                data={reservation}
                keyExtractor={(appoint) => appoint.id_appointment}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <Agendamento
                        servico={item.service}
                        mecanico={item.mecanico}
                        especialidade={item.especializacao}
                        price={item.price}
                        imgcalendar={icon.calendar}
                        booking_date={item.booking_date}
                        imgwatch={icon.relogio}
                        booking_hour={item.booking_hour}
                        idappointment={item.id_appointment}
                        onPress={(i) => DeleteReservar(i)}
                    ></Agendamento>
                }}
            ></FlatList>

        </View>
    )
}