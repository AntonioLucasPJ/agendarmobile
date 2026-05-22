import { KeyboardAvoidingView, ScrollView, Platform,Image, TouchableWithoutFeedback, Keyboard,  Text, View, TextInput, Touchable, TouchableOpacity, Alert, ImageBackground } from "react-native";
import icon from '../../constants/icon.js'
import { Button } from "../../components/button/button.jsx";
import { EyesButton } from "../../components/button/button.jsx";
import { styles } from './index.js'
import api from "../../constants/api.js";
import { use, useContext, useEffect, useState } from "react";
import { ModalCustom } from "../../components/modalcustom/index.jsx";
import { SingupContext } from "../../contexts/user.jsx";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Loading from "../../components/loading/index.jsx";

function Cadastro(props) {
    const [hidepassword,sethidepassword] = useState(true)
    const {
        loading,setloading,
        user, setsinguser,
        cpf, setcpf,
        email, setsingemail,
        telefone, settelefone,
        password, setsingpassword,
        activenotification, setactivenotification,
        msgnotification, setmsgnotification,
        CreateNewUser
    } = useContext(SingupContext)
    const nomevalido = (user || '').trim().length >= 10;
    const emailvalido = email.includes('@') && email.includes('.');
    const telefonevalido = telefone.trim().length >= 11;
    const cpfvalido = cpf.trim().length >= 14
    const passwordvalido = password.trim().length >= 8
    useEffect(() => {
        console.log(
            activenotification
        )
    }, [activenotification])
    const handletelefone = (e) => {
        const valorformatado = FormartarTelefone(e)
        settelefone(valorformatado)
    }
    function FormartarTelefone(e) {
        return e
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    const handlecpf = (e) => {
        const valorformatado = FormatCPF(e)
        setcpf(valorformatado)
    }
    function FormatCPF(e) {
        return e
            .replace(/\D/g, '')//remover tudo o que não é digito
            .replace(/(\d{3})(\d)/, '$1.$2') //Coloca ponto após os 3 primeiros
            .replace(/(\d{3})(\d)/, '$1.$2') //Coloca ponto após os 6 primeiros
            .replace(/(\d{3})(\d)/, '$1-$2') //Coloca hifen antes
            .replace(/(-\d{2})\d+?$/, '$1'); //Limitar a 11 digitos
    }
    function SendAPI() {
        CreateNewUser()
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
                                <ModalCustom></ModalCustom>
                                : ''
                            }
                            <View style={styles.inputWrapper}>
                                <Image source={icon.userlogin} style={styles.inputIcon}></Image>
                                <TextInput style={styles.input} value={user} placeholderTextColor={'#000'} placeholder="Nome Completo" onChangeText={(e) => setsinguser(e)}></TextInput>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Image source={icon.email} style={nomevalido ? styles.inputIcon : styles.inputIconDisable}></Image>
                                <TextInput keyboardType="email-address" style={nomevalido ? styles.input : styles.inputDisable} placeholder='Digite seu email' placeholderTextColor={nomevalido ? '#000' : 'rgb(44, 151, 151)'} onChangeText={(e) => setsingemail(e)} editable={nomevalido} value={email}></TextInput>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Image source={icon.cpf} style={emailvalido ? styles.inputIcon : styles.inputIconDisable}></Image>
                                <TextInput style={emailvalido ? styles.input : styles.inputDisable} placeholder="CPF" placeholderTextColor={emailvalido ? '#000' : 'rgb(44, 151, 151)'} value={cpf} editable={emailvalido} onChangeText={(e) => handlecpf(e)}></TextInput>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Image source={icon.telefone} style={cpfvalido ? styles.inputIcon : styles.inputIconDisable}></Image>
                                <TextInput style={cpfvalido ? styles.input : styles.inputDisable} placeholder="(__)_____-____" placeholderTextColor={cpfvalido ? '#000' : 'rgb(44, 151, 151)'} value={telefone} onChangeText={(e) => handletelefone(e)} editable={cpfvalido}></TextInput>
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
                            <Button onPress={SendAPI} disabled={nomevalido & emailvalido & cpfvalido & telefonevalido & passwordvalido ? false : true} text='Criar Conta' />
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
export default Cadastro