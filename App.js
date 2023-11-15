import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [classification, setClassification] = useState(null);

  const calculateBMI = () => {
    // Convertir el peso y la altura a números
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue) || heightValue === 0) {
      setResult('Por favor, ingresa valores válidos.');
      setClassification(null);
      return;
    }

    // Calcular el IMC
    const bmi = weightValue / Math.pow(heightValue, 2);

    // Determinar la clasificación
    let newClassification = '';
    if (bmi < 18.5) {
      newClassification = 'Peso bajo';
    } else if (bmi >= 18.5 && bmi <= 24.99) {
      newClassification = 'Peso normal';
    } else if (bmi >= 25.0 && bmi <= 29.99) {
      newClassification = 'Sobrepeso';
    } else if (bmi >= 30.0 && bmi <= 39.99) {
      newClassification = 'Obesidad';
    } else {
      newClassification = 'Obesidad extrema';
    }

    // Mostrar el resultado y la clasificación
    setResult(`Tu IMC es: ${bmi.toFixed(2)}%`);
    setClassification(newClassification);
  };

  const getClassificationColor = () => {
    switch (classification) {
      case 'Peso bajo':
      case 'Peso normal':
        return 'green';
      default:
        return 'red';
    }
  };

  return (
    <View style={styles.container}>
      <Text>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />

      <Button title="Calcular IMC" onPress={calculateBMI} />

      <View style={styles.resultContainer}>
        {result && (
          <Text style={{ ...styles.resultText, color: 'black' }}>
            {result}
          </Text>
        )}
        {classification && (
          <Text style={{ ...styles.classificationText, color: getClassificationColor() }}>
            Clasificación: {classification}
          </Text>
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: 200,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    borderColor: 'black',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  classificationText: {
    fontSize: 16,
    marginTop: 10,
  },
});
