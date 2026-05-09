import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


export default function FacturacionButton() {
  const [visible, setVisible] = useState(false);
    return (
      <View style={styles.facturacionContainer}>

          {/* IMAGEN BOTÓN */}
          <TouchableOpacity
            style={styles.facturaButton}
            onPress={() => setVisible(!visible)}
          >

          <Image source={require('../assets/Facturacion.png')} 
          style={styles.icon}
          />
          <Text style={styles.headerTitle}>CFDI</Text>
        
        </TouchableOpacity>
        
        {/* MENÚ DESPLEGABLE */}
        
        {visible && (
          <View style={styles.dropdown}>

           <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setVisible(false);
                console.log('Factura');
              }}
            >

              <Text style={styles.optionText}>Factura</Text>

                                  

            </TouchableOpacity>  
            
   


            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setVisible(false);
                console.log('Complemento');
              }}
            >

              <Text style={styles.optionText}>Complemento</Text>
            </TouchableOpacity>
      
          </View>  
          )}
      </View>
   );
}


const styles = StyleSheet.create({

  facturacionContainer: {
    alignItems: 'flex-start',
    marginTop: 30,
    marginLeft: 20,
  },
  facturaButton: {
    alignItems: 'center',
  },
  icon: {
    width:60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  headerTitle: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  option: {
    padding: 12,
  },
  optionText: {
    textAlign: 'flex-start',
  },
});
