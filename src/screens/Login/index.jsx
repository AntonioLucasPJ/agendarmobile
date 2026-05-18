import { Image, Text, View, TextInput, Touchable, TouchableOpacity, Alert } from "react-native";
import icon from '../../constants/icon.js'
import { Button } from "../../components/button/button.jsx";
import { styles } from './index.js'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.js";
import api from "../../constants/api.js";
function Login(props) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const {setuser} = useContext(AuthContext);
    async function LoginBD() {
        try {
            const response = await api.post('/users/login',{
                email,
                password
            })
            console.log(response.data)
            if(response.data){
                api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.token;
                setuser(response.data)
                
            }
        }catch(error){
            if(error.response.data.message){
                Alert.alert(error.response.data.message)
            }else {
                Alert.alert("O ocorreu um erro desconhecido tente novamente!")
                
            }
        }
    }
    function RedirectCadastro(){
        props.navigation.navigate('cadastro')
    }

    return (
        <View style={styles.container}>
            <Image source={icon.logo} style={styles.logo}></Image>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Email..." onChangeText={(e) => setemail(e)}></TextInput>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha..." onChangeText={(e) => setpassword(e)}></TextInput>
            </View>
            <View>
                <Button onPress={LoginBD} text='Acessar'></Button>
            </View>
            <View style={styles.footer}>
                <Text style={styles.textfoot}>Não tem conta?</Text>
                <TouchableOpacity onPress={RedirectCadastro}><Text style={styles.textlink}>Clique aqui</Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default Login