
import { FontAwesome6 } from '@expo/vector-icons'
import {styles} from './index.js'
import { Image,View,Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
export function Vehicle(props){
    const isSelected = String(props.idselected) === String(props.idvehicle);
    console.log('Card do carro',props.model,'|Id do carro:',props.idvehicle, "| ID Selecionado no App:", props.idselected)
    return (
        <TouchableOpacity
        activeOpacity={0.9}
        style={[
            styles.vehicleCardHorizontal,
            isSelected && styles.cardSelecionado] }
        onPress={()=> props.onselectedvehicle(props.idvehicle)}
        >
            <View style={styles.cardTopRow}>
                <View style={styles.brandBadge}>
                    <FontAwesome6 name='circle-check' size={14} color='#3182C3'></FontAwesome6>
                    <Text style={styles.vehicleBrandText}>{props.brand|| 'Generic Marcs'}</Text>
                </View>
                <MaterialCommunityIcons name='dots-horizontal' size={24} color='#94A3B8'></MaterialCommunityIcons>
            </View>
            <View
            style={styles.vehicleCardContent}>
                <Image
                    style={styles.vehicleImageRealHorizontal}
                    resizeMode='contain'
                    source={{uri:props.imagecar}}
                ></Image>
                <View style={styles.vehicleDetailsHorizontal}>
                    <Text style={styles.modelTextHorizontal} numberOfLines={1}>
                        {props.model}
                    </Text>
                
                    <View style={styles.plateBadgeHorizontal}>
                        <View style={styles.plateBlueBar}></View>
                        <Text style={styles.plateTextHorizontal}>{props.license_plate ||'OIZ-33D'}</Text>
                    </View>
                    <Text style={styles.colorTextHorizontal}>Cor:  {props.color ||'Red'}</Text>
                </View>
            </View>
            <View style={styles.cardFooterRow}>
                <View style={styles.statusDotHorizontal}></View>
                <Text style={styles.statusTextHorizontal}>Pronto para uso</Text>
            </View>
        </TouchableOpacity>

    )
}