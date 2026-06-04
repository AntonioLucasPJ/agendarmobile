import { StyleSheet } from "react-native";
import { color, font_Size } from '../../constants/theme.js'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        padding: 20
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
    containerinput: {
        width: '100%',
        paddingHorizontal: 10
    },
    inputWrapper: {
        flexDirection: 'row',
        alignContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        marginBottom: 25,
        height: 50
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        tintColor: '#666',
    },
    emptyContainer: {
        backgroundColor: '#FFF5F5', // Fundo vermelho bem claro para indicar aviso/atenção
        borderWidth: 1,
        borderColor: '#FED7D7',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 14,
        fontWeight:'bold',
        color: '#C53030', // Texto em tom vermelho escuro para dar contraste e legibilidade
        fontWeight: '500',
        textAlign: 'center'
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