import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    bannerWrapper: {
        width: '100%'
    },
    alertBanner: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        borderLeftWidth: 5,
        borderLeftColor: '#D9531E',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 }
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    alertTextContainer: {
        marginLeft: 12,
        flex: 1
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366'
    },
    alertDescription: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
        lineHeight: 18
    },
    bannerButton: {
        backgroundColor: '#003366',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 14,
        alignItems: 'center'
    },
    bannerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    },

    // Bottom Sheet
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        zIndex: 9999
    },
    blurArea: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomSheet: {
        width: "100%",
        position: "absolute",
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingBottom: 40
    },
    sheetHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 40,
        marginBottom: 16
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#CBD5E1',
        borderRadius: 3,
        marginTop: 8
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 10,
        backgroundColor: '#F1F5F9',
        padding: 6,
        borderRadius: 20
    },
    sheetContent: {
        marginTop: 10
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginBottom: 16
    },
    sheetSubtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 25,
        paddingHorizontal: 10
    },
    primaryButton: {
        backgroundColor: '#003366',
        height: 52,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    successButton: {
        backgroundColor: '#10B981',
        height: 52,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    addressInputBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingVertical: 6,
        marginBottom: 4,
    },
    addressInputSub: {
        fontSize: 14,
        color: '#475569',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingVertical: 6,
        marginBottom: 4,
    },
    addressPreviewBox: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 20,
    },
    addressTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B'
    },
    addressTextSub: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4
    },
    inputLabel: {
        fontSize: 11,
        textTransform: 'uppercase',
        color: '#94A3B8',
        fontWeight: '700',
        marginTop: 8,
        marginBottom: 2,
    },
})