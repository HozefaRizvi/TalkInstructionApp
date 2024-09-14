import { storage } from "../API/FirebaseInit";
import { Audio } from 'expo-av';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { Alert } from 'react-native';

export default function useAudioRecord() {
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedUri, setRecordedUri] = useState(null);

    //Function to check permission granted for microphone and then get recording starts
    const startRecording = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access microphone is required!');
          return;
        }
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    };
  
    //Function to Stop Recording
    const stopRecording = async () => {
      try {
        if (!recording) return;
        setRecording(null);
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedUri(uri);
        const downloadURL = await uploadToFirebase(uri);
        return downloadURL;
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    };
  
    //Upload the Audio File to Firebase Storage at /audio folder and get the global URL for the audio
    const uploadToFirebase = async (uri) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, 'audios/' + new Date().toISOString() + '.m4a');
        const uploadResult = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(uploadResult.ref);
        return downloadURL;
      } catch (error) {
        console.error('Error uploading audio:', error);
      }
    };

    //Custom Audio Reciver Hook then send back the states
    return {
      isRecording,
      startRecording,
      stopRecording
    };
  }