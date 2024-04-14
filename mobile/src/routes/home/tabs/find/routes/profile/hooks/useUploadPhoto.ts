import ImagePicker from 'react-native-image-crop-picker';
import {ReactNativeFile} from 'apollo-upload-client';
import {handlerError} from '../../../../../../../service/errorHandler';
import {useUserUpdatePhotoMutation} from '../../../../../../../service/apollo/generated';
import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {userImageLastChangeDateState} from '../../../state/userImageLastChangeDate.state';

export const useUploadPhoto = () => {
    const [userUpdatePhotoMutation] = useUserUpdatePhotoMutation();
    const setUserImageLastChangeDate = useSetRecoilState(
        userImageLastChangeDateState,
    );

    const uploadPhoto = useCallback(async () => {
        try {
            const result = await ImagePicker.openPicker({
                mediaType: 'photo',
                compressImageQuality: 1,
                cropping: true,
            });

            const file = new ReactNativeFile({
                uri: result.path,
                name: 'photo.jpeg',
                type: 'image/jpeg',
            });

            userUpdatePhotoMutation({
                variables: {photo: file},
            })
                .then(() => setUserImageLastChangeDate(Date.now()))
                .catch(handlerError);
        } catch (e) {
            // ignored from ImagePicker
        }
    }, [userUpdatePhotoMutation, setUserImageLastChangeDate]);

    return {uploadPhoto};
};
