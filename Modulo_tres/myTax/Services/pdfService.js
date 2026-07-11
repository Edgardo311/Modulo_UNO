import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const buildInvoiceHTML = (cfdi) => {
  const conceptosRows = (cfdi.conceptos || [])
    .map(
      (concepto) => `
        <tr>
          <td>${concepto.descripcion}</td>
          <td>${concepto.cantidad || ''}</td>
          <td>${concepto.unidad || ''}</td>
          <td>${concepto.valor || ''}</td>
        </tr>`
    )
    .join('');

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #ccc; padding: 8px; }
          th { background: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>CFDI</h1>
        <p><strong>Emisor:</strong> ${cfdi.emisor?.nombre || ''}</p>
        <p><strong>Receptor:</strong> ${cfdi.receptor?.nombre || ''}</p>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            ${conceptosRows}
          </tbody>
        </table>
        <p><strong>Subtotal:</strong> ${cfdi.subtotal || 0}</p>
        <p><strong>Impuestos:</strong> ${cfdi.totalImpuestos || 0}</p>
        <p><strong>Total:</strong> ${cfdi.total || 0}</p>
      </body>
    </html>`;
};

export const generatePDF = async (cfdi) => {
  const html = buildInvoiceHTML(cfdi);
  const options = { html };
  const { uri } = await Print.printToFileAsync(options);
  const pdfUri = `${FileSystem.documentDirectory}cfdi-${cfdi.id || Date.now()}.pdf`;
  await FileSystem.copyAsync({ from: uri, to: pdfUri });
  return pdfUri;
};

export const sharePDF = async (pdfUri) => {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error('Compartir no está disponible en este dispositivo');
  }
  return Sharing.shareAsync(pdfUri);
};
