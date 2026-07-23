import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import {
  getEmisores,
  getReceptores,
  saveDraft,
} from '../Services/storageService';
import {
  calculateTotals,
  validateCFDI,
} from '../Services/cfdiService';
import { generatePDF } from '../Services/pdfService';
import { createEmptyCFDI } from '../Models/CFDIModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { sharePDF } from '../Services/pdfService';

export default function CFDIFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [cfdi, setCfdi] = useState(createEmptyCFDI());
  const [emisores, setEmisores] = useState([]);
  const [receptores, setReceptores] = useState([]);

  const [showSaveModal, setShowSaveModal] = useState(false);

const [nombreBorrador, setNombreBorrador] = useState('');

  const loadData = async () => {
    setEmisores(await getEmisores());
    setReceptores(await getReceptores());
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  useEffect(() => {
  //console.log('CFDI ACTUAL:', cfdi);
}, [cfdi]);

useEffect(() => {
  const selectedEmisor =
    route.params?.emisorSeleccionado ||
    route.params?.cfdi?.emisor ||
    route.params?.cfdiActual?.emisor;

  const selectedReceptor =
    route.params?.receptorSeleccionado ||
    route.params?.cfdi?.receptor ||
    route.params?.cfdiActual?.receptor;

  setCfdi((prev) => ({
    ...prev,
    ...(selectedEmisor ? { emisor: selectedEmisor } : {}),
    ...(selectedReceptor ? { receptor: selectedReceptor } : {}),
  }));
}, [
  route.params?.emisorSeleccionado,
  route.params?.receptorSeleccionado,
  route.params?.cfdi?.emisor,
  route.params?.cfdi?.receptor,
  route.params?.cfdiActual?.emisor,
  route.params?.cfdiActual?.receptor,
]);

useEffect(() => {

  if (route.params?.draft) {

    console.log(
      'BORRADOR RECIBIDO:',
      route.params.draft
    );

    setCfdi(route.params.draft);
  }

}, [route.params?.draft]);

  const handleChange = (field, value) => {
    setCfdi((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };


  const handleSelectReceptor = (id) => {
    const seleccionado = receptores.find((item) => item.id === id);
    if (seleccionado) {
      setCfdi((prev) => ({ ...prev, receptor: seleccionado }));
    }
  };

  const handleAddConcepto = () => {
    setCfdi((prev) => ({
      ...prev,
      conceptos: [
        ...prev.conceptos,
                {
          id: uuidv4(),

          claveProductoServicio: '',

          cantidad: '',

          claveUnidad: '',

          unidad: '',

          valorUnitario: '',

          importe: '',

          descuento: '',

          objetoImpuesto: '',

          tasaIVA: '',

          aplicaIVA: false,
          aplicaRetIVA: false,
          aplicaRetISR: false,
          aplicaIEPS: false,
          
          baseIVA: '',
          tasaIVA: '',

          baseRetIVA: '',
          tasaRetIVA: '',

          baseRetISR: '',
          tasaRetISR: '',

          descripcion: '',
          }],
      updatedAt: new Date().toISOString(),
    }));
  };

const handleConceptChange = (index, field, value) => {
  setCfdi((prev) => {
    const conceptos = [...prev.conceptos];

    conceptos[index] = {
      ...conceptos[index],
      [field]: value,
    };


    const concepto = conceptos[index];

    const subtotalCalculado =
      Number(concepto.cantidad || 0) *
      Number(concepto.valorUnitario || 0) -
      Number(concepto.descuento || 0);

    if (
      field === 'cantidad' ||
      field === 'valorUnitario' ||
      field === 'descuento'
    ) {
      if (concepto.aplicaIVA) {
        concepto.baseIVA = subtotalCalculado.toFixed(2);
      }

      if (concepto.aplicaRetIVA) {
        concepto.baseRetIVA = subtotalCalculado.toFixed(2);
      }

      if (concepto.aplicaRetISR) {
        concepto.baseRetISR = subtotalCalculado.toFixed(2);
      }
    }

    return {
      ...prev,
      conceptos,
      updatedAt: new Date().toISOString(),
    };
  });
};
  const handleSaveDraft = async () => {
    console.log('GUARDAR BORRADOR');
    const totals = calculateTotals(cfdi);
    const draft = {
      ...cfdi,
      ...totals,

      nombreBorrador,
      nombreEmisor:
        cfdi.emisor?.nombre || '',
      nombreReceptor:
        cfdi.receptor?.nombre || '',
        
      id: cfdi.id || String(Date.now()),
      status: 'draft',
      updatedAt: new Date().toISOString(),
      createdAt: cfdi.createdAt || new Date().toISOString(),
    };
      console.log(
    'DRAFT COMPLETO:',
    JSON.stringify(draft, null, 2)
  );
    await saveDraft(draft);
    Alert.alert('Guardado', 'Borrador guardado con éxito');
    navigation.goBack();
  };

const handleGeneratePDF = async () => {
  try {

    console.log('GENERANDO PDF');

    const totals = calculateTotals(cfdi);

    const draft = {
      ...cfdi,
      ...totals,
    };

const pdfUri = await generatePDF(draft);

console.log('PDF URI:', pdfUri);

await sharePDF(pdfUri);

  } catch (error) {

    console.log('ERROR PDF:', error);

    Alert.alert(
      'Error',
      String(error)
    );
  }
};

  const totals = calculateTotals(cfdi);

  return (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView 
    contentContainerStyle=
    {styles.container}>
      <Text style={styles.header}>CFDI</Text>

      <Text style={styles.label}>Emisor</Text>

        <View style={styles.selectedCard}>

        <Text style={styles.selectedValue}>
          {cfdi.emisor?.nombre || 'Sin seleccionar'}
        </Text>
        </View>

        <Text style={styles.label}>Receptor</Text>

          <View style={styles.selectedCard}>
          <Text style={styles.selectedValue}>
            {cfdi.receptor?.nombre || 'Sin seleccionar'}
          </Text>
          </View>

      <View style={styles.navigationRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('EmisoresList', { cfdiActual: cfdi })}
        >
          <Text style={styles.navButtonText}>Abrir Emisores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ReceptoresList', { cfdiActual: cfdi })}
        >
          <Text style={styles.navButtonText}>Abrir Receptores</Text>
        </TouchableOpacity>
      </View>

<Text style={styles.label}>
  Tipo de comprobante
</Text>

<Picker
  selectedValue={cfdi.tipoComprobante}
  onValueChange={(value) =>
    handleChange(
      'tipoComprobante',
      value
    )
  }
>
  {TIPOS_COMPROBANTE.map(item => (
    <Picker.Item
      key={item.value}
      label={item.label}
      value={item.value}
    />
  ))}
</Picker>

<Text style={styles.label}>
  Uso CFDI
</Text>

<Picker
  selectedValue={cfdi.usoCFDI}
  onValueChange={(value) =>
    handleChange('usoCFDI', value)
  }
>
  {USOS_CFDI.map(item => (
    <Picker.Item
      key={item.value}
      label={item.label}
      value={item.value}
    />
  ))}
</Picker>

<Text style={styles.label}>
  Forma de pago
</Text>

<Picker
  selectedValue={cfdi.formaPago}
  onValueChange={(value) =>
    handleChange(
      'formaPago',
      value
    )
  }
>
  {FORMAS_PAGO.map(item => (
    <Picker.Item
      key={item.value}
      label={item.label}
      value={item.value}
    />
  ))}
</Picker>

<Text style={styles.label}>
  Método de pago
</Text>

<Picker
  selectedValue={cfdi.metodoPago}
  onValueChange={(value) =>
    handleChange(
      'metodoPago',
      value
    )
  }
>
  {METODOS_PAGO.map(item => (
    <Picker.Item
      key={item.value}
      label={item.label}
      value={item.value}
    />
  ))}
</Picker>

<Text style={styles.label}>
  Moneda
</Text>

<Picker
  selectedValue={cfdi.moneda}
  onValueChange={(value) =>
    handleChange(
      'moneda',
      value
    )
  }
>
  {MONEDAS.map(item => (
    <Picker.Item
      key={item.value}
      label={item.label}
      value={item.value}
    />
  ))}
</Picker>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Llenado de información</Text>
        <TouchableOpacity onPress={handleAddConcepto}>
          <Text style={styles.addConceptText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {cfdi.conceptos.map((concepto, index) => (
        <View key={concepto.id || index} style={styles.conceptCard}>

          <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Clave producto servicio"
            value={concepto.claveProductoServicio}
            onChangeText={(value) =>
              handleConceptChange(
                index,
                'claveProductoServicio',
                value
              )
            }
          />
          </View>

          <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={concepto.descripcion}
            onChangeText={(value) => handleConceptChange(index, 'descripcion', value)}
          />
          </View>

          <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={String(concepto.cantidad)}
            onChangeText={(value) => handleConceptChange(index, 'cantidad', value)}
          />
          </View>

          <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Clave Unidad"
            value={concepto.claveUnidad}
            onChangeText={(value) =>
              handleConceptChange(
                index,
                'claveUnidad',
                value
              )
            }
          />
          </View>

          <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Unidad"
            value={concepto.unidad}
            onChangeText={(value) => handleConceptChange(index, 'unidad', value)}
          />
          </View>

          <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Valor Unitario"
            keyboardType="numeric"
            value={String(concepto.valorUnitario)}
            onChangeText={(value) => handleConceptChange(index, 'valorUnitario', value)}
          />
          </View>

          <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Descuento"
            keyboardType="numeric"
            value={String(
              concepto.descuento || ''
            )}
            onChangeText={(value) =>
              handleConceptChange(
                index,
                'descuento',
                value
              )
            }
          />
          </View>

          <View style={styles.fieldContainer}>
            <Picker
              selectedValue={concepto.objetoImpuesto}
              onValueChange={(value) =>
                handleConceptChange(
                  index,
                  'objetoImpuesto',
                  value
                )
              }
            >
              {OBJETOS_IMPUESTO.map(item => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          {concepto.objetoImpuesto !== '01' && (
            <View style={styles.fieldContainer}>

            <TouchableOpacity
              onPress={() => {

                if (!concepto.aplicaIVA) {

                  const subtotalCalculado =
                    (
                      Number(concepto.cantidad || 0) *
                      Number(concepto.valorUnitario || 0)
                    ) -
                    Number(concepto.descuento || 0);

                  handleConceptChange(
                    index,
                    'baseIVA',
                    subtotalCalculado.toFixed(2)
                  );
                }

                handleConceptChange(
                  index,
                  'aplicaIVA',
                  !concepto.aplicaIVA
                );
              }}
            >
                <Text>
                  {concepto.aplicaIVA ? '☑' : '☐'} IVA
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {

                  if (!concepto.aplicaRetIVA) {

                    const importe =
                      (
                        Number(concepto.cantidad || 0) *
                        Number(concepto.valorUnitario || 0)
                      ) -
                      Number(concepto.descuento || 0);

                    handleConceptChange(
                      index,
                      'baseRetIVA',
                      importe.toFixed(2)
                    );
                  }

                  handleConceptChange(
                    index,
                    'aplicaRetIVA',
                    !concepto.aplicaRetIVA
                  );
                }}
              >
                <Text>
                  {concepto.aplicaRetIVA ? '☑' : '☐'} Retención IVA
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {

                  if (!concepto.aplicaRetISR) {

                    const subtotalCalculado =
                      (
                        Number(concepto.cantidad || 0) *
                        Number(concepto.valorUnitario || 0)
                      ) -
                      Number(concepto.descuento || 0);

                    handleConceptChange(
                      index,
                      'baseRetISR',
                      subtotalCalculado.toFixed(2)
                    );
                  }

                  handleConceptChange(
                    index,
                    'aplicaRetISR',
                    !concepto.aplicaRetISR
                  );
                }}
              >
                <Text>
                  {concepto.aplicaRetISR ? '☑' : '☐'} Retención ISR
                </Text>
              </TouchableOpacity>



              <TouchableOpacity
                onPress={() =>
                  handleConceptChange(
                    index,
                    'aplicaIEPS',
                    !concepto.aplicaIEPS
                  )
                }
              >
                <Text>
                  {concepto.aplicaIEPS ? '☑' : '☐'} IEPS
                </Text>
              </TouchableOpacity>

            </View>
          )}

          {concepto.aplicaIVA && (
            <>
            <Text style={{        
            fontSize: 16,        
            fontWeight: 'bold',        
            color: '#13710e',        
            marginBottom: 10,      
            }}    
            >      
              IVA    
            </Text>
              
              <View style={styles.fieldContainer}>
                        
                    <TextInput
            style={styles.input}
            placeholder="Base IVA"
            keyboardType="numeric"
            value={concepto.baseIVA}
            onChangeText={(value) =>
              handleConceptChange(
                index,
                'baseIVA',
                value
              )
            }
          />
    </View>

    <View style={styles.fieldContainer}>
      <Picker
        selectedValue={concepto.tasaIVA}
        onValueChange={(value) =>
          handleConceptChange(
            index,
            'tasaIVA',
            value
          )
        }
      >
        {TASAS_IVA.map(item => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  </>
)}

{concepto.aplicaRetIVA && (
    <>
    <Text style={{        
    fontSize: 16,        
    fontWeight: 'bold',        
    color: '#13710e',        
    marginBottom: 10,      
    }}    
    >      
    Retención IVA                  
    </Text>

    <View style={styles.fieldContainer}>
      <TextInput
        style={styles.input}
        placeholder="Base Retención IVA"
        keyboardType="numeric"
        value={concepto.baseRetIVA}
        onChangeText={(value) =>
          handleConceptChange(
            index,
            'baseRetIVA',
            value
          )
        }
      />
    </View>

        <View style={styles.fieldContainer}>
          <Picker
            selectedValue={concepto.tasaRetIVA}
            onValueChange={(value) =>
              handleConceptChange(
                index,
                'tasaRetIVA',
                value
              )
            }
          >
            {TASAS_RET_IVA.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      </>
    )}

{concepto.aplicaRetISR && (
    <>
    <Text style={{        
    fontSize: 16,        
    fontWeight: 'bold',        
    color: '#13710e',        
    marginBottom: 10,      
    }}    
    >      
    Retención ISR                  
    </Text>


    <View style={styles.fieldContainer}>
      <TextInput
        style={styles.input}
        placeholder="Base Retención ISR"
        keyboardType="numeric"
        value={concepto.baseRetISR}
        onChangeText={(value) =>
          handleConceptChange(
            index,
            'baseRetISR',
            value
          )
        }
      />
    </View>

    <View style={styles.fieldContainer}>
      <Picker
        selectedValue={concepto.tasaRetISR}
        onValueChange={(value) =>
          handleConceptChange(
            index,
            'tasaRetISR',
            value
          )
        }
      >
        {TASAS_ISR_RETENCION.map(item => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  </>
)}



</View>
))}


<View style={styles.totalsRow}>
  <Text style={styles.totalLabel}>Subtotal:</Text>
  <Text style={styles.totalValue}>
    {Number(totals.subtotal).toLocaleString('en-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </Text>
</View>

<View style={styles.totalsRow}>
  <Text style={styles.totalLabel}>IVA:</Text>
  <Text style={styles.totalValue}>
    {Number(totals.iva).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </Text>
</View>

<View style={styles.totalsRow}>
  <Text style={styles.totalLabel}>Retención IVA:</Text>
  <Text style={styles.totalValue}>
    {Number(totals.retIVA).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </Text>
</View>

<View style={styles.totalsRow}>
  <Text style={styles.totalLabel}>Retención ISR:</Text>
  <Text style={styles.totalValue}>
    {Number(totals.retISR).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </Text>
</View>

<View style={styles.totalsRow}>
  <Text style={styles.totalLabel}>Total:</Text>
  <Text style={styles.totalValue}>
    {Number(totals.total).toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </Text>
</View>

        <TouchableOpacity
          style={styles.primaryButton} onPress={() => { setNombreBorrador(
      `${cfdi.emisor?.nombre || ''} - ${cfdi.receptor?.nombre || ''}`);
      setShowSaveModal(true);}}
      >
        <Text style={styles.primaryButtonText}>Guardar borrador</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.secondaryButton}
  onPress={handleGeneratePDF}
>
  <Text style={styles.secondaryButtonText}>
    Generar PDF
  </Text>
</TouchableOpacity>

</ScrollView>

{showSaveModal && (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      padding: 20,
    }}
  >
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 15,
        }}
      >
        Guardar borrador
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del borrador"
        value={nombreBorrador}
        onChangeText={setNombreBorrador}
      />

      <Text>
        Emisor: {cfdi.emisor?.nombre || 'Sin seleccionar'}
      </Text>

      <Text style={{ marginTop: 10 }}>
        Receptor: {cfdi.receptor?.nombre || 'Sin seleccionar'}
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={async () => {
          setShowSaveModal(false);
          await handleSaveDraft();
        }}
      >
        <Text style={styles.primaryButtonText}>
          Guardar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setShowSaveModal(false)}
      >
        <Text style={styles.secondaryButtonText}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  </View>
)}

</SafeAreaView>
);
}

const TIPOS_COMPROBANTE = [
  {
    value: 'I',
    label: 'Ingreso',
  },
  {
    value: 'E',
    label: 'Egreso',
  },
  {
    value: 'NC',
    label: 'Nota de crédito',
  },
];

const USOS_CFDI = [
  {
    value: 'G01',
    label: 'G01 - Adquisición de mercancías',
  },
  {
    value: 'G02',
    label: 'G02 - Devoluciones, descuentos o bonificaciones',
  },
  {
    value: 'G03',
    label: 'G03 - Gastos en general',
  },

  {
    value: 'I01',
    label: 'I01 - Construcciones',
  },
  {
    value: 'I02',
    label: 'I02 - Mobiliario y equipo de oficina',
  },
  {
    value: 'I03',
    label: 'I03 - Equipo de transporte',
  },
  {
    value: 'I04',
    label: 'I04 - Equipo de cómputo y accesorios',
  },
  {
    value: 'I05',
    label: 'I05 - Dados, troqueles, moldes, matrices y herramental',
  },
  {
    value: 'I06',
    label: 'I06 - Comunicaciones telefónicas',
  },
  {
    value: 'I07',
    label: 'I07 - Comunicaciones satelitales',
  },
  {
    value: 'I08',
    label: 'I08 - Otra maquinaria y equipo',
  },

  {
    value: 'D01',
    label: 'D01 - Honorarios médicos, dentales y hospitalarios',
  },
  {
    value: 'D02',
    label: 'D02 - Gastos médicos por incapacidad o discapacidad',
  },
  {
    value: 'D03',
    label: 'D03 - Gastos funerales',
  },
  {
    value: 'D04',
    label: 'D04 - Donativos',
  },
  {
    value: 'D05',
    label: 'D05 - Intereses reales pagados por créditos hipotecarios',
  },
  {
    value: 'D06',
    label: 'D06 - Aportaciones voluntarias al SAR',
  },
  {
    value: 'D07',
    label: 'D07 - Primas por seguros de gastos médicos',
  },
  {
    value: 'D08',
    label: 'D08 - Gastos de transportación escolar obligatoria',
  },
  {
    value: 'D09',
    label: 'D09 - Depósitos en cuentas para el ahorro',
  },
  {
    value: 'D10',
    label: 'D10 - Pagos por servicios educativos (colegiaturas)',
  },

  {
    value: 'S01',
    label: 'S01 - Sin efectos fiscales',
  },

  {
    value: 'CP01',
    label: 'CP01 - Pagos',
  },

  {
    value: 'CN01',
    label: 'CN01 - Nómina',
  },
];

const MONEDAS = [
  {
    value: 'MXN',
    label: 'MXN - Peso Mexicano',
  },
  {
    value: 'USD',
    label: 'USD - Dólar estadounidense',
  },
  {
    value: 'EUR',
    label: 'EUR - Euro',
  },
];

const FORMAS_PAGO = [
  {
    value: '01',
    label: '01 - Efectivo',
  },
  {
    value: '02',
    label: '02 - Cheque nominativo',
  },
  {
    value: '03',
    label: '03 - Transferencia electrónica de fondos',
  },
  {
    value: '04',
    label: '04 - Tarjeta de crédito',
  },
  {
    value: '05',
    label: '05 - Monedero electrónico',
  },
  {
    value: '06',
    label: '06 - Dinero electrónico',
  },
  {
    value: '08',
    label: '08 - Vales de despensa',
  },
  {
    value: '12',
    label: '12 - Dación en pago',
  },
  {
    value: '13',
    label: '13 - Pago por subrogación',
  },
  {
    value: '14',
    label: '14 - Pago por consignación',
  },
  {
    value: '15',
    label: '15 - Condonación',
  },
  {
    value: '17',
    label: '17 - Compensación',
  },
  {
    value: '23',
    label: '23 - Novación',
  },
  {
    value: '24',
    label: '24 - Confusión',
  },
  {
    value: '25',
    label: '25 - Remisión de deuda',
  },
  {
    value: '26',
    label: '26 - Prescripción o caducidad',
  },
  {
    value: '27',
    label: '27 - A satisfacción del acreedor',
  },
  {
    value: '28',
    label: '28 - Tarjeta de débito',
  },
  {
    value: '29',
    label: '29 - Tarjeta de servicios',
  },
  {
    value: '30',
    label: '30 - Aplicación de anticipos',
  },
  {
    value: '99',
    label: '99 - Por definir',
  },
];

const METODOS_PAGO = [
  {
    value: 'PUE',
    label: 'PUE - Pago en una sola exhibición',
  },
  {
    value: 'PPD',
    label: 'PPD - Pago en parcialidades o diferido',
  },
];

const OBJETOS_IMPUESTO = [
  {
    value: '01',
    label: '01 - No objeto de impuesto',
  },
  {
    value: '02',
    label: '02 - Sí objeto de impuesto',
  },
  {
    value: '03',
    label: '03 - Sí objeto del impuesto y no obligado al desglose',
  },
  {
    value: '04',
    label: '04 - Sí objeto del impuesto y no causa impuesto',
  },
  {
    value: '05',
    label: '05 - Sí objeto del impuesto, IVA crédito PODEBI',
  },
  {
    value: '06',
    label: '06 - Sí objeto del IVA, no traslado IVA',
  },
  {
    value: '07',
    label: '07 - No traslado del IVA, sí desglose IEPS',
  },
  {
    value: '08',
    label: '08 - No traslado del IVA, no desglose IEPS',
  },
];

const TASAS_IVA = [
    {
    value: '0',
    label: '0% - Tasa cero',
  },
  {
    value: '8',
    label: '8% - Región Fronteriza',
  },
  {
    value: '16',
    label: '16% - General',
  },
  {
    value: '0',
    label: '0% - Exento',
  },
  {
    value: 'OTRA',
    label: 'Otra tasa',
  },
];

const TASAS_ISR_RETENCION = [
  {
    value: '1',
    label: '1.00%',
  },
  {
    value: '1.10',
    label: '1.10%',
  },
  {
    value: '1.50',
    label: '1.50%',
  },
  {
    value: '2',
    label: '2.00%',
  },
  {
    value: '2.10',
    label: '2.10%',
  },
  {
    value: '2.50',
    label: '2.50%',
  },
  {
    value: '4',
    label: '4.00%',
  },
  {
    value: '10',
    label: '10.00%',
  },
  {
    value: 'OTRA',
    label: 'Otra tasa',
  },
];

const TASAS_RET_IVA = [
  {
    value: '10.6667',
    label: '10.6667% (2/3 del IVA al 16%)',
  },
  {
    value: '16',
    label: '100% (16%)',
  },
  {
    value: '4',
    label: '4% sobre contraprestación',
  },
  {
    value: '5.3333',
    label: '5.3333% (2/3 del IVA al 8%)',
  },
  {
    value: '50IVA',
    label: '50% IVA con RFC / 100% sin RFC',
  },
  {
    value: 'OTRA',
    label: 'Otra tasa',
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  selectorRow: {
    marginBottom: 12,
  },
  selectorButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#bac85f',
  },
  selectorText: {
    color: '#333',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  multiline: {
    minHeight: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addConceptText: {
    color: '#13710e',
    fontWeight: 'bold',
  },

  conceptCard: {
  marginBottom: 20,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#13710e',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#1d4267',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#bac85f',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
fieldContainer: {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  marginBottom: 12,
  paddingHorizontal: 8,
},
input: {
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
},
  
});


