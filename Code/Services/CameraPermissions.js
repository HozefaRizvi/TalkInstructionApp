import { Camera } from 'expo-camera/legacy';

// Function for requesting camera permission
export const requestCameraPermission = async (setHasCameraPermission) => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  setHasCameraPermission(status === 'granted');
};
