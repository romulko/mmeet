import React from 'react';
import {
    BackButtonWrapper,
    Container,
    Image,
    HeaderActionsContainer,
    ImageWrapper,
    VideoStudioButton,
    VideoStudioLabel,
    RoundedContent,
    Content,
    ImageLoaderWrapper,
} from './Styles';
import {Spacer} from '../../../../../../components/spacer';
import {
    HOME_PROFILE_INVITE_FRIEND,
    HOME_PROFILE_MY_VIDEOS,
    LOGIN,
} from '../../../../../routes';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Pressable, ScrollView} from 'react-native';
import {useMe} from '../../../../../../state/useMe';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FormItem} from '../../../../../../components/formItem';
import {NameEditor} from '../../../../../../components/editors/nameEditor';
import {GenderEditor} from '../../../../../../components/editors/genderEditor';
import {useTranslation} from 'react-i18next';
import {LanguageEditor} from './components/languageEditor';
import {languageToLabel} from '../../../../../../utils/i18n.utils';
import {useZodiacSignToLabel} from '../findOptions/components/editors/zodiacSignsEditor/hooks/useZodiacSignToLabel';
import {RESOURCE_URL} from '../../../../../../service/consts/consts';
import {BackButton} from '../../../../../../components/backButton';
import {CameraIcon} from '../../../matches/components/cameraIcon';
import {toFirstUpperLetter} from '../../../../../../utils/string.utils';
import {Box} from '../../../../../../components/box';
import {OpenMore} from './components/openMore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUploadPhoto} from './hooks/useUploadPhoto';
import {ColoursBackground} from '../../../../../../components/screenContainer/components/coloursBackground';
import {useRecoilValue} from 'recoil';
import {userImageLastChangeDateState} from '../../state/userImageLastChangeDate.state';
import {Label} from '../../../../../../components/label';
import {Button} from '../../../../../../components/button';
import {logOut} from '../../../../../../service/auth/Auth';
import {DateChooser} from '../../../../../../components/dateChooser';
import {useUserUpdateBirthdayMutation} from '../../../../../../service/apollo/generated';
import {birthdayToZodiacSign} from '../../../../../../components/editors/birthdayEditor/utils/birthdayToZodiacSign.utils';
import {ContactInfoEditor} from './components/contactInfoEditor/ContactInfoEditor';
import {getDateFormatted} from '../../../../../../utils/date.utils';

export const Profile = () => {
    const {t} = useTranslation();
    const {me} = useMe();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {uploadPhoto} = useUploadPhoto();
    const userImageLastChangeDate = useRecoilValue(
        userImageLastChangeDateState,
    );
    const [userUpdateBirthdayMutation] = useUserUpdateBirthdayMutation();
    const {zodiacToSymbol} = useZodiacSignToLabel();

    const videoButtonPressHandler = () => {
        navigation.navigate(HOME_PROFILE_MY_VIDEOS);
    };

    const inviteFriendPressHandler = () => {
        navigation.push(HOME_PROFILE_INVITE_FRIEND);
    };

    const logOutPressHandler = async () => {
        await logOut();

        navigation.replace(LOGIN);
    };

    const birthdayDateChange = (birthday: Date) => {
        userUpdateBirthdayMutation({
            variables: {userBirthdayInput: {birthday}},
            optimisticResponse: {
                userUpdateBirthday: {
                    id: me.id,
                    birthday,
                    zodiacSign: birthdayToZodiacSign(birthday),
                    __typename: 'User',
                },
            },
        });
    };

    const {name, birthday, zodiacSign, gender, contactInfo, language} = me;

    return (
        <Container>
            <SafeAreaView>
                <ScrollView>
                    <ColoursBackground />

                    <Spacer hVariant="h2" />

                    <BackButtonWrapper>
                        <BackButton onPress={() => navigation.goBack()} />
                    </BackButtonWrapper>

                    <Spacer hVariant="h1" />

                    <HeaderActionsContainer>
                        <Pressable onPress={uploadPhoto}>
                            <ImageWrapper>
                                <ImageLoaderWrapper>
                                    <ActivityIndicator size="large" />
                                </ImageLoaderWrapper>

                                <Image
                                    source={{
                                        uri: `${RESOURCE_URL}/${me.id}/photo.jpeg?hash=${userImageLastChangeDate}`,
                                    }}
                                />
                            </ImageWrapper>
                        </Pressable>

                        <Spacer wVariant="h1" />

                        <Pressable onPress={videoButtonPressHandler}>
                            <VideoStudioButton>
                                <Spacer hVariant="h2" />

                                <CameraIcon variant="big" />

                                <Spacer hVariant="h3" />

                                <VideoStudioLabel>
                                    {t('videoStudio.title')}
                                </VideoStudioLabel>
                            </VideoStudioButton>
                        </Pressable>
                    </HeaderActionsContainer>

                    <RoundedContent>
                        <Content>
                            <ColoursBackground />

                            <FormItem
                                label={t('profile.name')}
                                value={name}
                                editor={() => <NameEditor />}
                            />

                            <Spacer hVariant="h2" />
                            <Spacer hVariant="h4" />

                            <DateChooser
                                label={t('profile.birthday')}
                                value={`${zodiacToSymbol(
                                    zodiacSign!,
                                )} ${getDateFormatted(birthday)}`}
                                date={new Date(birthday)}
                                onDateChange={birthdayDateChange}
                            />

                            <Spacer hVariant="h2" />
                            <Spacer hVariant="h4" />

                            <FormItem
                                label={t('profile.gender')}
                                value={toFirstUpperLetter(
                                    t(`labels.gender.${gender?.toLowerCase()}`),
                                )}
                                editor={closeModal => (
                                    <GenderEditor closeModal={closeModal} />
                                )}
                            />

                            <Spacer hVariant="h2" />
                            <Spacer hVariant="h4" />

                            <FormItem
                                label={t('profile.contactInfo')}
                                value={contactInfo}
                                editor={closeModal => (
                                    <ContactInfoEditor
                                        closeModal={closeModal}
                                    />
                                )}
                            />

                            <Spacer hVariant="h2" />
                            <Spacer hVariant="h4" />

                            <FormItem
                                label={t('profile.language')}
                                value={languageToLabel(language)}
                                editor={closeModal => (
                                    <LanguageEditor closeModal={closeModal} />
                                )}
                            />

                            <Spacer hVariant="h1" />
                            <Spacer hVariant="h4" />

                            <Pressable onPress={inviteFriendPressHandler}>
                                <Box alignItems="center">
                                    <Label>{t('inviteFriend.title')}</Label>

                                    <Label>{' >'}</Label>
                                </Box>
                            </Pressable>

                            <Spacer hVariant="h1" />
                            <Spacer hVariant="h4" />

                            <Box alignItems="center">
                                <Button
                                    title={t('buttons.logOut')}
                                    onPress={logOutPressHandler}
                                />

                                <Spacer wVariant="h2" />

                                <OpenMore />
                            </Box>

                            <Spacer hVariant="h1" />
                            <Spacer hVariant="h4" />
                        </Content>
                    </RoundedContent>
                </ScrollView>
            </SafeAreaView>
        </Container>
    );
};
