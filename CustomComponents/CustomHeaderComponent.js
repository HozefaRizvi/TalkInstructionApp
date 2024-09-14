import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomHeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/favicon.png')} // Update this path to your logo image
        style={styles.logo}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome To TalkInstruction App</Text>
        <Text style={styles.headline}>Speech to Text</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 100, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#DCF2EE', 
    justifyContent: 'space-between',
    borderRadius: 20,
    marginTop: 50,
    width: 400,
    marginLeft: 10
  },
  logo: {
    width: 50, 
    height: 50, // Adjust height as needed
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  welcomeText: {
    fontSize: 18, // Adjust font size as needed
    fontWeight: 'bold',
    color: '#333',
  },
  headline: {
    fontSize: 14, // Adjust font size as needed
    color: '#666',
  },
});

export default CustomHeaderComponent;
