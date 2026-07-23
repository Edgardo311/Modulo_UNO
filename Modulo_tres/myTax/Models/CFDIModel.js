export const createEmptyCFDI = () => ({
  id: '',

  emisor: null,

  receptor: null,

  tipoComprobante: '',

  usoCFDI: '',

  formaPago: '',

  metodoPago: '',

  moneda: '',

conceptos: [
  {
    claveProductoServicio: '',

    descripcion: '',

    cantidad: '',

    claveUnidad: '',

    unidad: '',

    valorUnitario: '',

    importe: '',

    descuento: '',

    objetoImpuesto: '02',

    aplicaIVA: false,

    aplicaRetIVA: false,

    aplicaRetISR: false,

    aplicaIEPS: false,

    baseIVA: '',

    tasaIVA: '',

    tasaRetIVA: '',

    tasaRetISR: '',

    tasaIEPS: '',
  },
],
});