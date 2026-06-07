
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons'
import {styles} from './index.js'
import { Image,View } from 'react-native'

export function Vehicle(props){
    return(
        <View style={styles.vehicleCardHorizontal}>
            <View style={styles.cardTopRow}>
                <View style={styles.brandBadge}>
                    <MaterialCommunityIcons name='shield-check' size={14}></MaterialCommunityIcons>
                    <Text style={styles.vehicleBrandText}>{props.brand|| 'Generic Marcs'}</Text>
                </View>
                <Ionicons name='elipsis-horizontal' size={24} color='#94A3B8'></Ionicons>
            </View>
            <View
            style={styles.vehicleCardContent}>
                <Image
                    style={styles.vehicleImageRealHorizontal}
                    resizeMode='contain'
                    source={{uri:'https://res.cloudinary.com/dniwjfgal/image/upload/v1780599613/car-onix_eg5us5.png'}}
                ></Image>
                <View style={styles.plateBadgeHorizontal}>
                    <View style={styles.plateBlueBar}></View>
                    <Text style={styles.plateTextHorizontal}>{props.license_plate ||'OIZ-33D'}</Text>
                </View>
                <Text style={styles.colorTextHorizontal}>Cor:{props.color |'Red'}</Text>
            </View>
            <View style={styles.cardFooterRow}>
                <View style={styles.statusDotHorizontal}></View>
                <Text style={styles.statusTextHorizontal}>Pronto para uso</Text>
            </View>
        </View>

    )
}