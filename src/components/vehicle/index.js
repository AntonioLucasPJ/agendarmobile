import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    vehicleCardHorizontal: {
        width: 380,
        backgroundColor: '#0A0F1D', // Slate 900 (Fundo escuro premium ultra moderno)
        borderRadius: 18,
        padding: 16,
        marginRight: 12,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        height:40,
        marginBottom:10
    },
    brandBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 6,
    },
    vehicleBrandText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        includeFontPadding:false
    },
    vehicleCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginVertical: 12,
        width:'100%'
    },
    vehicleImageRealHorizontal: {
        width: 110,
        height: 75,
        marginRight: 12,
    },
    vehicleDetailsHorizontal: {
        flex: 1,
        justifyContent:'center'
    },
    modelTextHorizontal: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    
    // 🔥 TAG FORMATO PLACA MERCOSUL REALISTA
    plateBadgeHorizontal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        overflow: 'hidden',
        marginBottom: 6,
    },
    plateBlueBar: {
        width: 4,
        height: '100%',
        backgroundColor: '#3182C3',
    },
    plateTextHorizontal: {
        fontSize: 11,
        fontWeight: '800',
        color: '#1E293B',
        paddingHorizontal: 6,
        paddingVertical: 1,
        letterSpacing: 0.5,
    },
    colorTextHorizontal: {
        fontSize: 12,
        color: '#94A3B8',
        textTransform: 'capitalize',
    },
    cardFooterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
        paddingTop: 12,
        marginTop: 2,
    },
    statusDotHorizontal: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981', // Verde esmeralda brilhante
        marginRight: 8,
    },
    statusTextHorizontal: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },

    // ESTILO ESTADO VAZIO (SEM CARROS)
    cardEmpty: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitleEmpty: {
        fontSize: 16,
        fontWeight: '700',
        color: '#334155',
        marginTop: 12,
    },
    cardSubTitleEmpty: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 16,
        lineHeight: 18,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#3182C3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 14,
        alignItems: 'center',
        gap: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
})