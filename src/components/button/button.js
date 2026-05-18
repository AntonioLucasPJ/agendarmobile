import { StyleSheet } from "react-native";
import { color, font_Size } from '../../constants/theme.js'
export const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: color.blue,
        borderRadius: 6,
        marginTop: 10,
        padding: 20
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: font_Size.lg,
        textAlign: 'center'
    },
    colored: {
        width: '100%',
        borderRadius: 6,
        marginTop: 10,
        padding: 20,
        backgroundColor: color.red
    },
    buttondisabled:{
        backgroundColor:"#CCCCCC"
    },
    buttonpassword:{
        width: '10%',
        height:'100%',
        backgroundColor:'#0000',
        borderRadius:30

    }
})