
import { FontAwesome6 } from '@expo/vector-icons'
import { styles } from './index.js'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
export function Vehicle(props) {
    const isSelected = String(props.idselected) === String(props.idvehicle);
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.vehicleCardHorizontal,
                isSelected && styles.cardSelecionado]}
            onPress={() => props.onselectedvehicle(props.idvehicle, props.license_plate)}
        >
            <View style={styles.cardTopRow}>
                <View style={styles.brandBadge}>
                    <FontAwesome6 name='circle-check' size={14} color='#3182C3'></FontAwesome6>
                    <Text style={styles.vehicleBrandText}>{props.brand || 'Generic Marcs'}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=> setMenuOpen(!menuOpen)}
                    activeOpacity={0.6}
                    style={styles.dotsTouch}>
                    <MaterialCommunityIcons name='dots-horizontal' size={24} color='#94A3B8'></MaterialCommunityIcons>

                </TouchableOpacity>
                {menuOpen && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={()=>{
                                setMenuOpen(false);
                                if(props.onEdit) props.onEdit(props.idvehicle)
                            }}
                        >
                            <MaterialCommunityIcons name='pencil' size={24} color='#002F6C'></MaterialCommunityIcons>
                            <Text style={styles.dropdownText}>Editar</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                        <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={()=>{
                            setMenuOpen(false)
                            if(props.onDelete) props.onDelete(props.idvehicle)
                        }}
                        >
                            <MaterialCommunityIcons name='trash-can' size={16} color="#DC2626"></MaterialCommunityIcons>
                            <Text style={[styles.dropdownText, {color:'#CD2626'}]}>Deletar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View
                style={styles.vehicleCardContent}>
                <Image
                    style={styles.vehicleImageRealHorizontal}
                    resizeMode='contain'
                    source={{ uri: props.imagecar }}
                ></Image>
                <View style={styles.vehicleDetailsHorizontal}>
                    <Text style={styles.modelTextHorizontal} numberOfLines={1}>
                        {props.model}
                    </Text>

                    <View style={styles.plateBadgeHorizontal}>
                        <View style={styles.plateBlueBar}></View>
                        <Text style={styles.plateTextHorizontal}>{props.license_plate || 'OIZ-33D'}</Text>
                    </View>
                    <Text style={styles.colorTextHorizontal}>Cor:  {props.color || 'Red'}</Text>
                </View>
            </View>
            <View style={styles.cardFooterRow}>
                <View style={styles.statusDotHorizontal}></View>
                <Text style={styles.statusTextHorizontal}>Pronto para uso</Text>
            </View>
        </TouchableOpacity>

    )
}