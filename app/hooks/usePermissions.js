import { useState, useEffect } from 'react';
import * as Camera from 'expo-camera';
import * as Location from 'expo-location';

export const usePermissions = () => {
  const [cameraStatus, setCameraStatus] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPerm = await Camera.getCameraPermissionsAsync();
      setCameraStatus(cameraPerm.status);

      const locationPerm = await Location.getForegroundPermissionsAsync();
      setLocationStatus(locationPerm.status);
    })();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraStatus(status);
    return status === 'granted';
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationStatus(status);
    return status === 'granted';
  };

  return {
    cameraStatus,
    locationStatus,
    requestCameraPermission,
    requestLocationPermission,
    hasCameraPermission: cameraStatus === 'granted',
    hasLocationPermission: locationStatus === 'granted',
  };
};
