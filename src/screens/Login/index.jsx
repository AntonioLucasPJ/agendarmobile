import { Image, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, ScrollView, ImageBackground, Alert, Platform, Keyboard } from "react-native";
import icon from '../../constants/icon.js'
import { Button } from "../../components/button/button.jsx";
import { styles } from './index.js'
import { useContext, useEffect, useState } from "react";
import { EyesButton } from "../../components/button/button.jsx";
import { AuthContext } from "../../contexts/auth.js";
import Loading from "../../components/loading/index.jsx";
import api from "../../constants/api.js";
import { ModalCustom } from "../../components/modalcustom/index.jsx";
import { LoginContext } from "../../contexts/login.jsx";
import { LoaderIcon } from "lucide-react-native";

function Login(props) {
    const [hidepassword, sethidepassword] = useState(false)
    const { user, setuser, } = useContext(AuthContext);
    const { loading, statusapi, activenotification, setactivenotification, msgnotification, setloading, loginemail, setloginemail, loginpassword, setloginpassword, AcessLogin } = useContext(LoginContext)
    const emailvalido = loginemail.includes('@') && loginemail.includes('.');
    const passwordvalido = loginpassword.trim().length >= 6
    async function LoginBD() {
        AcessLogin()
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
                            {activenotification ?
                                <ModalCustom msgmodal={msgnotification} statusapi={statusapi} onClose={() => setactivenotification(!activenotification)}></ModalCustom>
                                :''

                            }
                            <View style={styles.inputWrapper}>
                                <Image source={icon.email} style={styles.inputIcon}></Image>
                                <TextInput keyboardType="email-address" style={styles.input} placeholder='Digite seu email' onChangeText={(e) => setloginemail(e)} value={loginemail}></TextInput>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Image source={icon.lock} style={emailvalido ? styles.inputIcon : styles.inputIconDisable}></Image>
                                <TextInput style={emailvalido ? styles.input : styles.inputDisable} secureTextEntry={hidepassword} placeholderTextColor={emailvalido ? '#000' : 'rgb(44, 151, 151)'} placeholder="Senha..." onChangeText={(e) => setloginpassword(e)} editable={emailvalido}></TextInput>
                                <EyesButton
                                    onPress={() => sethidepassword(!hidepassword)}
                                    showPassword={!hidepassword}
                                ></EyesButton>
                            </View>
                        </View>
                        {/* <Agreecheck></Agreecheck> */}
                        <View style={styles.buttonContainer} >
                            <Button onPress={LoginBD} disabled={emailvalido & passwordvalido ? false : true} text='Login' />
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.textfoot}>Ja possui uma conta?</Text>
                            <TouchableOpacity onPress={RedirectCadastro}><Text style={styles.textlink}>Clique aqui</Text></TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export default Login