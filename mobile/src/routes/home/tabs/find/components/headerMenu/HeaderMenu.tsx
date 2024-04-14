import {ActivityIndicator, Pressable} from 'react-native';
import {OptionIcon} from '../optionIcon';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HOME_PROFILE, HOME_PROFILE_FIND_OPTIONS} from '../../../../../routes';
import {
    ActivityIndicatorWrapper,
    AvatarWrapper,
    Container,
    Image,
    Wrapper,
} from './Styles';
import {RESOURCE_URL} from '../../../../../../service/consts/consts';
import {useMe} from '../../../../../../state/useMe';
import {useRecoilValue} from 'recoil';
import {userImageLastChangeDateState} from '../../state/userImageLastChangeDate.state';

export const HeaderMenu = () => {
    const {me} = useMe();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const userImageLastChangeDate = useRecoilValue(
        userImageLastChangeDateState,
    );

    const imagePressHandler = () => {
        navigation.navigate(HOME_PROFILE);
    };

    const findOptionsPressHandler = () => {
        navigation.navigate(HOME_PROFILE_FIND_OPTIONS);
    };

    return (
        <Container>
            <Wrapper>
                <AvatarWrapper
                    testID="profileButton"
                    onPress={imagePressHandler}>
                    <ActivityIndicatorWrapper>
                        <ActivityIndicator size="small" />
                    </ActivityIndicatorWrapper>

                    <Image
                        source={{
                            uri: `${RESOURCE_URL}/${me.id}/photo.jpeg?hash=${userImageLastChangeDate}`,
                        }}
                    />
                </AvatarWrapper>

                <Pressable onPress={findOptionsPressHandler}>
                    <OptionIcon />
                </Pressable>
            </Wrapper>
        </Container>
    );
};
