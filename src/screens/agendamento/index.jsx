import { Alert, Text, View } from "react-native";
import { styles } from './index.js'
import { Button } from "../../components/button/button.jsx";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../constants/calendar.js";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.js";
import { Picker } from "@react-native-picker/picker";
import api from "../../constants/api.js";

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = 'pt-br'
export function Schedule(props) {
    const { user } = useContext(AuthContext);
    const id_mecanico = props.route.params.id_mecan;
    const id_service = props.route.params.id_service;
    const [selectdate, setselectdate] = useState('')
    const [booking_hour, setbooking_hour] = useState('10:00');
    async function AdicionarReserva() {
        console.log(user.id_user)
        let iduser = user.id_user
        const booking_date = selectdate.toString().split('T')[0]
        if (booking_date && booking_hour != "") {
            try {
                const res = await api.post('/appointements', {
                    id_mecanico,
                    id_service,
                    id_user:iduser,
                    booking_date,
                    booking_hour
                })
                Alert.alert(res.data.message)
                setTimeout(() => {
                    props.navigation.navigate('main')
                }, 3000)
            } catch (error) {
                console.log(error.respose.data)
            }
        } else {
            Alert.alert('Selecione a Data')
        }

    }

    //Calendario 
    //https://github.com/wix/react-native-calendars.git
    return (
        <View style={styles.container}>
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
                    onPress={() => AdicionarReserva()}></Button>
            </View>
        </View>
    )
}