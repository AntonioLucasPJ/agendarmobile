import { StyleSheet } from "react-native";
import { color, font_Size } from "../../constants/theme";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        maxWidth:600,
        width:'90%',
        alignSelf:'center',
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#f1f5f9',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        flex: 1,
        paddingLeft: 14
    },
    serviceName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0f172a',
    },
    mechanicName: {
        fontWeight: '500',
        color: '#475569',
    },
    description: {
        fontSize: 13,
        color: '#1e293b',
        marginTop: 3,
        fontWeight: '500',
    },
    specialtyText: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 1,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 14,
    },
    priceBadge: {
        backgroundColor: '#1e3a8a', // Segue o tom escuro azul do mockup para contraste
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 12,
    },
    priceText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
    },
    btnAction: {
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    }
})