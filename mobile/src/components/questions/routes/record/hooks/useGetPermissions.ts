import {useEffect, useState} from 'react';
import {Camera} from 'react-native-vision-camera';

export const useGetPermissions = () => {
    const [permissionGotted, setPermissionGotted] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            const cameraPermission = await Camera.getCameraPermissionStatus();

            if (cameraPermission !== 'authorized') {
                await Camera.requestCameraPermission();

                setPermissionGotted(false);
            }

            const microphonePermission =
                await Camera.getMicrophonePermissionStatus();

            if (microphonePermission !== 'authorized') {
                await Camera.requestMicrophonePermission();

                setPermissionGotted(false);
            }

            setPermissionGotted(true);
        };

        getPermissions();
    }, []);

    return {permissionGotted};
};
