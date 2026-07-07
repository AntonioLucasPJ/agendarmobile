import { FlatList, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import icon from '../../constants/icon.js'
import { BlurView } from "expo-blur";
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
import { Button } from "../../components/button/button.jsx";

const RenderHeader = ({ vehicle, user, selectvehicleid, setselectvehicleid, onAddVechicle, onDeleteVehicle }) => {
    const dadosCarrocel = [...vehicle, { id_vehicle: 'ADD_BUTTON_KEY', isaddItem: true }]
    const navigate = useNavigation()
    const [loading, setloading] = useState(false)
    function EditVehicle(id_vehicle) {
        const findcar = vehicle.find(v => String(v.id) === String(id_vehicle))
        if (!findcar) {
            Alert.alert('Error', "Nao foi possivel localicar o veiculo")
            return
        }
        const payloadparaenvio = {
            id_vehicle: findcar.id,
            brand: findcar.id_brand || '',
            model: findcar.id_vehicle_models || '',
            license_plate: findcar.license_plate || '',
            color: findcar.color || ''
        }
        navigate.navigate('vehicle', { dadosveiculos: payloadparaenvio })
    }
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
                                </MaterialCommunityIcons>
                                <Text style={styles.addVehicleCardText}> Cadastrar Novo Veiculo</Text>

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
                        onselectedvehicle={(id, license_plate) => setselectvehicleid(id, license_plate)}
                        onEdit={(e) => EditVehicle(e)}
                        onDelete={(id) => onDeleteVehicle(id)}
                    ></Vehicle>
                }}
            />
            <Text style={styles.sectionTitle}>Selecione seu Servico</Text>

        </View >
    )
}
export function TelaHome({ navigation }) {
    const [loading, setloading] = useState(false)
    const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
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
    const hasnovehicle = vehicle.length == 0
    const isLocked = selectvehicleid === '' || hasnovehicle;
    const { width } = Dimensions.get("window");
    const CARD_WIDTH = (width - 48) / 2;
    const [paginaAtiva, setpaginaAtiva] = useState(0)
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
    async function ClickService(id_service, service) {
        const vehicles = vehicle.find(v => (v.id) === selectvehicleid)
        setloading(true)
        try {
            setloading(false)
            navigation.navigate('mecanicos', {
                id_service: id_service,
                service: service,
                vehicle_model: vehicles.model,
                license_plate: vehicles.license_plate
            })

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
            if (res.data && res.data.length > 0) {
                setvehicle(res.data)
            }
            setbrand(res.data.brand)
            setmodel(res.data.model)
            setlicense_plate(res.data.license_plate)
            setcolorcar(res.data.color)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    async function DesvincularVehicle(id) {
        try {
            setloading(true)
            await waiting(2000)
            const res = await api.delete(`/vehicle/clientdelete/${id}`)
            if (String(selectvehicleid) === String(id)) {
                setselectvehicleid('')
            }
            setvehicle(prevehi => prevehi.filter(v => String(v.id) !== String(id)))
            await LoadVehicleClients()

        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    useFocusEffect(
        useCallback(() => {
            LoadHome()
            LoadVehicleClients()
        }, [])
    );
    const formatarDadosEmPaginas = (lista, tamanhoPagina) => {
        if (!Array.isArray(lista)) return [];
        const paginas = [];
        for (let i = 0; i < lista.length; i += tamanhoPagina) {
            paginas.push(lista.slice(i, i + tamanhoPagina));
        }
        return paginas;
    };

    const dadosPaginados = formatarDadosEmPaginas(services, 4);
    return (
        <SafeAreaView style={[styles.safearea, { flex: 1, backgroundColor: '#f8fafc' }]}>
            <Loading visible={loading}></Loading>
            <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
                <RenderHeader
                    vehicle={vehicle}
                    user={user}
                    selectvehicleid={selectvehicleid}
                    setselectvehicleid={setselectvehicleid}
                    onAddVechicle={ClickAddVehicle}
                    onDeleteVehicle={DesvincularVehicle}
                >
                </RenderHeader>
                <View style={{ height: width > 600 ? 260 : 440,marginVertical:12,width:'100%' }}>
                    <FlatList
                        data={dadosPaginados}
                        keyExtractor={(_, index) => 'pagina_' + index}
                        horizontal={true}
                        pagingEnabled={true}
                        extraData={vehicle.length}
                        contentContainerStyle={styles.gridContainer}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        scrollEventThrottle={16}
                        onScroll={(e) => {
                            const xOffset = e.nativeEvent.contentInset.x;
                            const largurapagina = e.nativeEvent.layoutMeasurement.width || width
                            const pagina = Math.round(xOffset / width)
                            setpaginaAtiva(pagina)
                        }}
                        renderItem={({ item: servicosDaPagina }) => {
                            return (
                                <View
                                    style={{
                                        width: width > 600 ? width - 32 : width,
                                        flexDirection: 'row',
                                        flexWrap: "wrap",
                                        paddingHorizontal: width > 600 ? 0 : 8,
                                        height: width > 600 ? 280 : 380,
                                        alignItems: 'flex-start'
                                    }}>
                                    {servicosDaPagina.map((item) => (
                                        <View
                                            key={item.id_service}
                                            style={{
                                                width: width > 600 ? '25%' : '50%',
                                                padding: 6
                                            }}>
                                            <MeetService
                                                id_service={item.id_service}
                                                id_icon={item.icone_id}
                                                service={item.service}
                                                description={item.description}
                                                card_width='100%'
                                                onPress={(id, service) => !isLocked && ClickService(id, service)}
                                            ></MeetService>
                                        </View>
                                    ))}

                                </View>


                            )
                        }}
                    ></FlatList>
                    {dadosPaginados.length > 1 && (
                        <View style={styles.containerBolinhas, { marginTop: 8, marginBottom: 16 }}>
                            {dadosPaginados.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.bolinha,
                                        paginaAtiva === index ? styles.bolinhaAtiva : styles.bolinhaInativa
                                    ]}>

                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {isLocked && (
                    <BlurView
                        intensity={25}
                        tint="light"
                        style={styles.absoluteOverlay}
                    >
                        <View style={styles.alertCard}>
                            <View style={styles.rowHeader}>
                                <MaterialCommunityIcons
                                    name={hasnovehicle ? 'car-electric' : 'car-cog'}
                                    size={28}
                                    color='#002F6C'
                                >
                                </MaterialCommunityIcons>
                                <Text style={styles.alertText}>
                                    {hasnovehicle ? 'Nenhum Veiculo' : 'Atencao'}
                                </Text>
                            </View>
                            <Text style={styles.alertText}>
                                {hasnovehicle ?
                                    'Voce precisa cadastrar um veiculo antes de solicitar ou visualizar' :
                                    'Selecionar um dos seus carros acima para liberar os servicos'}
                            </Text>
                            {hasnovehicle && (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={ClickAddVehicle}
                                >
                                    <MaterialCommunityIcons
                                        name='car-info'
                                        size={20}
                                        color='#FFFFFF'
                                    ></MaterialCommunityIcons>
                                    <Text style={styles.actionButtonText}>Cadastrar Primeiro Carro</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </BlurView>
                )}
            </ScrollView>

        </SafeAreaView >
    )
}