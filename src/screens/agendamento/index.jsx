import { Alert, Text, View } from "react-native";
import { styles } from './index.js'
import { Button } from "../../components/button/button.jsx";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../constants/calendar.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.js";
import { Picker } from "@react-native-picker/picker";
import Loading from "../../components/loading/index.jsx";
import api from "../../constants/api.js";
import { ReservationContext } from "../../contexts/reservation.jsx";
import { ModalCustom } from "../../components/modalcustom/index.jsx";
import { useRoute } from "@react-navigation/native";
import { FaS } from "react-icons/fa6";
LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = 'pt-br'
export function Schedule() {
    const route = useRoute()
    const { user } = useContext(AuthContext);
    const {
        id_mecanico, setidmecanico,
        id_service, setidservice,
        statusapi,
        booking_hour, setbooking_hour,
        selectdate, setselectdate,
        loand,
        activenotification, setactivenotification,
        setmsgnotification,msgnotification,
        Createappointment
    } = useContext(ReservationContext)

    function LoadData() {
        const id_mecanic = route.params.id_mecan
        const id_service = route.params.id_service
        setidmecanico(id_mecanic)
        setidservice(id_service)
        Createappointment()
    }
    
    function CleanNotification(){
        setmsgnotification('')
        setactivenotification(false)
    }
    //Calendario 
    //https://github.com/wix/react-native-calendars.git

    return (
        <View style={styles.container}>
            {loand ?
                <Loading visible={loand}></Loading> :
                ""
            }
            {activenotification ?
                <ModalCustom msgmodal={msgnotification} statusapi={statusapi} onClose={() => CleanNotification()}></ModalCustom>
                : ''
            }
            <View>
                <Calendar theme={styles.theme}
                    onDayPress={(day) => {
                        setselectdate(day.dateString)
                    }}
                    markedDates={{
                        [selectdate]: { selected: true }
                    }}
                    minDate={new Date().toDateString()}
                ></Calendar>
                <View>
                    <Text style={styles.texth}>Horário</Text>
                </View>
                <View>
                    <Picker selectedValue={booking_hour}
                        onValueChange={(itemvalue, itemindex) => {
                            setbooking_hour(itemvalue)
                        }}
                    >
                        <Picker.Item
                            label="09:00" value='09:00'
                        ></Picker.Item>
                        <Picker.Item
                            label="10:00" value='10:00'
                        ></Picker.Item>
                        <Picker.Item
                            label="14:00" value='14:00'
                        ></Picker.Item>
                        <Picker.Item
                            label="15:00" value='15:00'
                        ></Picker.Item>

                    </Picker>
                </View>
            </View>
            <View>
                <Button
                    text='Confirmar reserva'
                    onPress={() => LoadData()}></Button>
            </View>
        </View>
    )
}