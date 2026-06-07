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
    containerDeFundo: {
        flex: 1,
    },
    absoluteBlur: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 99, 
    },
    content: {
        padding: 20
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40, // Dá espaço extra na rolagem para o botão não cobrir os inputs
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
        width: 95,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,       // Espaçamento entre um card e outro na horizontal
        paddingVertical: 4,
    },
    logoCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,      // Metade de 70 = Círculo Perfeito!
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,           // Espaço interno para a logo não colar na borda do círculo
        overflow: 'hidden',    // Corta o fundo branco quadrado da imagem para não sair do círculo
    },

    // Quando a marca for selecionada, a borda do círculo fica azul (ou o fundo, se preferir)
    logoCircleSelected: {
        borderColor: '#3182CE',
        borderWidth: 2,
        // Se quiser que o fundo do círculo fique azul inteiro, ative a linha abaixo:
        // backgroundColor: '#EBF8FF', 
    },
    brandLogo: {
        width: '100%',
        height: 100

    }, // tintColor aplica filtro cinza nas logos
    cardText: {
        fontSize: 14,
        color: '#4A5568',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 8
    },
    cardTextSelected: {
        color: '#3182CE',
        fontWeight: '700'
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',          // Faz os itens irem para a linha de baixo automaticamente
        justifyContent: 'space-between', // Distribui os itens de forma idêntica nas pontas
        paddingVertical: 8,
    },
    colorCard: {
        width: '30%',              // Ocupa quase 1/3 da largura total da tela
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',      // Centraliza a bolinha e o texto no meio do cartão
        justifyContent: 'center',
        marginBottom: 12,          // Espaço para os cartões de baixo não colarem
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    colorCardSelected: {
        borderColor: '#3182CE',
        backgroundColor: '#EBF8FF',
    },
    colorCircleGrid: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginBottom: 8,           // Espaço entre a bolinha e o texto embaixo dela
        // Sombra leve para dar profundidade às cores claras (como branco/prata)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
    },
    colorCardText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#4A5568',
        textAlign: 'center',
    },

    colorCardTextSelected: {
        color: '#2B6CB0',
        fontWeight: '700',
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