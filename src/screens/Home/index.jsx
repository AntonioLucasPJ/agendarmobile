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
import { Vehicle } from "../../components/vehicle/index.jsx";

const RenderHeader = ({vehicle,user,selectvehicleid,setselectvehicleid,navigation}) => {
    const dadosCarrocel = [...vehicle, { id_vehicle: 'ADD_BUTTON_KEY', isaddItem: true }]
    return (
        <View style={styles.headerContainer}>
            <View style={styles.welcomeRow}>
                <Text style={styles.welcomeText}>Olá, {user?.name || 'Cliente'}</Text>
                <Text style={styles.subWelcomeText}>Seja bem-vindo de volta!</Text>
            </View>
            <Text style={styles.sectionTitle}>Seus Carros</Text>
            <FlatList
                data={dadosCarrocel}
                horizontal
                extraData={selectvehicleid}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                snapToInterval={314}
                decelerationRate='fast'
                contentContainerStyle={styles.carouselContainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    if (item.isaddItem) {
                        return (
                            <TouchableOpacity
                                style={[styles.vehicleCardHorizontal, styles.cardAddVehicleVisual]}
                                onPress={() => props.navigation.navigate('vehicle')}>
                                <MaterialCommunityIcons
                                    name='car-select'
                                    size={40}
                                    color='#002F6C'
                                >
                                    <Text style={styles.addVehicleCardText}> Cadastrar Novo Veiculo</Text>
                                </MaterialCommunityIcons>
                            </TouchableOpacity>
                        )
                    }
                    return <Vehicle
                        idvehicle={item.id || item.id_vehicle}
                        brand={item.brand}
                        imagecar={item.imagemcar}
                        model={item.model}
                        license_plate={item.license_plate}
                        color={item.color}
                        idselected={selectvehicleid}
                        onselectedvehicle={(id) => setselectvehicleid(id)}
                    ></Vehicle>
                }}
            />
        </View >
    )
}
export function TelaHome(props) {
    const { user } = useContext(AuthContext)
    const [mecanicos, setmecanicos] = useState('')
    const [vehicle, setvehicle] = useState([])
    const [brand, setbrand] = useState([])
    const [model, setmodel] = useState([])
    const [license_plate, setlicense_plate] = useState([])
    const [colorcar, setcolorcar] = useState([])
    const [selectvehicleid, setselectvehicleid] = useState('')
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
    async function LoadVehicleClients() {
        try {
            const res = await api.get('/vehicle/searchvehicle')
            setvehicle(res.data)
            if (res.data && res.data.length > 0) {
                console.log(res.data[0].id || res.data[0].id)
            }
            setbrand(res.data.brand)
            setmodel(res.data.model)
            setlicense_plate(res.data.license_plate)
            setcolorcar(res.data.color)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    useEffect(() => {
        LoadHome()
        LoadVehicleClients()
    }, [])

    return (
        <SafeAreaView style={styles.safearea}>
            <FlatList
                data={mecanicos}
                keyExtractor={(doc) => doc.id_mecanico}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={
                    <RenderHeader
                        vehicle={vehicle}
                        user={user}
                        selectvehicleid={selectvehicleid}
                        setselectvehicleid={setselectvehicleid}
                        navigation={props.navigation}
                    >
                    </RenderHeader>
                }
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