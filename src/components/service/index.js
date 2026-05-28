import { StyleSheet } from "react-native";
import { color } from "../../constants/theme";

export const styles = StyleSheet.create({
    serviceCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        elevation: 2,
    },
    serviceTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 65,
        height: 60,
        backgroundColor: '#cbd5e1',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceTextContainer: {
        flex: 1,
        paddingLeft: 14,
    },
    serviceName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    serviceDescription: {
        fontSize: 14,
        color: '#334155',
        marginTop: 2,
    },
    serviceBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 14,
    },
    priceBadge: {
        backgroundColor: '#d97706',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 14,
    },
    priceText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    btnAgendar: {
        paddingHorizontal: 28,
        paddingVertical: 8,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
    },
    bottomTabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#cbd5e1',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#94a3b8',
    },
    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    inactiveTabBox: {
        width: 44,
        height: 44,
        backgroundColor: '#475569',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    inactiveTabBoxText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
        position: 'absolute',
        bottom: 4,
    }
})