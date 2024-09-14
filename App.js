import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome
import { CustomHeaderComponent, CustomButton, CustomFlashRef, useAudioRecord, Analyzer, requestCameraPermission } from './Imports';
import { handleTranscriptionResult } from './Services/HandleTranscribtion';

export default function App() {
  //Custom Hook for recording Audio
  const { isRecording, startRecording, stopRecording } = useAudioRecord();
  //Permissions for camera to access torch
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  //States for transcibing text
  const [transcribedText, setTranscribedText] = useState(''); 
  const [isProcessing, setIsProcessing] = useState(false); 

  useEffect(() => {
    requestCameraPermission(setHasCameraPermission);
  }, []);

  const handlePress = async () => {
    if (isRecording) {
      const url = await stopRecording();
      if (url) {
        setIsProcessing(true); 
        const transcribedText = await Analyzer(url);
        const result = handleTranscriptionResult(transcribedText);
        setTranscribedText(transcribedText); 
        setIsProcessing(false); 

        if (result === true) {
          setTorchOn(true);
          setShowCamera(true);
        } else if (result === false) {
          setTorchOn(false);
          setShowCamera(false);
        }
      } else {
        Alert.alert("Error", "Failed to transcribe audio.");
      }
    } else {
      startRecording();
    }
  };

  if (hasCameraPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasCameraPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <CustomHeaderComponent />
      <View style={styles.content}>
        <Image
          source={require("../TalkInstructions/assets/loading.gif")}
          style={styles.image}
        />
        <Text style={styles.transcribedText}>{transcribedText}</Text>
      </View>
      <CustomButton 
        title={isRecording ? "Stop" : "Speak to turn on FlashLight"} 
        onPress={handlePress} 
        isProcessing={isProcessing} 
      />
      {showCamera && <CustomFlashRef torchOn={torchOn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  transcribedText: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top', 
    color:'black'
  },
});
