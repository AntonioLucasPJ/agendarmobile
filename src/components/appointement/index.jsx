import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { styles } from './index.js'
import { Button } from "../button/button.jsx";
import { AuthContext } from "../../contexts/auth.js";
import { useContext, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from "expo-linear-gradient";
import api from "../../constants/api.js";
export function Agendamento(props) {
    const { user } = useContext(AuthContext)
    const dt = new Date(props.booking_date + 'T' + props.booking_hour)

    return (
        <View key={props.idappointment} style={styles.card}>
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name='engine'
                        size={38}
                        color='#475569'
                    />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.serviceName} numberOfLines={1}>
                    {props.servico} - <Text style={styles.mechanicName}>{props.mecanico}</Text>
                </Text>
                <Text
                style={styles.description}
                >
                    Agendado para: {props.booking_date} as {props.booking_hour}
                </Text>
                <Text
                style={styles.speacialtyText}>
                    {props.especialidade}
                </Text>
            </View>
            <View
            style={styles.bottomRow}>
                <View
                style={styles.priceBadge}>
                    <Text
                    style={styles.priceText}> R$ {props.price}</Text>
                </View>
                <TouchableOpacity
                onPress={()=> props.onPress(props.idappointment)}
                activeOpacity={0.8}>
                    <LinearGradient
                    colors={['#1e3a8a','#ca8a04']}
                    start={{x:0,y:0}}
                    end={{x:1,y:0}}
                    style={styles.btnAction}>
                        <Text style={styles.btnText}>CANCELAR</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>

    )
}