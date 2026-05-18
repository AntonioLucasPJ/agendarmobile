
import { Image, Text, View } from 'react-native'
import profilesteste from './img/carton.jpg'
import { styles } from './index.js'
import { AuthContext } from '../../contexts/auth.js'
import { useContext, useEffect } from 'react'
import { Button } from '../../components/button/button.jsx'
import api from '../../constants/api.js'
export function Perfil() {
    const { user,setuser } = useContext(AuthContext);
    function logout(){
        api.defaults.headers.common['Authorization'] = ""
        setuser('')
    }
    return (
        <View style={styles.container}>
            <View style={styles.imgdiv}>
                <Image style={styles.imgprofile} source={profilesteste}></Image>
            </View>
            <View style={styles.infor1}>
                <Text style={styles.text1}>Nome:</Text>
                <Text style={styles.text2}>{user.name}</Text>
            </View>
            <View style={styles.infor1}>
                <Text style={styles.text1}>Email</Text>
                <Text style={styles.text2}>{user.email}</Text>
            </View>
            <Button
            text="Logout"
            corbotao="red" onPress={logout}></Button>
        </View>
    )
}