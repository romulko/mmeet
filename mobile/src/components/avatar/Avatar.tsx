import React, {FC} from 'react';
import {Image, Container, LoadingLabelWrapper} from './Styles';
import {User, useUserUpdatePhotoMutation} from '../../service/apollo/generated';
import {ReactNativeFile} from 'apollo-upload-client';
import {AvatarPlaceholder} from './components/avatarPlaceholder';
import {RESOURCE_URL} from '../../service/consts/consts';
import {ActivityIndicator} from 'react-native';
import {useRecoilState} from 'recoil';
import {avatarUpdateAtom} from './components/avatarPlaceholder/state/state';
import ImagePicker from 'react-native-image-crop-picker';
import {useMe} from '../../state/useMe';
import {handlerError} from '../../service/errorHandler';

export interface Props {
    variant?: 'small' | 'h2' | 'medium' | 'big' | 'fullScreen';
    allowEdit?: boolean;
    user?: Pick<User, 'id'> | undefined | null;
    usePreloader?: boolean;
}

export const Avatar: FC<Props> = ({
    variant = 'small',
    allowEdit,
    user,
    usePreloader = true,
}) => {
    const {me} = useMe();
    const [userUpdatePhotoMutation] = useUserUpdatePhotoMutation();
    const [avatarUpdate, setAvatarUpdate] = useRecoilState(avatarUpdateAtom);

    const containerPressHandler = async () => {
        if (!allowEdit) {
            return;
        }

        try {
            const result = await ImagePicker.openPicker({
                mediaType: 'photo',
                compressImageQuality: 0.8,
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
                .then(() => setAvatarUpdate(Date.now))
                .catch(handlerError);
        } catch (e) {
            // ignored from ImagePicker
        }
    };

    const getAvatar = () => {
        let userId: number | undefined;

        if (user?.id) {
            userId = user?.id;
        } else if (me.isPhotoAvailable) {
            userId = me.id;
        }

        if (userId) {
            return (
                <Image
                    variant={variant}
                    source={{
                        uri: `${RESOURCE_URL}/${userId}/photo.jpeg?hash=${avatarUpdate}`,
                    }}
                />
            );
        }

        return <AvatarPlaceholder />;
    };

    return (
        <Container disabled={!allowEdit} onPress={containerPressHandler}>
            {usePreloader && (
                <LoadingLabelWrapper>
                    <ActivityIndicator
                        size={variant === 'small' ? 'small' : 'large'}
                    />
                </LoadingLabelWrapper>
            )}

            {getAvatar()}
        </Container>
    );
};
