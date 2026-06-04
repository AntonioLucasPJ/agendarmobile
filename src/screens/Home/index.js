import { StyleSheet } from "react-native";
import { color } from "../../constants/theme";

export const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: '#F1F5F9'
    },
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9'
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 20
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 0.5,
        marginBottom: 12
    },
    // Cards principais
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
        marginBottom: 24
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 0.5,
        marginBottom: 12
    },
    vehicleImageReal: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#E2E8F0' // Cor de fundo enquanto a foto carrega
    },
    // Layout com veículo
    vehicleInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    vehicleImagePlaceholder: {
        backgroundColor: '#EBF8FF',
        padding: 10,
        borderRadius: 8
    },
    vehicleDetails: {
        flex: 1,
        gap: 4
    },
    vehicleText: {
        fontSize: 14,
        color: '#4A5568'
    },
    bold: {
        fontWeight: '700',
        color: '#0F172A'
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 6
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4A5568'
    },

    // Layout sem veículo (Empty State)
    emptyStateContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        gap: 16
    },
    addButton: {
        backgroundColor: '#3182CE',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600'
    },
    btnText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    containerimglogo: {
        width: '100%',
        height: 120,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#000'

    },
    text1: {
        fontSize: 20
    },
    imglogo: {
        width: 200,
        height: '100%',

    },
    tp: {
        width: '100%',
        fontSize: 25,
    },
    cardmecanico: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: color.white,
        borderCurve: color.red,
        gap: 15,
    },
    imgcard: {
        width: 100,
        height: '100%'
    },
    mecanicoinfor: {
        width: '100%',
        justifyContent: "center"

    },
    inforname: {
        fontSize: 25
    },
    inforsubtitle: {
        fontSize: 20,
        color: color.gray3
    },
    menu: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    imgmenu: {
        width: '8%',
        height: '100%'
    }
})