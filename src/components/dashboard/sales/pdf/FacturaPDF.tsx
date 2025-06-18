// components/pdf/FacturaPDF.jsx

import { ProductCart, ResponseSale } from '@/src/types/dashboard/SaleTypes';
import { styles } from '@/src/utils/constants/stylesPDF';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { formatCurrency, formatDate, formatTime } from './helpers';

type FacturaPDFProps = {
    sale: ResponseSale;
    products: ProductCart[];
};

export default function FacturaPDF({ sale, products }: FacturaPDFProps) {
    const subtotalBase = products.reduce((acc, p) => acc + (p.precio_base * p.cantidad), 0);
    const totalIGV = products.reduce((acc, p) => acc + (p.igv_unitario * p.cantidad), 0);
    const totalConIGV = products.reduce((acc, p) => acc + p.subtotal + p.igv, 0);
    const totalDescuento = products.reduce(
        (acc, p) => acc + ((p.precio_base * p.descuento) / 100) * p.cantidad,
        0
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <View style={styles.companyInfo}>
                            <Text style={styles.companyName}>NEON</Text>
                            <Text style={styles.companySubtitle}>Comercio Electrónico</Text>
                            <Text style={styles.companySubtitle}>Sistema de Ventas Intranet</Text>
                            <Text style={styles.companySubtitle}>RUC: no-tenemos</Text>
                        </View>
                        <View style={styles.boletaInfo}>
                            <Text style={styles.boletaTitle}>BOLETA DE VENTA</Text>
                            <Text style={styles.boletaNumber}>N° {String(sale.id).padStart(8, '0')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>

                    <View style={styles.clientSection}>
                        <Text style={styles.sectionTitle}>Información de la Venta</Text>
                        <View style={styles.clientGrid}>
                            <View style={styles.clientItem}>
                                <Text style={styles.clientLabel}>CLIENTE:</Text>
                                <Text style={styles.clientValue}>{sale.nombreCliente}</Text>
                            </View>
                            <View style={styles.clientItem}>
                                <Text style={styles.clientLabel}>VENDEDOR:</Text>
                                <Text style={styles.clientValue}>{sale.nombreUsuario}</Text>
                            </View>
                            <View style={styles.clientItem}>
                                <Text style={styles.clientLabel}>FECHA:</Text>
                                <Text style={styles.clientValue}>{formatDate(sale.fecha)}</Text>
                            </View>
                            <View style={styles.clientItem}>
                                <Text style={styles.clientLabel}>HORA:</Text>
                                <Text style={styles.clientValue}>{formatTime(sale.fecha)}</Text>
                            </View>
                            <View style={styles.clientItem}>
                                <Text style={styles.clientLabel}>MÉTODO DE PAGO:</Text>
                                <Text style={styles.clientValue}>{sale.nombreMetodoPago}</Text>
                            </View>
                            <View style={styles.clientItem}>
                                <Text style={styles.clientLabel}>ESTADO:</Text>
                                <Text style={styles.clientValue}>{sale.cancelado ? 'CANCELADO' : 'PAGADO'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.productsSection}>
                        <Text style={styles.sectionTitle}>Detalle de Productos</Text>

                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, styles.colProduct]}>PRODUCTO</Text>
                            <Text style={[styles.tableHeaderCell, styles.colQty]}>DESC.</Text>
                            <Text style={[styles.tableHeaderCell, styles.colQty]}>CANT.</Text>
                            <Text style={[styles.tableHeaderCell, styles.colPrice]}>P. UNIT.</Text>
                            <Text style={[styles.tableHeaderCell, styles.colSubtotal]}>SUBTOTAL</Text>
                            <Text style={[styles.tableHeaderCell, styles.colIgv]}>IGV</Text>
                            <Text style={[styles.tableHeaderCell, styles.colTotal]}>TOTAL</Text>
                        </View>

                        {products.map((producto, index) => {
                            const subtotalBase = producto.precio_base * producto.cantidad;
                            const igvTotal = producto.igv_unitario * producto.cantidad;
                            const totalFinal = producto.subtotal + producto.igv;

                            return (
                                <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                                    <Text style={[styles.tableCellBold, styles.colProduct]}>{producto.nombre}</Text>
                                    <Text style={[styles.tableCell, styles.colQty]}>{producto.descuento}%</Text>
                                    <Text style={[styles.tableCell, styles.colQty]}>{producto.cantidad}</Text>
                                    <Text style={[styles.tableCell, styles.colPrice]}>{formatCurrency(producto.precio_venta)}</Text>
                                    <Text style={[styles.tableCell, styles.colSubtotal]}>{formatCurrency(subtotalBase)}</Text>
                                    <Text style={[styles.tableCell, styles.colIgv]}>{formatCurrency(igvTotal)}</Text>
                                    <Text style={[styles.tableCellBold, styles.colTotal]}>{formatCurrency(totalFinal)}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.summarySection}>
                        <View style={styles.summaryLeft}>
                            <Text style={styles.sectionTitle}>Información Adicional</Text>
                            <Text style={styles.footerText}>• Boleta válida solo con sello y firma</Text>
                            <Text style={styles.footerText}>• Gracias por su compra</Text>
                            <Text style={styles.footerText}>• IGV incluido según ley</Text>
                            <Text style={styles.footerText}>• Consultas: soporte@neon.com</Text>
                        </View>

                        <View style={styles.summaryRight}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal (sin descuento ni IGV):</Text>
                                <Text style={styles.summaryValue}>{formatCurrency(subtotalBase)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Descuento aplicado:</Text>
                                <Text style={styles.summaryValue}>-{formatCurrency(totalDescuento)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>IGV:</Text>
                                <Text style={styles.summaryValue}>{formatCurrency(totalIGV)}</Text>
                            </View>

                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
                                <Text style={styles.totalValue}>{formatCurrency(totalConIGV)}</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <Text style={styles.footerText}>NEON - Sistema de Ventas Intranet</Text>
                        <Text style={styles.footerText}>Av. Tecnología 123, Lima - Perú</Text>
                        <Text style={styles.footerText}>Tel: (01) 234-5678 | Email: info@neon.com</Text>
                        <Text style={styles.footerText}>Generado el: {new Date().toLocaleString('es-PE')}</Text>
                    </View>
                    <View style={styles.footerRight}>
                        <Text style={styles.qrText}>QR Code (no tenemos)</Text>
                        <Text style={styles.qrText}>Verificación</Text>
                        <Text style={styles.qrText}>¿Digital?</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
