import {useCameraDevices} from 'react-native-vision-camera';
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CameraSide = 'front' | 'back';

export const useCameraDevice = () => {
    const {back: backCameraDevice, front: frontCameraDevice} =
        useCameraDevices('wide-angle-camera');
    const [cameraSide, setCameraSide] = useState<CameraSide>('front');

    useEffect(() => {
        const setCameraSideFunc = async () => {
            const value = (await AsyncStorage.getItem(
                'cameraSide',
            )) as CameraSide;

            if (!value) {
                return;
            }

            setCameraSide(value);
        };

        setCameraSideFunc();
    }, []);

    const toggleCamera = useCallback(() => {
        const newValue = cameraSide === 'front' ? 'back' : 'front';

        AsyncStorage.setItem('cameraSide', newValue);

        setCameraSide(newValue);
    }, [cameraSide]);

    return {
        cameraDevice:
            cameraSide === 'back' ? backCameraDevice : frontCameraDevice!,
        toggleCamera,
    };
};
