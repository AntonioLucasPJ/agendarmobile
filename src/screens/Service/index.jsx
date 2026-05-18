import { FlatList, Image, Text, View } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { MeetService } from "../../components/service/index.jsx";
import api from "../../constants/api.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.js";
export function Service(props) {
    const id_mecan = props.route.params.id_mecanico;
    const name = props.route.params.name
    const specialty = props.route.params.specialty
    const iconMec = props.route.params.icon
    const [msg,setmsg] = useState('')
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
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image
                    source={iconMec == 'M' ? icon.medico : icon.medica}
                    style={styles.img1}
                ></Image>
                <Text style={styles.textt1}>{name}</Text>
                <Text style={styles.textt2}>{specialty}</Text>
            </View>
            {msg?<View style={styles.msgdiv}> 
                <Text style={styles.textmsg}>{msg}</Text>
            </View>:
            <FlatList
                data={servicesmecanicos}
                keyExtractor={(ser) => ser.id_service}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <MeetService
                        id_service={item.id_service}
                        service={item.description}
                        price={item.price}
                        onPress={ClickS}></MeetService>
                }}
            ></FlatList>
            }
        </View>
    )
}