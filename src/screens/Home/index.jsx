import { FlatList, Image, Text, View } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { Mecanico } from "../../components/mecanico/index.jsx";
import api from "../../constants/api.js";

//Acess UseCotextAPI
import { AuthContext } from "../../contexts/auth.js";
import { useContext, useEffect, useState } from "react";
export function TelaHome(props) {
    const {user} = useContext(AuthContext)
    const [mecanicos,setmecanicos] = useState('')
    function ClickMecanico(id_mecanico, name, specialty, icon) {
        props.navigation.navigate("services", {
            id_mecanico, name, specialty, icon,
        })
    }
    async function LoadHome(){
        try{
            const res = await api.get("/mecanicos")
            setmecanicos(res.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        LoadHome()
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Agende seu servico</Text>
            <FlatList
                data={mecanicos}
                keyExtractor={(doc) => doc.id_mecanico}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <Mecanico
                        id_mecanico={item.id_mecanico}
                        name={item.name}
                        icon={item.icon}
                        specialty={item.specialty}
                        onPress={ClickMecanico}
                    ></Mecanico>
                }}
            ></FlatList>
            
        </View>
    )
}