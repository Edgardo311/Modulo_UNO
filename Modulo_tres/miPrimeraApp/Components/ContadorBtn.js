import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ContadorBtn() {
    return (
        <View style={styles.container}>
            <text style = {[styles.text, {backgoundColor: 'blue'}]}>Componente ContadorBtn</text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // tus estiles aqui
    },
});