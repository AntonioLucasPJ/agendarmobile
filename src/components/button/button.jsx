import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { styles } from "./button.js";
import { IoEyeSharp } from "react-icons/io5";
import { Ionicons } from '@expo/vector-icons';
export function Button(props) {
    function enviarmsg() {
        alert('A mensagem foi enviada')
    }
    return (
        <TouchableOpacity
            style={[
                props.corbotao == 'red' ? styles.colored : styles.button,
                props.disabled == true ? styles.buttondisabled : ''
            ]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={[styles.text]}>{props.text}</Text>
        </TouchableOpacity>
    )
}
export function EyesButton({onPress,showPassword}) {
    function enviarmsg() {
        alert('A mensagem foi enviada')
    }
    {console.log(showPassword)}
    return (
        <TouchableOpacity
            style={styles.buttonpassword}
            onPress={onPress}
            

        >
            <Ionicons
                name={showPassword ? 'eye-off-sharp' : 'eye-sharp'}
                size={24}
                color='#666'
            />
        </TouchableOpacity >
    )
}


