export const createDraftCFDI = ({
  emisor,
  receptor,
  conceptos = [],
  impuestos = [],
  formaPago = '',
  moneda = '',
  tipoDeComprobante = '',
  usoCFDI = '',
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

  let subtotal = 0;
  let iva = 0;
  let retIVA = 0;
  let retISR = 0;

  draft.conceptos?.forEach((concepto) => {

    const importe =
      (
        Number(concepto.cantidad || 0) *
        Number(concepto.valorUnitario || 0)
      ) -
      Number(concepto.descuento || 0);

    subtotal += importe;

    // IVA
    if (concepto.aplicaIVA) {

      const baseIVA =
        Number(concepto.baseIVA || 0);

      const tasaIVA =
        Number(concepto.tasaIVA || 0);

      iva +=
        baseIVA *
        (tasaIVA / 100);
    }

    // Retención IVA
    if (concepto.aplicaRetIVA) {

      const baseRetIVA =
        Number(concepto.baseRetIVA || 0);

      let tasaRetIVA = 0;

      if (concepto.tasaRetIVA === '50IVA') {
        tasaRetIVA = 8;
      } else {
        tasaRetIVA =
          Number(concepto.tasaRetIVA || 0);
      }

      retIVA +=
        baseRetIVA *
        (tasaRetIVA / 100);
    }

    // Retención ISR
    if (concepto.aplicaRetISR) {

      const baseRetISR =
        Number(concepto.baseRetISR || 0);

      const tasaRetISR =
        Number(concepto.tasaRetISR || 0);


      retISR +=
        baseRetISR *
        (tasaRetISR / 100);
    }

  });

  const totalImpuestos =
    iva - retIVA - retISR;

  const total =
    subtotal + totalImpuestos;

  return {
    subtotal,
    iva,
    retIVA,
    retISR,
    totalImpuestos,
    total,
  };
};

