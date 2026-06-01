import { FlatList, Image, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useContext, useEffect, useState } from "react";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { Mecanico } from "../../components/mecanico/index.jsx";
import api from "../../constants/api.js";

//Acess UseCotext

import { AuthContext } from "../../contexts/auth.js";
import { MecanicoContext } from "../../contexts/mecanico.jsx";
export function TelaHome(props) {
    const { user } = useContext(AuthContext)
    const [mecanicos, setmecanicos] = useState('')
    const {
        id_selectmecanico,setidselectmecanico,
        name_selectmecanico,setname_selectmecanico,
        specialty_selectmecanico,setspecialty_selectmecanico,
        icon_selectmecanico,seticon_selectmecanico,
        avatar_selectmecanico,setavatar_selectmecanico,
    } = useContext(MecanicoContext)
    function ClickMecanico(id_mecanico, name, specialty, icon, avatar) {
        setidselectmecanico(id_mecanico)
        setname_selectmecanico(name)
        setspecialty_selectmecanico(specialty)
        seticon_selectmecanico(icon)
        setavatar_selectmecanico(avatar)
        props.navigation.navigate("services", {
            id_mecanico, name, specialty, icon,avatar
        })
    }
    async function LoadHome() {
        try {
            const res = await api.get("/mecanicos")
            setmecanicos(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        LoadHome()
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Selecione o Mecanico</Text>
            <FlatList   
                data={mecanicos}
                keyExtractor={(doc) => doc.id_mecanico}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                renderItem={({ item }) => {
                    return <Mecanico
                        id_mecanico={item.id_mecanico}
                        name={item.name}
                        titulo_professional={item.titulo_profissional}
                        avatar={item.avatar_url}
                        avaliacao={item.avaliacao}
                        experiencia={item.experiencia}
                        icon={item.icon}
                        especiality={item.specialty}
                        onPress={ClickMecanico}
                    ></Mecanico>
                }}
            ></FlatList>
        </View>


    )
}