import { Platform, StatusBar, StyleSheet } from "react-native";
import { color } from "../../constants/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e8f0', // Fundo levemente acinzentado do mockup
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#0f172a',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    mecanicoCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 14,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        elevation: 3,
    },
    avatar: {
        width: 80,
        height: 85,
        borderRadius: 14,
        backgroundColor: '#cbd5e1',
    },
    mecanicoInfo: {
        flex: 1,
        paddingLeft: 14,
    },
    mecanicoHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mecanicoName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#475569',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ratingText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
        marginRight: 4,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 1,
    },
    mecanicoTitle: {
        fontSize: 15,
        color: '#334155',
        marginTop: 2,
    },
    mecanicoSpecialty: {
        fontSize: 14,
        color: '#475569',
    },
    mecanicoFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    miniIcons: {
        flexDirection: 'row',
    },
    experienceBadge: {
        backgroundColor: '#475569',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
    },
    experienceText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
    contentErro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32, // Margem interna maior para o texto não colar nas bordas
    },
    iconCircle: {
        width: 140,
        height: 140,
        backgroundColor: '#cbd5e1',
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        elevation: 1,
    },
    tituloErro: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: 10,
    },
    descricaoErro: {
        fontSize: 15,
        color: '#475569',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    btnVoltar: {
        backgroundColor: '#475569', // Tom cinza escuro elegante
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 16,
        width: '100%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    btnVoltarText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.5,
    }
});