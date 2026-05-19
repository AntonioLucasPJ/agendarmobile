import { Image, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, ScrollView, ImageBackground, Alert, Platform, Keyboard } from "react-native";
import icon from '../../constants/icon.js'
import { Button } from "../../components/button/button.jsx";
import { styles } from './index.js'
import { useContext, useState } from "react";
import { EyesButton } from "../../components/button/button.jsx";
import { AuthContext } from "../../contexts/auth.js";
import Loading from "../../components/loading/index.jsx";
import api from "../../constants/api.js";

function Login(props) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [hidepassword,sethidepassword] = useState(false)
    const { user, setuser,loading,setloading} = useContext(AuthContext);
    const nomevalido = true;
    const emailvalido = true;
    const telefonevalido = true;
    const passwordvalido = true;
    const cpf = true;
    const cpfvalido = true

    async function LoginBD() {
        try {
            const response = await api.post('/users/login', {
                email,
                password
            })
            if (response.data) {
                api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.token;
                setuser(response.data)
            }
        } catch (error) {
            if (error.response.data.message) {
                Alert.alert(error.response.data.message)
            } else {
                Alert.alert("O ocorreu um erro desconhecido tente novamente!")
            }
        }
    }
    function RedirectCadastro() {
        props.navigation.navigate('cadastro')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <ImageBackground 
                    style={styles.container}
                    source={icon.background}
                    resizeMode="cover">
                        <Loading visible={loading}></Loading>
                        <Image source={icon.logo} style={styles.logo}></Image>
                        <View style={styles.containerinput}>
                            <View style={styles.inputWrapper}>
                                <Image source={icon.email} style={nomevalido ? styles.inputIcon : styles.inputIconDisable}></Image>
                                <TextInput keyboardType="email-address" style={nomevalido ? styles.input : styles.inputDisable} placeholder='Digite seu email' placeholderTextColor={nomevalido ? '#000' : 'rgb(44, 151, 151)'} onChangeText={(e) => setsingemail(e)} editable={nomevalido} value={email}></TextInput>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Image source={icon.lock} style={telefonevalido ? styles.inputIcon : styles.inputIconDisable}></Image>
                                <TextInput style={telefonevalido ? styles.input : styles.inputDisable} secureTextEntry={hidepassword} placeholderTextColor={telefonevalido ? '#000' : 'rgb(44, 151, 151)'} placeholder="Senha..." onChangeText={(e) => setsingpassword(e)} editable={telefonevalido}></TextInput>
                                <EyesButton
                                onPress={()=>sethidepassword(!hidepassword)}
                                showPassword={!hidepassword}
                                ></EyesButton>
                            </View>
                        </View>
                        {/* <Agreecheck></Agreecheck> */}
                        <View style={styles.buttonContainer} >
                            <Button onPress={LoginBD} disabled={nomevalido & emailvalido & cpfvalido & telefonevalido & passwordvalido ? false : true} text='Criar Conta' />
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.textfoot}>Ja possui uma conta?</Text>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}><Text style={styles.textlink}>Clique aqui</Text></TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export default Login