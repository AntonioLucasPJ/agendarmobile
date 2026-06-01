import { Dimensions, StyleSheet } from "react-native";
import { color, font_Size } from '../../constants/theme.js'
const width = Dimensions.get('window')
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    backButton: { padding: 8 },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#14213d',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    scrollContent: { padding: 20 },
    resumoCard: {
        flexDirection: 'row',
        backgroundColor: '#14213d', // Azul escuro principal do app
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    resumoIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14
    },
    resumoTextContainer: { flex: 1 },
    resumoNome: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
    resumoDescricao: { fontSize: 12, color: '#cbd5e1', marginTop: 2, marginBottom: 4 },
    resumoPreco: { fontSize: 14, fontWeight: '700', color: '#e08519' }, // Laranja em destaque
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#14213d',
        marginTop: 20,
        marginBottom: 12,
        letterSpacing: 0.5
    },
    calendarCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    hoursGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    hourButton: {
        width: (width - 64) / 3,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    hourButtonActive: {
        backgroundColor: '#ff0037',
        borderColor: '#14213d'
    },
    hourButtonDisabled: {
        backgroundColor: '#f1f5f9',
        borderColor: '#e2e8f0',
        opacity: 0.6
    },
    hourText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569'
    },
    hourTextActive: {
        color: '#cc4b4b',
        fontWeight: 'bold'
    },
    hourTextDisabled: {
        color: '#94a3b8',
        textDecorationLine: 'line-through' // Riscado para indicar indisponibilidade imediata
    },
    btnConfirmar: {
        backgroundColor: '#e08519',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
        marginBottom: 20,
        shadowColor: '#e08519',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    btnConfirmarDisabled: {
        backgroundColor: '#cbd5e1',
        shadowColor: 'transparent',
        elevation: 0,
    },
    btnConfirmarText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    centerLoading: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        marginTop: 10,
        color: '#64748b',
        fontSize: 14
    },
    feedbackContainer: {
        padding: 20,
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        alignItems: 'center'
    },
    feedbackText: {
        color: '#64748b',
        textAlign: 'center',
        fontSize: 14
    }
})