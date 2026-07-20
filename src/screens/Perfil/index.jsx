
import { Image, Platform, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator, KeyboardAvoidingView, SafeAreaView, } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import profilesteste from './img/carton.jpg'
import { styles } from './index.js'
import { AuthContext } from '../../contexts/auth.js'
import { use, useContext, useEffect, useState } from 'react'
import { Button } from '../../components/button/button.jsx'
import api from '../../constants/api.js'
import { Key } from 'lucide-react-native'
import Loading from '../../components/loading/index.jsx'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
export function Perfil() {
    const { user, setuser } = useContext(AuthContext);
    const navigation = useNavigation()
    const [loading, setloading] = useState(false)
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false)
    //States
    const [userName, setUserName] = useState(user?.name || "")
    const [userEmail, setUserEmail] = useState(user?.email || "")
    const [userPhone, setUserPhone] = useState(user?.phone || "")
    const [profilePhoto, setProfilePhoto] = useState(user?.ProfielPhoto || null)
    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permisão Necessaria", "Precisamos de acesso as suas foto")
            return
        }
        const result = await ImagePicker.lauchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (!result.cancelled) {
            setProfilePhoto(result.uri)
        }
    }
    const hasUnsavedChanges = (
        userName !== user?.name ||
        userEmail !== user?.email ||
        userPhone !== user?.phone ||
        profilePhoto !== user?.profilePhoto
    )
    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
    }

    const handleSaveProfile = async () => {
        if (updatingProfile) return;
    }
    const handleLogout = () => {
        console.log('tESTE')
        Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destrutive",
                onPress: () => {
                    api.defaults.headers.common['Authorization'] = ""
                    setuser("")
                    navigation.replace("login")
                }
            }
        ])
    }
    return (
        <SafeAreaProvider
            style={styles.safearea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Loading visible={loading}></Loading>
                <View
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Meu Perfil</Text>
                    {hasUnsavedChanges && (
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveProfile}
                            disabled={updatingProfile}
                        >
                            {updatingProfile ? (
                                <ActivityIndicator
                                    size="small"
                                    color='#FFFFF'
                                ></ActivityIndicator>
                            ) : (
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            )}
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileCard}>
                        <TouchableOpacity style={styles.avatarContainer} onPress={handlePickImage}>
                            {profilePhoto ? (
                                <Image source={{ uri: profilePhoto }} style={styles.avatarPhoto}></Image>
                            ) : (
                                <View style={styles.avatarCircle}>
                                    <Text style={styles.initialsText}>{getInitials(userName)}</Text>
                                </View>
                            )}
                            <View style={styles.editIconContainer}>
                                <MaterialCommunityIcons name="camera" size={16} color="#ffff"></MaterialCommunityIcons>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.profileInfo}>
                            <Text style={styles.inputLabel}>Nome</Text>
                            <TextInput
                                style={styles.userNameInput}
                                value={user.name}
                                onChangeText={(name)=> setuser({...user,name:name})}
                                placeholder='Digite seu nome'
                                autoCorrect={false}
                            ></TextInput>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.userEmailInput}
                                value={user.email}
                                onChangeText={(email)=> setuser({...user, email:email })}
                                placeholder='usuario@gmail.com'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                            ></TextInput>
                            <Text style={styles.inputLabel}>Telefone</Text>
                            <TextInput
                                style={styles.userPhoneInput}
                                value={user.telefone}
                                maxLength={11}
                                onChangeText={(telefone)=> setuser({...user, telefone:telefone})}
                                placeholder='(98) 99999-9999'
                                keyboardType='phone-pad'

                            ></TextInput>
                        </View>
                    </View>
                    <Text style={styles.sectionTitle}>Localização Cadastrada</Text>
                    <View style={styles.addressBox}>
                        <View style={styles.addressHeader}>
                            <MaterialCommunityIcons name="map-marker-radius" size={24} color="#D9531E"></MaterialCommunityIcons>
                            <Text style={styles.addressTitle}>Endereço de Ponto</Text>
                        </View>
                        {user.rua ? (
                            <View style={styles.addressDetails}>
                                <Text style={styles.addressText}><Text style={styles.bold}>Rua: </Text>{user.rua}</Text>
                                <Text style={styles.addressText}><Text style={styles.bold}>Bairro: </Text>{user.bairro}</Text>
                                <Text style={styles.addressText}><Text style={styles.bold}>Cidade: </Text>{user.cidade}</Text>

                            </View>
                        ) : (
                            <Text style={styles.noAddressText}>Ainda não foi Cadastrado o endereco</Text>
                        )}
                        <TouchableOpacity
                            style={styles.editAddressButton}
                            onPress={() => setShowAddressModal(true)}
                        >
                            <MaterialCommunityIcons name='map-marker-radius' size={20} color="#ffff"></MaterialCommunityIcons>
                            <Text style={styles.editAddressButtonText}>
                                {user.rua ? "Alterar endereco" : "Adicionar endereco"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sectionTitle}>Atalhos Rápidos</Text>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate("vehicle")}
                        >
                            <View style={styles.menuItemLeft}>
                                <MaterialCommunityIcons name='car-cog' size={24} color="#002F6C"></MaterialCommunityIcons>
                                <Text style={styles.menuItemText}>Gerenciar Meus Veiculos</Text>
                            </View>
                            <MaterialCommunityIcons name='chevron-right' size={24} color='#64748B'></MaterialCommunityIcons>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, styles.lastMenuItem]}
                        >
                            <View
                                style={styles.menuItemLeft}
                            >
                                <MaterialCommunityIcons name='history' size={24} color="#002F6C"></MaterialCommunityIcons>
                                <Text style={styles.menuItemText}>Historico de Chamados</Text>
                            </View>
                            <MaterialCommunityIcons name='chevron-right' size={24} color='#64748B'></MaterialCommunityIcons>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.menuItem, styles.lastMenuItem]}
                            onPress={() => handleLogout}
                        >
                            <View
                                style={styles.menuItemLeft}
                            >
                                <MaterialCommunityIcons name='logout' size={24} color="#002F6C"></MaterialCommunityIcons>
                                <Text style={[styles.menuItemText, { color: "#EF4444" }]} >Sair Da Conta</Text>
                            </View>
                            <MaterialCommunityIcons name='chevron-right' size={24} color='#64748B'></MaterialCommunityIcons>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.versionText}>Versao 1.0.0</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
        // <View style={styles.container}>
        //     <View style={styles.imgdiv}>
        //         <Image style={styles.imgprofile} source={profilesteste}></Image>
        //     </View>
        //     <View style={styles.infor1}>
        //         <Text style={styles.text1}>Nome:</Text>
        //         <Text style={styles.text2}>{user.name}</Text>
        //     </View>
        //     <View style={styles.infor1}>
        //         <Text style={styles.text1}>Email</Text>
        //         <Text style={styles.text2}>{user.email}</Text>
        //     </View>
        //     <Button
        //     text="Logout"
        //     corbotao="red" onPress={logout}></Button>
        // </View>
    )
}