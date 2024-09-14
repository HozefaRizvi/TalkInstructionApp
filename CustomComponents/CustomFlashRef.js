import React from 'react';
import { Camera } from 'expo-camera/legacy';
import { StyleSheet, View } from 'react-native';

const CustomFlashRef = ({ torchOn }) => {
  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        flashMode={torchOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: 1,
    height: 1,
  },
});

export default CustomFlashRef;
