import { Text, Touchable, TouchableOpacity, View, Linea } from "react-native"
import { Button } from '../button/button.jsx'
import { styles } from './index.js'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { Icon } from "lucide-react-native";
import { useEffect } from "react";
export function MeetService(props) {
    const MapeamentosIcones = ({ nomeicone }) => {
        const name = nomeicone?.toLowerCase()
        switch (name) {
            case "lightning-bolt-outline":
                return <MaterialCommunityIcons name={name} size={25} color='#2b4c7e' />
            case "car-brake-abs":
                return <MaterialCommunityIcons name={name} size={25} color='#2b4c7e'></MaterialCommunityIcons>
            case "engine-outline":
                return <MaterialCommunityIcons name={name} size={25} color='#2b4c7e'></MaterialCommunityIcons>

            default:
                return <MaterialCommunityIcons name="cog" size={25} color="#64748b" />;
        }

    }
    const formatarvalor = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor)
    }

    return (
        <View style={[styles.serviceCard, { width: props.card_width }]}>
            <View style={styles.cubeGrid}>
                <View style={styles.iconContainerCube}>
                    <MapeamentosIcones nomeicone={props.id_icon}></MapeamentosIcones>
                </View>
                <View style={styles.textContainerCube}>
                    <Text style={styles.serviceNameCube} numberOfLines={2}>{props.service}</Text>
                </View>
                <View style={styles.bottomRowCube}>
                    <TouchableOpacity
                        key={props.id_service.toString()}
                        style={[styles.cubeCard, { width: props.CARD_WIDTH }]}
                        activeOpacity={0.8}
                        onPress={() => props.onPress(props.id_service, props.service)}
                    >
                        <LinearGradient
                            colors={['#1e40af', '#ea580c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.btnAgendarCube}
                        >
                            <Text style={styles.btnTextCube}>Selecionar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}