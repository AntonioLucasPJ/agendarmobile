import { FlatList, Image, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { MeetService } from "../../components/service/index.jsx";
import api from "../../constants/api.js";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.js";
export function Service(props) {
    const id_mecan = props.route.params.id_mecanico;
    const name = props.route.params?.name || { name: 'Não Identificado' }
    const specialty = props.route.params.specialty
    const iconMec = props.route.params.icon
    const url = props.route.params.avatar
    const [msg, setmsg] = useState('')
    const [servicesmecanicos, setservicesmecanicos] = useState('')

    async function LoadServices() {
        try {
            const res = await api.get(`/mecanicos/${id_mecan}/services`)
            setservicesmecanicos(res.data)
        } catch (error) {
            setmsg(error.response.data.message)
        }
    }
    function ClickS(id_service) {
        props.navigation.navigate("Shedule", {
            id_mecan,
            id_service
        })
    }
    useEffect(() => {
        LoadServices()
        console.log(specialty)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mecanicoCard}>
                <Image
                    src={url}
                    style={styles.avatar}
                ></Image>
                <View style={styles.mecanicoInfo}>
                    <View style={styles.mecanicoHeaderRow}>
                        <Text style={styles.mecanicoName}>{name}</Text>
                        <View style={styles.ratingBox}>
                            <Text style={styles.ratingText}>{'5.0'}</Text>
                            <View style={styles.starsRow}>
                                {[1, 2, 3, 4].map((i) => (
                                    <FontAwesome key={i} name='star' size={10} color='#f97316' solid ></FontAwesome>
                                ))}
                            </View>
                        </View>
                    </View>
                    <Text style={styles.mecanicoTitle}>{name}</Text>
                    <Text style={styles.mecanicoSpecialty}>{specialty}</Text>
                    <View style={styles.mecanicoFooterRow}>
                        <View style={styles.miniIcons}>
                            <MaterialCommunityIcons name='oil' size={18} color='#64748b'></MaterialCommunityIcons>
                            <MaterialCommunityIcons name='cog' size={18} color='#64748b'></MaterialCommunityIcons>
                        </View>
                        <View style={styles.experienceBadge}>
                            <Text style={styles.experienceText}>experiencia</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.sectionTitle}>Servicos disponiveis</Text>
            {servicesmecanicos ?
                <FlatList
                    data={servicesmecanicos}
                    keyExtractor={(ser) => ser.id_service}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <MeetService
                            id_service={item.id_service}
                            service={item.service}
                            descripition={item.description}
                            price={item.price}
                            id_icon={item.icone_id}
                            onPress={ClickS}></MeetService>
                    }}
                ></FlatList>
                :
                <View style={styles.contentErro}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name='alert-circle-outline' size={80} color='#64748b'></MaterialCommunityIcons>
                    </View>
                    <Text style={styles.tituloErro}>Nenhum Serviço Encontrado</Text>
                    <Text style={styles.descricaoErro}>
                        O mecanico <Text style={{ fontWeight: '700' }}>{name}</Text> Ainda não possui servicos cadastrados
                    </Text>
                    <TouchableOpacity
                        style={styles.btnVoltar}
                        onPress={() => props.navigation.goBack()}
                    >
                        <MaterialCommunityIcons name='arrow-left' size={20} color='#ffff'></MaterialCommunityIcons>
                        <Text style={styles.btnVoltarText}>Voltar para Home</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}