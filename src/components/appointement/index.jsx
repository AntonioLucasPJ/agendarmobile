import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { styles } from './index.js'
import { Button } from "../button/button.jsx";
import { AuthContext } from "../../contexts/auth.js";
import { useContext, useEffect } from "react";
import api from "../../constants/api.js";
export function Agendamento(props) {
    const {user} = useContext(AuthContext)
    const dt = new Date(props.booking_date + 'T' + props.booking_hour)
    async function DeleteReservar(){
        try {
            const res = await api.delete(`/appointments/${props.idappointment}`)
            console.log(res.data)
        }catch(error){
            console.log(error.reponse.data)
        }
    }

    return (
        <View key={props.idappointment} style={styles.appointemet}>
            <Text style={styles.name}>{props.servico} - {props.mecanico}</Text>
            <Text style={styles.especia}>{props.especialidade}</Text>
            <View  style={styles.container}>
                <View style={styles.cards}>
                    <View style={styles.cardone}>
                        <Image style={styles.imgagendamento} source={props.imgcalendar}></Image>
                        <Text style={styles.textd}>{dt.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.cardtwo}>
                        <Image style={styles.imgagendamento} source={props.imgwatch}></Image>
                        <Text style={styles.textd}>{props.booking_hour}h</Text>
                    </View>
                </View>
                <View style={styles.div}>
                    <Button
                    corbotao='red' 
                    text='Cancelar Reseva'
                    onPress={DeleteReservar}></Button>
                </View>
            </View>
        </View>
    )
}