import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from './index.js'
import icon from "../../constants/icon.js";
export function Mecanico(props) {
    return (
        <TouchableOpacity style={styles.container} onPress={()=> props.onPress(props.id_mecanico,props.name,props.specialty,props.icon)}>
            <Image source={props.icon == 'M'? icon.medico:icon.medica} style={styles.img}></Image>
            <View style={styles.infor1}>
                <Text style={styles.titlemecanico}>{props.name}</Text>
                <Text style={styles.subtitle}>{props.specialty}</Text>
            </View>

        </TouchableOpacity>
    )
}