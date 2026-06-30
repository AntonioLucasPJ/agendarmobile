import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from './index.js'
import icon from "../../constants/icon.js";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { PiOrange } from "react-icons/pi";
import { useEffect } from "react";
export function Mecanico(props) {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: props.avatar }}
                style={styles.avatar}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.titleText}>{props.titulo_profissional}</Text>
                <Text style={styles.specialtyText}>{props.especiality}</Text>
                <View style={styles.headerRow}>
                    <Text style={styles.nameText}>{props.name}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>
                            {props.avaliacao ? Number(props.avaliacao).toFixed(1) : '5.0'}
                        </Text>
                        <FontAwesome name="star" size={12} color='#f59e0b' solid></FontAwesome>
                    </View>
                </View>
                <View style={styles.iconsRow}>
                    <MaterialCommunityIcons name="engine" size={20} color='#64848b' style={styles.iconItem} />
                    <MaterialCommunityIcons name="car-battery" size={18} color='#64848b' style={styles.iconItem} />
                    <FontAwesome name="gear" size={16} color='#64848b' style={styles.iconItem} />
                    <FontAwesome name="wrench" size={15} color='#64848b' style={styles.iconItem} />
                </View>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.expBadge}>
                    <Text style={styles.expText}>{props.experiencia || '15+anos'}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => props.onPress(props.id_mecanico,props.name, props.especiality, props.icon,props.avatar)}>
                    <Text style={styles.buttonText}>Selecionar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}