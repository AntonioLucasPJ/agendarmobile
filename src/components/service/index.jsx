import { Text, Touchable, TouchableOpacity, View, Linea } from "react-native"
import { Button } from '../button/button.jsx'
import { styles } from './index.js'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { Icon } from "lucide-react-native";
import { useEffect } from "react";
export function MeetService(props) {
    const renderServiceIcon = (IconName) => {
        if (IconName === 'engine') {
            return(
            <MaterialCommunityIcons name='engine' size={25} color='#334155'></MaterialCommunityIcons>)
        } else if (IconName === 'calendar-check') {
            return(
            <MaterialCommunityIcons name='calendar-check' size={25} color='#334155'></MaterialCommunityIcons>)
        }
        return (<FontAwesome name='screwdriver-wrench' size={40} color='#334155'></FontAwesome>)
    }
    return (
        <View style={styles.serviceCard}>
            <View style={styles.serviceTopRow}>
                <View style={styles.iconContainer}>
                    {renderServiceIcon(props.id_icon)}
                </View>
                <View style={styles.serviceTextContainer}>
                    <Text style={styles.serviceName}>{props.service}</Text>
                    <Text style={styles.serviceDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ab, iusto, molestiae minima rerum laudantium aut at nihil natus dignissimos ipsam! Natus inventore asperiores nemo quam perspiciatis et reiciendis doloremque?</Text>
                </View>
            </View>
            <View style={styles.serviceBottomRow}>
                <View style={styles.priceBadge}>
                    <Text style={styles.priceText}>
                        R$ {props.price}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => props.onPress(props.id_service)}
                >
                    <LinearGradient
                        colors={['#1e40af', '#ea580c']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.btnAgendar}

                    >
                        <Text style={styles.btnText}>Agendar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>

    )
}