  import React, { useState, useRef, useEffect } from 'react';
  import { View, Button, Text, TextInput, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Pressable, SafeAreaViewBase, Keyboard } from 'react-native';
  import Constants from 'expo-constants';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
  import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import { WebView } from 'react-native-webview';
  import { BackHandler } from 'react-native';
  import app from '../firebaseConfig';
  import { useNavigation } from '@react-navigation/native';
  import Header from './Header';
  import { useAuto } from '../AutoContext';
  import { Platform } from 'react-native';


  export default function Accionesprincipales() {
    const [openMenu, setOpenMenu] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [search, setSearch] = useState('');   // 👉 Paso 1: estado para buscador
    const [categoriaLegislacion, setCategoriaLegislacion] = useState('leyes');
    const [leySeleccionada, setLeySeleccionada] = useState(null);
    const navigation = useNavigation();
    const { signOut } = useAuto();



    
    
    const [leyes, setLeyes] = useState([]);   // 👈 NUEVO estado para almacenar las leyes

    const cerrarMenus = () => {
      setOpenMenu(null);
      setActiveMenu(null);
      Keyboard.dismiss(); // cierra teclado si está abierto
    };


    // Listado de leyes
useEffect(() => {
  const cargarLeyes = async () => {
    try {
      const tipo = 'leyes';
      let apiUrl = '';

      if (Platform.OS === 'android') {
        apiUrl = `http://192.168.X.X:3000/leyes?tipo=${tipo}`;
      } else {
        apiUrl = `http://192.168.1.50:3000/leyes?tipo=${tipo}`
      }

      const response = await fetch(apiUrl);
      const lista = await response.json();
      setLeyes(lista);
    } catch (error) {
      console.error(error);
    }
  };
  cargarLeyes();
}, [categoriaLegislacion]);



  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* ✅ CONTENIDO */}
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.horizontalContainer}>

          {/* -----------------BOTÓN CFDI----------------- */}
        <View style={styles.ContainerCFDI}>

        <TouchableOpacity
          style={[styles.Button, openMenu === 'cfdi' && styles.ButtonActive]}
          onPress={() => {
          setOpenMenu(openMenu === 'cfdi' ? null : 'cfdi');
      setActiveMenu(null);
    }}
  >
    <View style={styles.icon}>
      <FontAwesome6 name="file-invoice" size={45} color="#fff" />
    </View>

    <Text style={styles.headerTitle}>CFDI</Text>
  </TouchableOpacity>

  {/* ✅ TODO EL MENÚ CFDI */}
  {openMenu === 'cfdi' && (
    <View style={styles.dropdown}>

      {/* ✅ FACTURA */}
      <TouchableOpacity
        style={[styles.option, activeMenu === 'factura' && styles.optionActive]}
        onPress={() =>
          setActiveMenu(activeMenu === 'factura' ? null : 'factura')
        }
      >
        <Text style={styles.optionTextsecundarios}>Factura</Text>
      </TouchableOpacity>

      {activeMenu === 'factura' && (
        <View style={styles.submenu}>
          {facturaOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.option}>
          <Text>{item}</Text>  
          </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ✅ COMPLEMENTO (AHORA BIEN UBICADO) */}
      <TouchableOpacity
        style={[styles.option, activeMenu === 'complemento' && styles.optionActive]}
        onPress={() =>
          setActiveMenu(activeMenu === 'complemento' ? null : 'complemento')
        }
      >
        <Text style={styles.optionTextsecundarios}>Complemento</Text>
      </TouchableOpacity>

      {activeMenu === 'complemento' && (
        <View style={styles.submenu}>
          {complementoOptions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text style={styles.optionTextterciarios}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

    </View>
  )}

</View>


          <View style={styles.ContainerExpediente}>
            <TouchableOpacity
              style={[styles.Button, openMenu === 'Expediente' && styles.ButtonActive]}
              onPress={() => {
                setOpenMenu(openMenu === 'Expediente' ? null : 'Expediente');
                setActiveMenu(null);
              }}
            >
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="folder-account-outline"
                  size={45}
                  color="#fff"
                />
              </View>

                <Text style={styles.headerTitle}>Expediente</Text>
              </TouchableOpacity>

              {/* ✅ DROPDOWN */}
              {openMenu === 'Expediente' && (
                <View style={styles.dropdown}>
                  <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionTextsecundarios}>
                      Constancia de situación fiscal
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionTextsecundarios}>
                      Opinión de cumplimiento
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
    

            <View style={styles.ContainerConsultas}>
          <TouchableOpacity
            style={[styles.Button, openMenu === 'Consultas' && styles.ButtonActive]}
            onPress={() => {
              setOpenMenu(openMenu === 'Consultas' ? null : 'Consultas');
              setActiveMenu(null);
            }}
          >
            <View style={styles.icon}>
              <AntDesign name="read" size={35} color="#fff" />
            </View>

            <Text style={styles.headerTitle}>Consultas</Text>
          </TouchableOpacity>

          {/* ✅ DROPDOWN */}
          {openMenu === 'Consultas' && (
            <View style={styles.dropdown}>
              {categoriasLegislacion.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.option}
                  onPress={() => {
                    setCategoriaLegislacion(item.key);
                    setActiveMenu('legislacion');
                    setOpenMenu(null);
                  }}
                >
                  <Text style={styles.optionTextsecundarios}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionTextsecundarios}>Noticias</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ✅ LEGISLACIÓN */}
        {activeMenu === 'legislacion' && (
          <View style={{ flex: 1, marginTop: 20 }}>

            <TextInput
              placeholder="Buscar ley..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
              style={{
                backgroundColor: '#f0f0f0',
                padding: 10,
                borderRadius: 10,
                margin: 10,
                color: '#000'
              }}
            />

              {leyes
                    .filter(ley => ley.nombre.toLowerCase().includes(search.toLowerCase()))
                    .map((ley, index) => (
                      <TouchableOpacity key={index}>
                        <Text>{ley.nombre}</Text>
                      </TouchableOpacity>
              ))}

          </View>
        )}

        <View style={styles.ContainerSAT}>
          <TouchableOpacity
            style={[styles.Button, openMenu === 'SAT' && styles.ButtonActive]}
            onPress={() => {
              setOpenMenu(openMenu === 'SAT' ? null : 'SAT');
              setActiveMenu(null);
            }}
          >
            <View style={styles.icon}>
              <FontAwesome6 name="building-columns" size={35} color="#fff" />
            </View>

            <Text style={styles.headerTitle}>SAT</Text>
          </TouchableOpacity>

          {/* ✅ DROPDOWN */}
          {openMenu === 'SAT' && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  setActiveMenu('satWeb');
                  setOpenMenu(null);
                }}
              >
                <Text style={styles.optionTextsecundarios}>Menú</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ✅ SAT */}
        {activeMenu === 'satWeb' && (
          <View style={{ height: 500 }}>
            <WebView source={{ uri: 'https://www.sat.gob.mx/' }} />
          </View>
        )}
  </View>

    </ScrollView>

      {/* ✅ BOTÓN SALIR */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          signOut(); // 👈 esto pone user = null
          navigation.replace('Login');
        }}
      >
        <Text style={styles.buttontext}>Salir</Text>
      </TouchableOpacity>
        
    </SafeAreaView>
  )}

  /* ------------Constantes------------------ */    

  const categoriasLegislacion = [
    { key: 'leyes', label: 'Leyes' },
  ];

  function filtrarPorCategoria(nombre, categoria) {
    const texto = nombre.toLowerCase();

    if (categoria === 'leyes') {
      return /ley|constitucion|codigo|federal|general/i.test(texto);
    }

    return true;
  }

  const styles = StyleSheet.create({


  horizontalContainer: {
    flexDirection: 'row',   // 🔥 esto lo hace horizontal
    justifyContent: 'flex-start', // separa los elementos
    alignItems: 'flex-start', // alinea horizontalmente 
    marginTop: -10,
    width: '100%', // ✅ 👈 IMPORTANTE
    
  },

  ContainerCFDI: {
      alignItems: 'center',
      marginLeft: 27,
      marginRight: 27,
      paddingTop: 10,
  },

  ContainerExpediente: {
      alignItems: 'center',
      marginRight: 17,
      paddingTop: 10,
  },

  ContainerConsultas: {
      alignItems: 'center',
      marginRight: 27,
      paddingTop: 10,
  },

  ContainerSAT: {
      alignItems: 'center',
      marginRight: 27,
      paddingTop: 10,
  },

    Button: {
      alignItems: 'center',

  },

  ButtonActive: {
      backgroundColor: '#bac85f',
      borderRadius: 10,
      padding: 2,
  },

  icon: {
    width: 45,
    height: 53,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13710e',

  },

  headerTitle: {
      marginTop: 5,
      fontWeight: 'bold',
      fontSize: 16,
  },

  dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 5,
      padding: 10,
      minWidth: 180,
      maxWidth: 250,
  },

  option: {
      paddingVertical: 7,
      paddingLeft: 0,
      paddingRight: 15,
      marginVertical: 2,
      fontSize: 14,
  },

  optionTextsecundarios: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 17,
  },

  optionActive: {
      backgroundColor: '#bac85f',
  },

  submenu: {
    marginLeft: 10,
  },

  closeButton: {
    backgroundColor: '#d9534f', // rojo
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
    position: 'absolute',   // 👈 clave
    bottom: 20,             // 👈 lo fija al pie
    alignSelf: 'center',    // 👈 lo centra horizontalmente
  },

  buttontext: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },

  });

  const facturaOptions = [
    "Ingresos",
    "Anticipo",
    "Egresos",
  ];

  const complementoOptions = [
    "Carta porte",
    "Comercio exterior",
    "Compraventa de divisas",
    "Consumo de combustible",
    "Donatarias",
    "Fideicomisos",
    "Nóminas",
    "Notarios públicos",
    "Retenciones",
    
  ]; 
