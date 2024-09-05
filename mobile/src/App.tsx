import React from 'react';
import {Apollo} from './service/apollo/client';
import {Login} from './routes/login';
import {Home} from './routes/home';
import {
    HOME,
    HOME_PROFILE,
    HOME_PROFILE_MY_VIDEOS,
    HOME_PROFILE_EDIT_VIDEO_REVIEW,
    HOME_PROFILE_EDIT_VIDEO_RECORD,
    HOME_PROFILE_EDIT_VIDEO_WATCH_ANSWER,
    HOME_PROFILE_FIND_OPTIONS,
    LOGIN,
    HOME_MATCHES_DETAILS,
    HOME_MATCHES_PROPOSE_MEETING,
    REGISTRATION,
    HOME_PROFILE_INVITE_FRIEND,
    HOME_PROFILE_INVITE_FRIEND_QUESTIONS,
    HOME_MATCHES_SUBSCRIPTIONS,
    HOME_MATCHES_SUBSCRIPTIONS_INFO,
    HOME_PROFILE_CONTACT_US,
    HOME_MATCHES_DETAILS_COMPLAINT,
    HOME_PROFILE_MY_VIDEOS_INFO,
    HOME_PROFILE_INVITE_FRIEND_STATISTIC,
    HOME_PROFILE_INVITE_FRIEND_STATISTIC_INFO,
    HOME_PROFILE_INVITE_FRIEND_INFO,
    HOME_WATCH_MMEET_VIDEO,
} from './routes/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Profile} from './routes/home/tabs/find/routes/profile';
import {FindOptions} from './routes/home/tabs/find/routes/findOptions';
import {VideoStudio} from './routes/home/tabs/find/routes/profile/routes/videoStudio';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WatchAnswer} from './components/questions/routes/watchAnswer';
import {Record} from './components/questions/routes/record';
import {Review} from './components/questions/routes/review';
import {RecoilRoot} from 'recoil';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Info as VideoStudioInfo} from './routes/home/tabs/find/routes/profile/routes/videoStudio/routes/info';
import FlashMessage from 'react-native-flash-message';
import {Details as MatchDetails} from './routes/home/tabs/matches/routes/details';
import {ProposeMeeting} from './routes/home/tabs/matches/routes/details/routes/proposeMeeting';
import {Registration} from './routes/registration';
import {InviteFriend} from './routes/home/tabs/find/routes/profile/routes/inviteFriend';
import {Info as InviteFriendInfo} from './routes/home/tabs/find/routes/profile/routes/inviteFriend/routes/info';
import {Questions} from './routes/home/tabs/find/routes/profile/routes/inviteFriend/routes/questions';
import 'intl-pluralrules';
import './service/i18n';
import {setupFCM} from './service/fcm';
import {Subscriptions} from './routes/home/tabs/matches/routes/subscriptions';
import {Info} from './routes/home/tabs/matches/routes/subscriptions/routes/info';
import {ContactUs} from './routes/home/tabs/find/routes/profile/routes/contactUs';
import {Complaint} from './routes/home/tabs/matches/routes/details/components/openMore/routes/complaint';
import {setupIap} from './service/iap';
import {Statistic as InviteFriendStatistic} from './routes/home/tabs/find/routes/profile/routes/inviteFriend/routes/statistic';
import {Info as InviteFriendStatisticInfo} from './routes/home/tabs/find/routes/profile/routes/inviteFriend/routes/statistic/routes/info';
import {WatchMmeetVideo} from './routes/home/routes/watchMmeetVideo';

// import {REMOVE_TOKEN} from './service/auth/Auth';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

Icon.loadFont().catch(reason => console.log('loadFont error ' + reason));

// REMOVE_TOKEN();

setupIap();
setupFCM();

// firebase.initializeApp({
//     apiKey: "........",
//     authDomain: "note-app-rn.firebaseapp.com",
//     projectId: "note-app-rn",
//     storageBucket: "note-app-rn.appspot.com",
//     messagingSenderId: ".....",
//     appId: "......"
// });

const Stack = createNativeStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};

export const App = () => {
    return (
        <SafeAreaProvider>
            <RecoilRoot>
                <Apollo>
                    <NavigationContainer theme={theme}>
                        <Stack.Navigator
                            initialRouteName={LOGIN}
                            screenOptions={{headerShown: false}}>
                            <Stack.Screen name={LOGIN} component={Login} />

                            <Stack.Screen
                                name={REGISTRATION}
                                component={Registration}
                            />

                            <Stack.Screen name={HOME} component={Home} />

                            <Stack.Screen
                                name={HOME_WATCH_MMEET_VIDEO}
                                component={WatchMmeetVideo}
                            />

                            <Stack.Screen
                                name={HOME_PROFILE_FIND_OPTIONS}
                                component={FindOptions}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE}
                                component={Profile}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_INVITE_FRIEND}
                                component={InviteFriend}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_INVITE_FRIEND_INFO}
                                component={InviteFriendInfo}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_INVITE_FRIEND_QUESTIONS}
                                component={Questions}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_INVITE_FRIEND_STATISTIC}
                                component={InviteFriendStatistic}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_INVITE_FRIEND_STATISTIC_INFO}
                                component={InviteFriendStatisticInfo}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_MY_VIDEOS}
                                component={VideoStudio}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_EDIT_VIDEO_RECORD}
                                component={Record}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_EDIT_VIDEO_REVIEW}
                                component={Review}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_EDIT_VIDEO_WATCH_ANSWER}
                                component={WatchAnswer}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_MY_VIDEOS_INFO}
                                component={VideoStudioInfo}
                            />
                            <Stack.Screen
                                name={HOME_PROFILE_CONTACT_US}
                                component={ContactUs}
                            />

                            <Stack.Screen
                                name={HOME_MATCHES_SUBSCRIPTIONS}
                                component={Subscriptions}
                            />
                            <Stack.Screen
                                name={HOME_MATCHES_SUBSCRIPTIONS_INFO}
                                component={Info}
                            />

                            <Stack.Screen
                                name={HOME_MATCHES_DETAILS}
                                component={MatchDetails}
                            />
                            <Stack.Screen
                                name={HOME_MATCHES_DETAILS_COMPLAINT}
                                component={Complaint}
                            />
                            <Stack.Screen
                                name={HOME_MATCHES_PROPOSE_MEETING}
                                component={ProposeMeeting}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Apollo>
            </RecoilRoot>

            <FlashMessage position="top" />
        </SafeAreaProvider>
    );
};
