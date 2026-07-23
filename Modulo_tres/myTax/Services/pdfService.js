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
          <td>${concepto.valorUnitario || ''}</td>
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
<p><strong>RFC:</strong> ${cfdi.emisor?.rfc || ''}</p>

<p><strong>Receptor:</strong> ${cfdi.receptor?.nombre || ''}</p>
<p><strong>RFC:</strong> ${cfdi.receptor?.rfc || ''}</p>
<p><strong>CP:</strong> ${cfdi.receptor?.codigoPostal || ''}</p>        <table>
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
<p>
  <strong>Subtotal:</strong>
  ${Number(cfdi.subtotal || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>

<p>
  <strong>IVA:</strong>
  ${Number(cfdi.iva || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>

<p>
  <strong>Retención IVA:</strong>
  ${Number(cfdi.retIVA || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>

<p>
  <strong>Retención ISR:</strong>
  ${Number(cfdi.retISR || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>

<p>
  <strong>Total:</strong>
  ${Number(cfdi.total || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</p>
      </body>
    </html>`;
};

export const generatePDF = async (cfdi) => {

  const html = buildInvoiceHTML(cfdi);

  const { uri } =
    await Print.printToFileAsync({
      html,
    });

  return uri;
};

export const sharePDF = async (pdfUri) => {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error('Compartir no está disponible en este dispositivo');
  }
  return Sharing.shareAsync(pdfUri);
};
