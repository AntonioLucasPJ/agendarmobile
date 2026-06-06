import { styles } from './index.js'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import api from '../../constants/api.js';
import { LoginContext } from '../../contexts/login.jsx';
import { AuthContext } from '../../contexts/auth.js';
import Loading from '../../components/loading/index.jsx';
import { ModalCustom } from '../../components/modalcustom/index.jsx';
export function TelaCadastroVeiculos() {
    const [brands, setbrands] = useState([])
    const [models, setmodels] = useState([])
    const [selectedBrand, setselectedBrand] = useState(null)
    const [selectedModel, setselectedModel] = useState(null)
    const [plate, setplate] = useState('')
    const [color, setcolor] = useState('')
    const [loading, setloading] = useState(false)
    const [loadinModels, setloadinModels] = useState(true)
    const [statusapi,setstatusapi] = useState('')
    const [activenotification,setactivenotification] = useState(false)
    const [msgnotification,setmsgnotification] = useState('')
    const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const { user } = useContext(AuthContext)
    const aplicarMascarPlaca = (texto) => {
        let valor = texto.replace(/[^a-zA-Z0-9]/g).toUpperCase()
        if (valor.length > 3 && !isNaN(valor[3])) {
            valor = valor.replace(/^([A-Z{3}) ([0-9]{4})$/, "$1-$2")
        } else if (valor.length > 3) {
            valor = valor.substring(0, 7)
        }
        return valor.substring(0, 8)
    }
    const validarplacabrasileira = (placa) => {
        const placalimpa = placa.replace('-', '').toUpperCase()
        const regexAntiga = /^[A-Z]{3}[0-9]{4}$/;
        const regexMercosul = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
        return regexAntiga.test(placalimpa) || regexMercosul.test(placalimpa)
    }
    const isplacavalid = validarplacabrasileira(plate)

    const formvalid = selectedBrand !== '' &&
        selectedModel !== '' && 
        isplacavalid &&
        color !== ''

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
        const dadosapi = {
            id_user: user.id_user,
            model_id: selectedModel,
            license_plate: plate,
            color: color
        }
        try {
            setloading(true)
            await waiting(2000)
            const res = await api.post('/vehicle/singupvehicle', dadosapi)
            setstatusapi(res.status)
            msgnotification(res.data)
            setTimeout(()=>{
                activenotification(!activenotification)
            },[1500])
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
                : ''
            }
            {activenotification?
                <ModalCustom statusapi={statusapi} msgmodal={msgnotification}></ModalCustom>    
            :''
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
                    {brands.map(brand => {
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
                                {models.map(model => (
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
                        onChangeText={(text)=> setplate(aplicarMascarPlaca(text))}></TextInput>
                </View>
                <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons
                        name='palette-outline'
                        size={20}
                        color='#A0AEC0'
                        style={styles.inputIcon}></MaterialCommunityIcons>
                    <TextInput
                        style={styles.input}
                        placeholder='Cor do Veiculo (Ex:Preto)'
                        placeholderTextColor='#A0AEC0'
                        value={color}
                        onChangeText={setcolor}></TextInput>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={[styles.saveButton, !formvalid && styles.saveButtonDisabled]}
                disabled={!formvalid}
                onPress={() => CreateSingVehicle()}
            >
                {loading ? (
                    <ActivityIndicator color='#FFFFFF'></ActivityIndicator>
                ) : (
                    <View style={styles.buttonContent}>
                        <Text style={styles.saveButtonText}>Concluir Cadastro</Text>
                        <Ionicons name='checkmark-circle' size={20} color='#FFFFFF'></Ionicons>
                    </View>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    )
}