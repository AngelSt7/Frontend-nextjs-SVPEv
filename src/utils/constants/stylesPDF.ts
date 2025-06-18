
import { StyleSheet} from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontSize: 10,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#1a1a2e',
        padding: 20,
        color: '#ffffff',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    companyInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    companySubtitle: {
        fontSize: 11,
        color: '#b0b0b0',
        marginBottom: 2,
    },
    boletaInfo: {
        textAlign: 'right',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        color: '#1a1a2e',
        border: '2px solid #e9ecef',
    },
    boletaTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    boletaNumber: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    clientSection: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        border: '1px solid #e9ecef',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    clientGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    clientItem: {
        width: '50%',
        marginBottom: 8,
    },
    clientLabel: {
        fontSize: 9,
        color: '#666',
        marginBottom: 2,
    },
    clientValue: {
        fontSize: 10,
        color: '#1a1a2e',
        fontWeight: 'bold',
    },
    productsSection: {
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
        padding: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 12,
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#ffffff',
    },
    tableRowAlt: {
        flexDirection: 'row',
        padding: 12,
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa',
    },
    tableCell: {
        fontSize: 9,
        color: '#333',
    },
    tableCellRight: {
        fontSize: 9,
        color: '#333',
        textAlign: 'right',
    },
    tableCellBold: {
        fontSize: 9,
        color: '#1a1a2e',
        fontWeight: 'bold',
    },

    colProduct: { width: '40%' },
    colQty: { width: '10%', textAlign: 'center' },
    colPrice: { width: '15%', textAlign: 'right' },
    colSubtotal: { width: '15%', textAlign: 'right' },
    colIgv: { width: '12%', textAlign: 'right' },
    colTotal: { width: '15%', textAlign: 'right' },

    summarySection: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryLeft: {
        width: '60%',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    summaryRight: {
        width: '35%',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingBottom: 8,
    },
    summaryLabel: {
        fontSize: 10,
        color: '#666',
    },
    summaryValue: {
        fontSize: 10,
        color: '#333',
        fontWeight: 'bold',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        borderTop: '2px solid #1a1a2e',
    },
    totalLabel: {
        fontSize: 12,
        color: '#1a1a2e',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    totalValue: {
        fontSize: 12,
        color: '#1a1a2e',
        fontWeight: 'bold',
    },

    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        borderTop: '1px solid #e9ecef',
    },
    footerLeft: {
        flex: 1,
    },
    footerText: {
        fontSize: 8,
        color: '#666',
        marginBottom: 2,
    },
    footerRight: {
        width: 80,
        height: 80,
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrText: {
        fontSize: 8,
        color: '#666',
        textAlign: 'center',
    },
    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' },
    mb5: { marginBottom: 5 },
    mb10: { marginBottom: 10 },
});