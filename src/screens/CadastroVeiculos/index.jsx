import {styles} from './index.js'
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
export function TelaCadastroVeiculos(){
    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.container}>
                <View style={styles.bannerContainer}>
                    <MaterialCommunityIcons name='car-plus' size={50} color='#3182C3'></MaterialCommunityIcons>
                    <Text style={styles.bannerText}>Adicionar os dados do seu Carro</Text>
                </View>
                <Text style={styles.label}>1 - Selecione a Marca</Text>
            </ScrollView>
            <Text>Tela de cadastro de veiculos</Text>
        </SafeAreaView>
    )
}