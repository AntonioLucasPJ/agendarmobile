import { StyleSheet } from "react-native";
import {color,font_Size} from '../../constants/theme.js'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',

    },
    scrollContainer:{
        flexGrow:1,
        justifyContent:'center',
        paddingHorizontal:24,
        paddingBottom:24
    },
    logoContainer:{
        alignItems:"center",
        marginBottom:40
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        // opacity:0.1
    },
    logo: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
        marginTop: 40,
        marginBottom: 20
    },
    
    formContainer: {
        backgroundColor:'#ffffff',
        borderRadius:20,
        padding:24,
        borderWidth:1,
        borderColor:'#cbd5e1',
        elevation:4
    },
    inputWrapper: {
        flexDirection: 'row',
        alignContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        marginBottom: 25,
        height: 50
    },
    btnText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        tintColor: '#666',
    },
    inputIconDisable: {
        width: 30,
        height: 30,
        marginRight: 10,
        tintColor: '#cfc7c7',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#666'
        // backgroundColor:color.gray5,
    },
    inputDisable: {
        flex: 1,
        fontSize: 16,
        color: '##cfc7c7'
        // backgroundColor:color.gray5,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 30,
    },
    footer: {
        flexDirection: "row",
        marginTop: 30
    },
    textfoot: {
        color: '#666',
        fontSize: 18
    },
    textlink: {
        color: '#0066FF',
        fontSize: 18,
        fontWeight: 'bold'
    }
})