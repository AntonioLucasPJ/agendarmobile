import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import icon from '../../constants/icon.js'
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./index.js";
import { MeetService } from "../../components/service/index.jsx";
import api from "../../constants/api.js";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/auth.js";
import { MecanicoContext } from "../../contexts/mecanico.jsx";
import { ServiceContext } from "../../contexts/service.jsx";
import { Mecanico } from "../../components/mecanico/index.jsx";
export function LoadMecanico(props) {
    const { id_service,service,vehicle_model,id,license_plate} = props.route.params
    const iconMec = props.route.params.icon
    const url = props.route.params.avatar
    const [msg, setmsg] = useState('')
    const [servicesmecanicos, setservicesmecanicos] = useState('')
    const { setservice_selectmecanico } = useContext(MecanicoContext)
    const { setid_service, setserviceicon, setservicename, setservicedescription, setserviceprice } = useContext(ServiceContext)
    const awaiting = (ms) => new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT_ESTOURADO")), ms)
    );
    async function LoadServices() {
        try {
            const res = await Promise.race([
                api.get(`/servicesmecanicos/${id_service}`),
                awaiting(5000)
            ])
            setservicesmecanicos(res.data)
        } catch (error) {
            setmsg(error.response.data.message)
        }
    }
    function ClickS(id_mecanico) {
        setservice_selectmecanico(id_service)
        setid_service(id_service)
        props.navigation.navigate("Shedule", {
            id_mecanico: id_mecanico,
            id_service: id_service,
            service:service,
            vehicle_model: vehicle_model,
            license_plate: license_plate
        })
    }
    useEffect(() => {
        LoadServices()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.sectionTitle}>Mecanicos disponiveis</Text>
            {servicesmecanicos !='' ?
                <FlatList
                    data={servicesmecanicos}
                    keyExtractor={(ser) => ser.id_mecanico}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <Mecanico
                            id_mecanico={item.id_mecanico}
                            name={item.name}
                            avatar={item.avatar_url}
                            titulo_profissional={item.titulo_profissional}
                            avaliacao={item.avaliacao}
                            experiencia={item.experiencia}
                            onPress={()=> ClickS(id_service)}></Mecanico>
                    }}
                ></FlatList>
                :
                <View style={styles.contentErro}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name='alert-circle-outline' size={80} color='#64748b'></MaterialCommunityIcons>
                    </View>
                    <Text style={styles.tituloErro}>Nenhum Mecanico Disponivel</Text>
                    <Text style={styles.descricaoErro}>
                        Nao foi encontrado mecanicos diponiveis para esse servicos,<Text style={{ fontWeight: '700' }}>Verifique novamente</Text>
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