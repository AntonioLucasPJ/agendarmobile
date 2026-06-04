import { FlatList, Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { Mecanico } from "../../components/mecanico/index.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import api from "../../constants/api.js";

//Acess UseCotext

import { AuthContext } from "../../contexts/auth.js";
import { MecanicoContext } from "../../contexts/mecanico.jsx";
export function TelaHome(props) {
    const { user } = useContext(AuthContext)
    const [mecanicos, setmecanicos] = useState('')
    const [vehicle, setvehicle] = useState('')
    const {
        id_selectmecanico, setidselectmecanico,
        name_selectmecanico, setname_selectmecanico,
        specialty_selectmecanico, setspecialty_selectmecanico,
        icon_selectmecanico, seticon_selectmecanico,
        avatar_selectmecanico, setavatar_selectmecanico,
    } = useContext(MecanicoContext)
    function ClickMecanico(id_mecanico, name, specialty, icon, avatar) {
        setidselectmecanico(id_mecanico)
        setname_selectmecanico(name)
        setspecialty_selectmecanico(specialty)
        seticon_selectmecanico(icon)
        setavatar_selectmecanico(avatar)
        props.navigation.navigate("services", {
            id_mecanico, name, specialty, icon, avatar
        })
    }
    async function LoadHome() {
        try {
            const res = await api.get("/mecanicos")
            setmecanicos(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        LoadHome()
    }, [])
    const RenderHeader = () => (
        vehicle ? (
            <View style={styles.card} >
                <Text style={styles.welcomeText}>Ola, {user.name}</Text>
                <Text style={styles.cardTitle}>Seu veiculo</Text>
                <View style={styles.vehicleInfoContainer}>
                    <Image
                        style={styles.vehicleImageReal}
                        resizeMode='cover'
                        source={{ uri: 'https://res.cloudinary.com/dniwjfgal/image/upload/v1780599613/car-onix_eg5us5.png' }}>

                    </Image>
                    <View style={styles.vehicleDetails}>
                        <Text style={styles.vehicleDetails}>Modelo:Onix Plus</Text>
                        <Text style={styles.vehicleDetails}>Placa:OIZ-3H80</Text>
                        <Text style={styles.vehicleDetails}>Cor:Cinza</Text>
                        <View style={styles.statusBadge}>
                            <View style={[styles.statusDot]}></View>
                            <Text style={styles.statusText}>Status:200</Text>
                        </View>
                    </View>
                </View>
            </View >
        ) : (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Cadastre seu veiculo</Text>
                <View style={styles.emptyStateContainer}>
                    <MaterialCommunityIcons name='garage-alert' size={70} color='#A0AEC0'></MaterialCommunityIcons>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => props.navigation.navigate('vehicle')}

                    >
                        <Text style={styles.addButtonText}>Adicionar Veiculo</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    );
    return (
        <SafeAreaView style={styles.safearea}>
            <FlatList
                data={mecanicos}
                keyExtractor={(doc) => doc.id_mecanico}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={RenderHeader}  
                scrollEnabled={true}
                renderItem={({ item }) => {
                    return <Mecanico
                        id_mecanico={item.id_mecanico}
                        name={item.name}
                        titulo_professional={item.titulo_profissional}
                        avatar={item.avatar_url}
                        avaliacao={item.avaliacao}
                        experiencia={item.experiencia}
                        icon={item.icon}
                        especiality={item.specialty}
                        onPress={ClickMecanico}
                    ></Mecanico>
                }}
            ></FlatList>
        </SafeAreaView>


    )
}