import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF'
    },
    backButton: {
        padding: 4
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0F172A'
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    content: {
        padding: 20
    },

    // Banner explicativo
    bannerContainer: {
        alignItems: 'center',
        backgroundColor: '#EBF8FF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#BEE3F8',
        gap: 8
    },
    bannerText: {
        fontSize: 13,
        color: '#2B6CB0',
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 18
    },

    label: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 12,
        marginTop: 8,
        letterSpacing: 0.5
    },

    // Listagem horizontal de Marcas
    horizontalScroll: {
        marginBottom: 24,

    },
    brandCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center', 
        marginRight: 12, 
        width: 105,
        height: 95,
        gap: 6, 
        elevation: 1
    },
    brandLogo: {
        width: 80,
        height: 80,

    }, // tintColor aplica filtro cinza nas logos
    brandLogoSelected: {
        tintColor: '#FFFFFF',
        backgroundColor: '#000'
    }, // Fica branca quando selecionada
    cardSelected: {
        backgroundColor: '#3182CE',
        borderColor: '#3182CE'
    },
    cardText: {
        fontSize: 14,
        color: '#4A5568',
        fontWeight: '600'
    },
    cardTextSelected: {
        color: '#ffffff'
    },

    // Grid de Modelos
    animatedSection: {
        marginBottom: 24
    },
    modelsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    modelChip: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    modelChipSelected: {
        backgroundColor: '#3182CE',
        borderColor: '#3182CE'
    },
    modelChipText: {
        color: '#4A5568',
        fontSize: 14,
        fontWeight: '500'
    },
    modelChipTextSelected: {
        color: '#FFFFFF',
        fontWeight: '600'
    },

    // Inputs com ícones estilizados
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginBottom: 14,
        paddingHorizontal: 12
    },
    inputIcon: {
        marginRight: 10
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: '#0F172A'
    },

    // Botão de envio
    saveButton: {
        backgroundColor: '#3182CE',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
        elevation: 2
    },
    saveButtonDisabled: {
        backgroundColor: '#A0AEC0'
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600'
    }
});