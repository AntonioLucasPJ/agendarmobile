import { Dimensions, StyleSheet } from "react-native";
import { color } from "../../constants/theme";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    
    gridContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Distribui os dois componentes igualmente nas pontas
        marginBottom: 16, // Espaçamento vertical entre as linhas do cubo
    },

    // Estilos internos do Componente MeetService transformado em Quadrado
    serviceCard: {
        height: 160, // Altura fixa para deixá-lo quadradinho
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        // Sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconContainerCube: {
        flexDirection:'row',
        width: 50,
        height: 50,
        borderRadius: 22,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainerCube: {
        alignItems: 'center',
        width: '100%',
    },
    serviceNameCube: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
    },
    bottomRowCube: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 8,
    },
    priceTextCube: {
        fontSize: 12,
        fontWeight: '700',
        color: '#ea580c',
    },
    btnAgendarCube: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 12,
    },
    btnTextCube: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    }
});