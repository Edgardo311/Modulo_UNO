export const createDraftCFDI = ({
  emisor,
  receptor,
  conceptos = [],
  impuestos = [],
  formaPago = '',
  moneda = 'MXN',
  tipoDeComprobante = 'I',
  usoCFDI = 'G03',
  Clavedelproductooservicio = '',
  cantidad = '',
  observaciones = '',
}) => {
  const subtotal = conceptos.reduce((sum, item) => sum + Number(item.valor || 0), 0);
  const totalImpuestos = impuestos.reduce((sum, item) => sum + Number(item.importe || 0), 0);
  const total = subtotal + totalImpuestos;

  return {
    id: String(Date.now()),
    emisor,
    receptor,
    conceptos,
    impuestos,
    formaPago,
    moneda,
    tipoDeComprobante,
    usoCFDI,
    Clavedelproductooservicio,
    cantidad,
    observaciones,
    subtotal,
    totalImpuestos,
    total,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const buildCFDIPayload = (draft) => {
  return {
    ...draft,
    fecha: new Date().toISOString(),
    sello: '',
    uuid: '',
    certificado: '',
    formaPago: draft.formaPago || 'PUE',
  };
};

export const validateCFDI = (draft) => {
  if (!draft.emisor?.rfc || !draft.receptor?.rfc) {
    return { valid: false, message: 'Emisor o receptor incompleto' };
  }

  if (!draft.conceptos?.length) {
    return { valid: false, message: 'Agrega al menos un concepto' };
  }

  return { valid: true };
};

export const calculateTotals = (draft) => {
  const subtotal = draft.conceptos?.reduce((sum, item) => sum + Number(item.valor || 0), 0) || 0;
  const totalImpuestos = draft.impuestos?.reduce((sum, item) => sum + Number(item.importe || 0), 0) || 0;
  return {
    subtotal,
    totalImpuestos,
    total: subtotal + totalImpuestos,
  };
};
