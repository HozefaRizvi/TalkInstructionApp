import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const CustomButton = ({ title, onPress, isProcessing }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={isProcessing}>
      {isProcessing ? (
        <Icon name="spinner" size={20} color="#fff" style={styles.icon} />
      ) : (
        <Icon name="microphone" size={20} color="#fff" style={styles.icon} />
      )}
      <Text style={styles.buttonText}>{isProcessing ? "Processing..." : title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', 
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flexDirection: 'row', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  
});

export default CustomButton;
