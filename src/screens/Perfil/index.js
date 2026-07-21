import { Dimensions, Platform, StyleSheet, useWindowDimensions } from "react-native";
import { color, font_Size } from '../../constants/theme.js'
const { width } = Dimensions.get('window')
const IS_TABLET = width >= 600

export const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: '#f8fafc'
    },
    header: {
        flexDirection: 'row', // Para alinhar o título e o botão de salvar
        paddingHorizontal: IS_TABLET ? 32 : 24,
        paddingVertical: IS_TABLET ? 20 : 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        justifyContent: 'space-between', // Alinha itens nas extremidades
        alignItems: 'center',
        ...Platform.select({
            web: {
                maxWidth: 1000,
                width: '100%',
                alignSelf: 'center'
            },
            default: {
                width: '100%'
            }
        })
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#002F6C',
    },
    saveButton: { // Novo estilo para o botão de salvar no header
        backgroundColor: '#002F6C',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: IS_TABLET ? 32 : 24,
        paddingBottom: 40,
        ...Platform.select({
            web: {
                maxWidth: 600,
                width: '100%',
                alignSelf: "center"
            },
            default: {
                width: '100%'
            }
        })
    },
    mainGrid: {
        width: '100%',
        maxWidth: 1000, // Limite confortável para leitura em tablets e web
        flexDirection: IS_TABLET ? 'row' : 'column',
        alignItems: 'flex-start',
        justifyContent:"space-between",
        gap: IS_TABLET ? 24 : 0, // Dp de espaçamento entre as colunas no tablet
    },
    gridColumnLeft: {
        width: IS_TABLET ? '48%' : '100%',
        marginRight: IS_TABLET ? '2%' : 0,
    },
    gridColumnRight: {
        width: IS_TABLET ? '48%' : '100%',
    },
    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatarContainer: { // Novo container para o avatar editável
        width: 70,
        height: 70,
        marginRight: 16,
        position: 'relative',
    },
    avatarCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
        backgroundColor: '#F0F4F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPhoto: { // Novo estilo para a foto de perfil real
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    initialsText: { // Novo estilo para as iniciais
        fontSize: 24,
        fontWeight: 'bold',
        color: '#002F6C',
    },
    editIconContainer: { // Novo estilo para o ícone de câmera para editar foto
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#002F6C',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    profileInfo: {
        flex: 1,
    },
    inputLabel: { // Novo estilo para rótulos de campos de input
        fontSize: 12,
        color: '#64748B',
        marginBottom: 2,
    },
    userNameInput: { // Alterado userName para userNameInput editável
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 8,
        borderBottomWidth: 1, // Adiciona borda para feedback de edição
        borderBottomColor: '#F1F5F9',
        paddingVertical: 2,
    },
    userEmailInput: { // Alterado userEmail para userEmailInput editável
        fontSize: 14,
        color: '#64748B',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingVertical: 2,
    },
    userPhoneInput: { // Novo estilo para o input de telefone
        fontSize: 14,
        color: '#64748B',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingVertical: 2,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#002F6C',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
    },
    addressBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 28,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderColor: '#E2E8F0',
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginLeft: 8,
    },
    addressDetails: {
        marginBottom: 16,
    },
    addressText: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 4,
    },
    bold: {
        fontWeight: '600',
        color: '#1E293B',
    },
    noAddressText: {
        fontSize: 14,
        color: '#64748B',
        fontStyle: 'italic',
        marginBottom: 16,
    },
    editAddressButton: {
        flexDirection: 'row',
        backgroundColor: '#002F6C',
        paddingVertical: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editAddressButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    menuContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#334155',
        marginLeft: 12,
    },
    versionText: {
        textAlign: 'center',
        color: '#94A3B8',
        fontSize: 12,
        marginTop: 32,
    },
})