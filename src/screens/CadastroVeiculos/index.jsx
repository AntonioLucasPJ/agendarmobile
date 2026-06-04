import { styles } from './index.js'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import api from '../../constants/api.js';
export function TelaCadastroVeiculos() {
    const [brands, setbrands] = useState([])
    const [models, setmodels] = useState([])
    const [selectedBrand, setselectedBrand] = useState(null)
    const [selectedModel, setselectedModel] = useState(null)
    const [plate, setplate] = useState('')
    const [color, setcolor] = useState('')
    const [loading, setloading] = useState(false)
    const [loadinModels, setloadinModels] = useState(true)
    const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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
        console.log('Marca Selecionada:', selectedModel)
    }, [selectedModel])
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
    useEffect(() => {
        async function SingupVehicle() {
            const res = await api.post
        }
    })
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.container}>
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
                    {brands.map(brand => (
                        <TouchableOpacity
                            key={brand.id}
                            style={[styles.brandCard, selectedBrand === brand.id && styles.cardSelected]}
                            onPress={() => setselectedBrand(brand.id)}>
                            <Image
                                source={{ uri: brand.imagem_url }}
                                style={[styles.brandLogo, selectedBrand === brand.id && styles.brandLogoSelected]}
                                resizeMode='contain'
                            ></Image>
                            <Text style={[styles.cardText, selectedBrand === String(brand.id) && styles.cardTextSelected]}>
                                {brand.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
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
                                        <Text style={[styles.modelChip, selectedModel === model && styles.modelChipText]}>
                                            {model.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
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
                    value={color}
                    onChangeText={setplate}></TextInput>
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
            <TouchableOpacity
                style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                disabled={loading}
                onPress={() => SingupVehicle }
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