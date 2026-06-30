import { FlatList, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
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
import { TelaCadastroVeiculos } from "../CadastroVeiculos/index.jsx";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MeetService } from "../../components/service/index.jsx";
import Loading from "../../components/loading/index.jsx";

const RenderHeader = ({ vehicle, user, selectvehicleid, setselectvehicleid, onAddVechicle }) => {
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
                                onPress={onAddVechicle}>
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
export function TelaHome({ navigation }) {
    const [loading, setloading] = useState(false)
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)
    const [mecanicos, setmecanicos] = useState([])
    const [services, setservices] = useState([])
    const [vehicle, setvehicle] = useState([])
    const [brand, setbrand] = useState([])
    const [model, setmodel] = useState([])
    const [license_plate, setlicense_plate] = useState([])
    const [colorcar, setcolorcar] = useState([])
    const [selectvehicleid, setselectvehicleid] = useState('')
    const { width } = Dimensions.get("window");
    const CARD_WIDTH = (width - 48) / 2;
    const awaiting = (ms) => new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT_ESTOURADO")), ms)
    );
    const {
        id_selectmecanico, setidselectmecanico,
        name_selectmecanico, setname_selectmecanico,
        specialty_selectmecanico, setspecialty_selectmecanico,
        icon_selectmecanico, seticon_selectmecanico,
        avatar_selectmecanico, setavatar_selectmecanico,
    } = useContext(MecanicoContext)
    function ClickAddVehicle() {
        navigation.navigate("vehicle")
    }
    async function ClickService(id_service) {
        setloading(true)
        try {
            const res = await Promise.race([
                api.get(`/servicesmecanicos/${id_service}`),
                await awaiting(5000)
            ])
            setloading(false)
            setmecanicos(res.data)
            console.log(res.data)

        } catch (error) {
            setloading(false)
            console.log(error)
        }

    }
    async function LoadHome() {
        try {
            const res = await api.get("/servicessearch")
            setservices(res.data)

        } catch (error) {
            console.log(error)
        }
    }
    async function LoadVehicleClients() {
        try {
            const res = await api.post(`/vehicle/searchvehicle/${user.id_user}`)
            setvehicle(res.data)
            if (res.data && res.data.length > 0) {
                // console.log(res.data[0].id || res.data[0].id)
            }
            setbrand(res.data.brand)
            setmodel(res.data.model)
            setlicense_plate(res.data.license_plate)
            setcolorcar(res.data.color)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    useFocusEffect(
        useCallback(() => {
            LoadHome()
            LoadVehicleClients()
        }, [])
    );

    return (
        <SafeAreaView style={styles.safearea}>
            <Loading visible={loading}></Loading>
            <FlatList
                data={Array.isArray(services) ? services.slice(0, 4) : []}
                keyExtractor={(doc) => doc.id_service}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.gridContainer}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <RenderHeader
                            vehicle={vehicle}
                            user={user}
                            selectvehicleid={selectvehicleid}
                            setselectvehicleid={setselectvehicleid}
                            onAddVechicle={ClickAddVehicle}
                        >
                        </RenderHeader>
                        <Text style={styles.sectionTitle}>Selecione seu Servico</Text>

                    </>
                }
                renderItem={({ item }) => {
                    return <MeetService
                        id_service={item.id_service}
                        id_icon={item.icone_id}
                        service={item.service}
                        description={item.description}
                        card_width={CARD_WIDTH}
                        onPress={() => ClickService(item.id_service)}
                    ></MeetService>
                }}
            ></FlatList>

        </SafeAreaView>
    )
}