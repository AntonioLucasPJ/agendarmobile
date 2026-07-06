import { styles } from './index.js'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { act, useContext, useEffect, useState } from 'react';
import api from '../../constants/api.js';
import { BlurView } from 'expo-blur';
import { LoginContext } from '../../contexts/login.jsx';
import { AuthContext } from '../../contexts/auth.js';
import Loading from '../../components/loading/index.jsx';
import { ModalCustom } from '../../components/modalcustom/index.jsx';
import { BiBorderAll } from 'react-icons/bi';
import { useNavigation } from '@react-navigation/native';

export function TelaCadastroVeiculos({ route }) {
    const navigation = useNavigation()
    const dadosveiculos = route.params?.dadosveiculos; 
    const [brands, setbrands] = useState([])
    const [models, setmodels] = useState([])
    const [selectedBrand, setselectedBrand] = useState(dadosveiculos?.brand || '')
    const [selectedModel, setselectedModel] = useState(dadosveiculos?.model || '')
    const [plate, setplate] = useState(dadosveiculos?.license_plate || '')
    const [modalCoresVisible, setmodalCoresVisible] = useState(false)
    const [color, setcolor] = useState(dadosveiculos?.color || '')
    const [loading, setloading] = useState(false)
    const [loadinModels, setloadinModels] = useState(true)
    const [statusapi, setstatusapi] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const { user } = useContext(AuthContext)
    const cores_veiculos = [
        { id: '1', nome: 'Preto', hexadecimal: '#000000' },
        { id: '2', nome: 'Branco', hexadecimal: '#ffffff' },
        { id: '3', nome: 'Prata', hexadecimal: '#E2E8F0', borda: '#CBD5E1' },
        { id: '4', nome: 'Cinza', hexadecimal: "#64748B" },
        { id: '5', nome: 'Vermelho', hexadecimal: "#EF4444" },
        { id: '6', nome: "Azul", hexadecimal: '#3B82F6' }
    ]
    const aplicarMascarPlaca = (texto) => {
        let valor = texto.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
        valor = valor.substring(0, 7)
        if (valor.length <= 3) {
            return valor
        }
        const quatroCaractere = valor[3];
        const quintoCaractere = valor[4];
        if (quatroCaractere >= 0 && quatroCaractere <= '9') {
            if (quintoCaractere && (quintoCaractere < '0' || quintoCaractere > '9')) {
                return valor;
            }
            return valor.replace(/^([A-Z]{3})([0-9]{0,4})$/, "$1-$2")
        }
        return valor
    }
    const validarplacabrasileira = (placa) => {
        const placalimpa = placa.replace('-', '').toUpperCase()
        const regexAntiga = /^[A-Z]{3}[0-9]{4}$/;
        const regexMercosul = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
        return regexAntiga.test(placalimpa) || regexMercosul.test(placalimpa)
    }
    const validatecolor = (cor) => {
        return cor
    }
    const isplacavalid = validarplacabrasileira(plate)
    const iscolorvalid = validatecolor(color)
    const formvalid = selectedBrand !== '' &&
        selectedModel !== '' &&
        isplacavalid &&
        iscolorvalid
    function CleanScreen() {
        setactivenotification(!activenotification)
        setselectedBrand(null)
        setselectedModel(null)
        setplate('')
        setcolor('')
        navigation.goBack()
    }
    useEffect(() => {
        async function LoadCars() {
            try {
                const res = await api.get('/vehicle/brands')
                setbrands(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        LoadCars()
    }, [])
    useEffect(() => {
        if (selectedBrand) {
            async function LoadModels() {
                setloadinModels(true)
                try {
                    await waiting(1500)
                    const res = await api.post('/vehicle/models', {
                        id_brands: selectedBrand
                    })
                    setmodels(res.data)
                    setloadinModels(false)
                } catch (error) {
                    console.log(error)
                }
            }
            LoadModels()
        }
    }, [selectedBrand])
    async function CreateSingVehicle() {
        console.log('teste')
        const dadosapi = {
            user_id: user.id_user,
            model_id: selectedModel,
            car_license_plate: plate,
            color: color
        }

        try {
            setloading(true)
            await waiting(2000)
            const res = await api.post('/vehicle/singupvehicle', dadosapi)
            setstatusapi(res.status)
            setmsgnotification(res.data.message)
            setTimeout(() => {
                setactivenotification(!activenotification)
                navigation.goBack()
            }, [1000])

        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    async function EditVehicle() {
        const dadosapi = {
            license_plate: plate,
            color: color
        }
        try {
            setloading(true)
            await waiting(2000)
            const res = await api.put(`/vehicle/clientedit/${dadosveiculos.id_vehicle}`, dadosapi)
            setstatusapi(res.status)
            setmsgnotification(res.data.message)
            setTimeout(() => {
                setactivenotification(!activenotification)
                navigation.goBack()
            }, [1000])

        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            {loading ?
                <Loading visible={loading}></Loading>
                : null
            }
            {activenotification && (
                <BlurView
                    intensity={30}
                    tint='light'
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 99
                    }}
                >
                </BlurView>
            )}
            {activenotification ? (
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: "center",
                    zIndex: 100
                }}>
                    <ModalCustom statusapi={statusapi} msgmodal={msgnotification} onClose={() => CleanScreen()}></ModalCustom>
                </View>
            ) : null
            }
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.bannerContainer}>
                    <MaterialCommunityIcons name='car-cog' size={50} color='#3182C3'></MaterialCommunityIcons>
                    <Text style={styles.bannerText}>Adicionar os dados do seu Carro</Text>
                </View>
                <Text style={styles.label}>1 - Selecione a Marca</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalScroll}
                    snapToAlignment='start'
                    snapToInterval={117}
                    decelerationRate='fast'>
                    {brands?.map(brand => {
                        const isSelectBand = selectedBrand === brand.id;
                        return (
                            <TouchableOpacity
                                key={brand.id}
                                style={[styles.brandCard]}
                                onPress={() => setselectedBrand(brand.id)}>
                                <View style={[styles.logoCircle, isSelectBand && styles.logoCircleSelected]}>
                                    <Image
                                        source={{ uri: brand.imagem_url }}
                                        style={[styles.brandLogo]}
                                        resizeMode='contain'
                                    ></Image>
                                </View>
                                <Text style={[styles.cardText, isSelectBand && styles.cardTextSelected]}>
                                    {brand.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                {selectedBrand && (
                    <View style={styles.animatedSection}>
                        <Text style={styles.label}>2. Selecione o Modelo</Text>
                        {loadinModels ? (
                            <ActivityIndicator
                                size='small'
                                color='#3182CE'></ActivityIndicator>
                        ) : (
                            <View>
                                {models?.map(model => (
                                    <TouchableOpacity
                                        key={model.id}
                                        style={[styles.modelChip, selectedModel === model.id && styles.modelChipSelected]}
                                        onPress={() => setselectedModel(model.id)}
                                    >
                                        <Text style={[styles.modelChipText, selectedModel === model.id && styles.modelChipTextSelected]}>
                                            {model.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                )}
                {selectedModel && (
                    <View>
                        <Text style={styles.label}>3 - Placa</Text>
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons
                                name='card-bulleted-off-outline'
                                size={20}
                                color='#A0AEC0'
                                style={styles.inputIcon}></MaterialCommunityIcons>
                            <TextInput
                                style={styles.input}
                                placeholder='Placa do Veiculo'
                                placeholderTextColor='#A0AEC0'
                                value={plate}
                                maxLength={8}
                                autoCapitalize='characters'
                                onChangeText={(text) => setplate(aplicarMascarPlaca(text))}></TextInput>
                        </View>
                    </View>

                )}
                {isplacavalid && (
                    <View>
                        <Text style={styles.label}>4 - Selecione a cor do veiculo</Text>
                        <View
                            style={styles.gridContainer}
                        >
                            {cores_veiculos.map((item) => {
                                const iscolorSelected = color === item.nome

                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[
                                            styles.colorCard,
                                            iscolorSelected && styles.colorCardSelected
                                        ]}
                                        onPress={() => {
                                            setcolor(validatecolor(item.nome))
                                            setmodalCoresVisible(false)
                                        }}
                                    >
                                        <View style={[
                                            styles.colorCircleGrid,
                                            { backgroundColor: item.hexadecimal },
                                            item.borda && { borderWidth: 1, borderColor: item.borda }
                                        ]}></View>
                                        <Text
                                            style={[
                                                styles.colorCardText,
                                                iscolorSelected && styles.colorCardTextSelected
                                            ]} numberOfLines={1}>
                                            {item.nome}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>

                )}

                {/* <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons
                        name='palette-outline'
                        size={20}
                        color='#A0AEC0'
                        style={styles.inputIcon}></MaterialCommunityIcons>
                    <TextInput
                        style={styles.input}
                        placeholder='Cor do Veiculo (Ex:Preto)'
                        placeholderTextColor='#A0AEC0'
                        value={color|| ''}
                        onChangeText={(cor)=> setcolor(validatecolor(cor))}></TextInput>
                </View> */}
            </ScrollView>
            <TouchableOpacity
                style={[styles.saveButton, !formvalid && styles.saveButtonDisabled]}
                disabled={!formvalid}
                onPress={dadosveiculos != undefined ? () => EditVehicle() : () => CreateSingVehicle()}
            >
                {loading ? (
                    <ActivityIndicator color='#FFFFFF'></ActivityIndicator>
                ) : (
                    <View style={styles.buttonContent}>
                        <Text style={styles.saveButtonText}>{dadosveiculos != undefined ? 'Editar cadastro' : 'Concluir cadastro'}</Text>
                        <Ionicons name='checkmark-circle' size={20} color='#FFFFFF'></Ionicons>
                    </View>
                )}
            </TouchableOpacity>
        </SafeAreaView >
    )
}