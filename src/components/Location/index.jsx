import { useContext, useState } from "react";
import * as Location from 'expo-location'
import { Alert, TouchableOpacity, View, ActivityIndicator, Text, Modal, TextInput } from "react-native";
import { styles } from "./index.js";
import { MapPin, Navigation, CheckCheck, X, CheckCircle } from "lucide-react-native";
import { AuthContext } from "../../contexts/auth.js";
import api from "../../constants/api.js";

export function LocationBanner({ onOpenRequest }) {
    return (
        <View style={styles.alertBanner}>
            <View style={styles.alertHeader}>
                <MapPin color="#D9531E" size={24}></MapPin>
                <View style={styles.alertTextContainer}>
                    <Text style={styles.alertTitle}>Configurar Localizacao</Text>
                    <Text style={styles.alertDescription}>
                        Adicione seu endereco para ver oficinas e guichos na sua regiao
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.bannerButton}
                onPress={onOpenRequest}
            >
                <Text style={styles.bannerButtonText}>Adicionar Localizacao 📍</Text>
            </TouchableOpacity>
        </View>
    )
}
export function LocationModal({ visible, onClose, onAddresSaved }) {
    const { user } = useContext(AuthContext)
    const SavedCallback = onAddresSaved || onAddresSaved
    const [loadingLocation, setloadingLocation] = useState(false);
    const [addressFound, setaddressFound] = useState(false);
    const [step, setstep] = useState(1)
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const handleGetLocation = async () => {
        setloadingLocation(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != "granted") {
                Alert.alert('Permissao Negada', 'Precisamos de localizacao para buscar mecanicos')
                setloadingLocation(false)
                return;
            }
            await awaiting(2000)
            let location = await Location.getCurrentPositionAsync({})
            const { latitude, longitude } = location.coords;
            let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude })
            if (reverseGeocode.length > 0) {
                const item = reverseGeocode[0]
                setaddressFound({
                    rua: item.street,
                    bairro: item.district || item.subregion || "Bairro nao identicado",
                    cidade: item.city || item.subregion || "Sao Luis",
                    cep: item.postalCode || '65000-000'
                })
                setstep(2)
            }
        } catch (error) {
            Alert.alert('Error', 'Nao foi possivel obter sua localizacao')
        } finally {
            setloadingLocation(false)
        }
    }
    const handleSaveAddress = async () => {
        setloadingLocation(true)
        const dadosapi = {
            name: user.name,
            email: user.email,
            telefone: user.telefone,
            cpf: user.cpf,
            cidade: addressFound.cidade,
            bairro: addressFound.bairro,
            rua: addressFound.rua,
            cep: addressFound.cep
        }
        try {
            await awaiting(3000)
            const res = await api.put(`/users/edit/${user.id_user}`, dadosapi)
            if (res.status == 200) {
                if (SavedCallback) {
                    SavedCallback(addressFound)
                }
                onClose()
                setTimeout(() => setstep(1), 300)
            }
        } catch (error) {
            Alert.alert("Error ao salvar o endereco", error)
        } finally {
            setloadingLocation(false)
        }
    }

    return (
        <View style={styles.bannerWrapper}>
            <Modal
                transparent={true}
                animationType="slide"
                visible={visible}
                onRequestClose={onClose}
                style={{ margin: 0, padding: 0 }}
            >
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.blurArea} onPress={() => onClose()} activeOpacity={1} />
                    <View style={styles.bottomSheet}>
                        <View style={styles.sheetHeader}>
                            <View style={styles.dragHandle}>
                                <TouchableOpacity style={styles.closeButton}
                                    onPress={() => onClose()}>
                                    <X color="#64748B" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {step === 1 ? (
                            <View style={styles.sheetContent}>
                                <Text style={styles.sheetTitle}>Onde seu carro esta?</Text>
                                <Text style={styles.sheetSubtitle}>Com apenas um Clique, nos preenchemos a sua localizacao via GPS</Text>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={handleGetLocation}
                                    disabled={loadingLocation}
                                >
                                    {loadingLocation ? (
                                        <ActivityIndicator
                                            color="#fff"
                                        >

                                        </ActivityIndicator>
                                    ) :
                                        <>
                                            <Navigation
                                                color="#fff"
                                                size={20}
                                                style={{ marginRight: 8 }}
                                            ></Navigation>
                                            <Text style={styles.primaryButtonText}>Localizar</Text>
                                        </>
                                    }
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.sheetContent}>
                                <Text style={styles.sheetTitle}>Confirme seu endereco</Text>
                                <Text style={styles.sheetSubtitle}>
                                    Toque nos campos abaixo caso precise corrigir algo:
                                </Text>
                                <View style={styles.addressPreviewBox}>
                                    <Text style={styles.inputLabel}>Rua/ Numero</Text>
                                    <TextInput
                                        style={styles.addressInputBold}
                                        value={addressFound.rua}
                                        onChangeText={(text) => setaddressFound({ ...addressFound, rua: text })}
                                        placeholder="Nome da Rua e Numero"
                                    ></TextInput>
                                    <Text style={styles.inputLabel}>Bairro</Text>
                                    <TextInput
                                        style={styles.addressInputBold}
                                        value={addressFound.bairro}
                                        onChangeText={(text) => setaddressFound({ ...addressFound, bairro: text })}
                                        placeholder="Cohatrac"
                                    ></TextInput>
                                    <Text style={styles.inputLabel}>CEP</Text>
                                    <TextInput
                                        style={styles.addressInputBold}
                                        value={addressFound.cep}
                                        onChangeText={(text) => setaddressFound({ ...addressFound, cep: text })}
                                        placeholder="Ex: 65052-581"
                                    ></TextInput>
                                </View>
                                <TouchableOpacity
                                    style={styles.successButton}
                                    onPress={handleSaveAddress}
                                >
                                    {loadingLocation ? (
                                        <ActivityIndicator color='#fff'></ActivityIndicator>
                                    ) :
                                        <>
                                            <CheckCircle color="#fff" size={20} style={{ marginRight: 8 }}></CheckCircle>
                                            <Text style={styles.primaryButtonText}>Confirmar e Salvar</Text>

                                        </>

                                    }
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>
                </View>
            </Modal>
        </View>
    )
}