import React, {FC} from 'react';
import {Find} from './tabs/find';
import {Matches} from './tabs/matches';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRegisterFCMToken} from './hooks/useRegisterFCMToken';
import {useTranslation} from 'react-i18next';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator();

export const Home = () => {
    const {t} = useTranslation();

    useRegisterFCMToken();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabel: () => '',
                tabBarStyle: {
                    display: 'flex',
                    alignItems: 'center',
                    borderTopWidth: 0,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    elevation: 0,
                    marginBottom: 20,
                },
                tabBarItemStyle: {flex: 0, width: 43},
            }}>
            <Tab.Screen
                name={t('home.tabs.find.label')}
                component={Find}
                options={{
                    tabBarIcon: ({focused}) => <HomeIcon focused={focused} />,
                }}
            />

            <Tab.Screen
                name={t('home.tabs.matches.label')}
                options={{
                    tabBarIcon: ({focused}) => (
                        <MatchesIcon focused={focused} />
                    ),
                }}
                component={Matches}
            />
        </Tab.Navigator>
    );
};

interface IconProps {
    focused?: boolean;
}

const FocusedIconCircle = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f99a00;
`;

const UnfocusedIconCircle = styled.View`
    width: 36px;
    height: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffd99d;
`;

const HomeIcon: FC<IconProps> = ({focused}) => {
    if (focused) {
        return (
            <FocusedIconCircle>
                <Svg width="45" height="45" viewBox="0 0 45 45" fill="none">
                    <Path
                        d="M19.8795 11.8948C19.8233 11.9028 19.6428 11.9309 19.4784 11.955C18.7724 12.0552 17.8138 12.3601 17.1519 12.693C14.7974 13.8763 13.213 15.9942 12.7116 18.6295C12.6154 19.1389 12.5953 20.5307 12.6755 21.0963C12.9363 22.9013 13.7345 24.4977 15.014 25.7733C16.9594 27.7066 19.707 28.5249 22.3985 27.9713C23.5256 27.7387 24.6848 27.2213 25.5753 26.5554L25.836 26.3589L28.8042 29.3191C30.6975 31.2043 31.8246 32.2993 31.9209 32.3395C32.1375 32.4397 32.5025 32.4277 32.7191 32.3154C32.9918 32.171 33.1322 31.9424 33.1483 31.6094C33.1603 31.4049 33.1483 31.2926 33.0961 31.1802C33.048 31.076 32.0653 30.0611 30.0637 28.0556L27.1035 25.0874L27.2038 24.967C27.4003 24.7264 27.7653 24.1568 27.9659 23.7637C28.4994 22.7449 28.7802 21.7301 28.8684 20.5267C29.0409 18.2203 28.1825 15.934 26.5219 14.2654C25.2584 12.9979 23.6499 12.1876 21.881 11.9309C21.492 11.8747 20.1763 11.8547 19.8795 11.8948ZM21.7767 13.6958C23.8304 14.0207 25.6675 15.4206 26.542 17.3178C27.6731 19.7726 27.1677 22.5965 25.2544 24.5057C22.7434 27.0207 18.7323 27.0167 16.2254 24.4977C15.2707 23.5351 14.665 22.3518 14.4364 21.0081C14.3602 20.5468 14.3522 19.5039 14.4204 19.0907C14.6731 17.6026 15.2868 16.4073 16.3136 15.4166C17.4247 14.3496 18.7644 13.7479 20.3207 13.6196C20.6175 13.5955 21.3997 13.6356 21.7767 13.6958Z"
                        fill="white"
                    />
                </Svg>
            </FocusedIconCircle>
        );
    }

    return (
        <UnfocusedIconCircle>
            <Svg width="45" height="45" viewBox="0 0 45 45" fill="none">
                <Path
                    d="M19.8795 11.8948C19.8233 11.9028 19.6428 11.9309 19.4784 11.955C18.7724 12.0552 17.8138 12.3601 17.1519 12.693C14.7974 13.8763 13.213 15.9942 12.7116 18.6295C12.6154 19.1389 12.5953 20.5307 12.6755 21.0963C12.9363 22.9013 13.7345 24.4977 15.014 25.7733C16.9594 27.7066 19.707 28.5249 22.3985 27.9713C23.5256 27.7387 24.6848 27.2213 25.5753 26.5554L25.836 26.3589L28.8042 29.3191C30.6975 31.2043 31.8246 32.2993 31.9209 32.3395C32.1375 32.4397 32.5025 32.4277 32.7191 32.3154C32.9918 32.171 33.1322 31.9424 33.1483 31.6094C33.1603 31.4049 33.1483 31.2926 33.0961 31.1802C33.048 31.076 32.0653 30.0611 30.0637 28.0556L27.1035 25.0874L27.2038 24.967C27.4003 24.7264 27.7653 24.1568 27.9659 23.7637C28.4994 22.7449 28.7802 21.7301 28.8684 20.5267C29.0409 18.2203 28.1825 15.934 26.5219 14.2654C25.2584 12.9979 23.6499 12.1876 21.881 11.9309C21.492 11.8747 20.1763 11.8547 19.8795 11.8948ZM21.7767 13.6958C23.8304 14.0207 25.6675 15.4206 26.542 17.3178C27.6731 19.7726 27.1677 22.5965 25.2544 24.5057C22.7434 27.0207 18.7323 27.0167 16.2254 24.4977C15.2707 23.5351 14.665 22.3518 14.4364 21.0081C14.3602 20.5468 14.3522 19.5039 14.4204 19.0907C14.6731 17.6026 15.2868 16.4073 16.3136 15.4166C17.4247 14.3496 18.7644 13.7479 20.3207 13.6196C20.6175 13.5955 21.3997 13.6356 21.7767 13.6958Z"
                    fill="white"
                />
            </Svg>
        </UnfocusedIconCircle>
    );
};

const MatchesIcon: FC<IconProps> = ({focused}) => {
    if (focused) {
        return (
            <FocusedIconCircle>
                <Svg width="20" height="20" viewBox="0 0 21 21" fill="none">
                    <Path
                        d="M1.61937 20.8445C1.09339 20.8445 0.660846 20.4164 0.726414 19.8945C0.936284 18.2241 1.69547 16.6601 2.89856 15.457C4.32741 14.0282 6.26534 13.2254 8.28604 13.2254C10.3067 13.2254 12.2447 14.0282 13.6735 15.457C14.8766 16.6601 15.6358 18.2241 15.8457 19.8945C15.9112 20.4164 15.4787 20.8445 14.9527 20.8445V20.8445C14.4267 20.8445 14.0084 20.4152 13.9212 19.8965C13.7254 18.7326 13.1722 17.6494 12.3267 16.8039C11.255 15.7322 9.80156 15.1302 8.28604 15.1302C6.77052 15.1302 5.31707 15.7322 4.24543 16.8039C3.39991 17.6494 2.84672 18.7326 2.65092 19.8965C2.56366 20.4152 2.14536 20.8445 1.61937 20.8445V20.8445ZM8.28604 12.2731C5.1289 12.2731 2.57175 9.71591 2.57175 6.55877C2.57175 3.40163 5.1289 0.844482 8.28604 0.844482C11.4432 0.844482 14.0003 3.40163 14.0003 6.55877C14.0003 9.71591 11.4432 12.2731 8.28604 12.2731ZM8.28604 10.3683C10.3908 10.3683 12.0956 8.66353 12.0956 6.55877C12.0956 4.45401 10.3908 2.74924 8.28604 2.74924C6.18128 2.74924 4.47652 4.45401 4.47652 6.55877C4.47652 8.66353 6.18128 10.3683 8.28604 10.3683ZM15.7845 14.7637C16.0005 14.2839 16.5685 14.0652 17.0176 14.3394C17.9914 14.934 18.8229 15.742 19.4466 16.7071C20.0704 17.6723 20.4656 18.7624 20.6077 19.8947C20.6732 20.4165 20.2407 20.8445 19.7148 20.8445V20.8445C19.1887 20.8445 18.7704 20.4151 18.6832 19.8963C18.5548 19.1318 18.2715 18.3979 17.8471 17.7412C17.4226 17.0845 16.8699 16.5247 16.2255 16.0935C15.7884 15.801 15.5687 15.2433 15.7845 14.7637V14.7637ZM15.2179 4.20122C15.3791 3.63688 16.0028 3.3337 16.4868 3.66566C17.0328 4.04011 17.5056 4.51659 17.8775 5.07232C18.4547 5.93489 18.7626 6.94947 18.7622 7.98734C18.7626 9.29432 18.2743 10.5542 17.3932 11.5196C16.7545 12.2193 15.9428 12.7277 15.0487 12.9996C14.499 13.1667 14.0003 12.709 14.0003 12.1344V12.1344C14.0003 11.6483 14.3663 11.2502 14.8147 11.0626C15.2051 10.8992 15.5632 10.6619 15.8682 10.3611C16.3758 9.86058 16.7096 9.2105 16.8205 8.50632C16.9314 7.80215 16.8136 7.08096 16.4845 6.44863C16.283 6.06159 16.0089 5.72033 15.6796 5.44201C15.3157 5.13439 15.0871 4.65939 15.2179 4.20122V4.20122Z"
                        fill="white"
                    />
                </Svg>
            </FocusedIconCircle>
        );
    }

    return (
        <UnfocusedIconCircle>
            <Svg width="20" height="20" viewBox="0 0 21 21" fill="none">
                <Path
                    d="M1.61937 20.8445C1.09339 20.8445 0.660846 20.4164 0.726414 19.8945C0.936284 18.2241 1.69547 16.6601 2.89856 15.457C4.32741 14.0282 6.26534 13.2254 8.28604 13.2254C10.3067 13.2254 12.2447 14.0282 13.6735 15.457C14.8766 16.6601 15.6358 18.2241 15.8457 19.8945C15.9112 20.4164 15.4787 20.8445 14.9527 20.8445V20.8445C14.4267 20.8445 14.0084 20.4152 13.9212 19.8965C13.7254 18.7326 13.1722 17.6494 12.3267 16.8039C11.255 15.7322 9.80156 15.1302 8.28604 15.1302C6.77052 15.1302 5.31707 15.7322 4.24543 16.8039C3.39991 17.6494 2.84672 18.7326 2.65092 19.8965C2.56366 20.4152 2.14536 20.8445 1.61937 20.8445V20.8445ZM8.28604 12.2731C5.1289 12.2731 2.57175 9.71591 2.57175 6.55877C2.57175 3.40163 5.1289 0.844482 8.28604 0.844482C11.4432 0.844482 14.0003 3.40163 14.0003 6.55877C14.0003 9.71591 11.4432 12.2731 8.28604 12.2731ZM8.28604 10.3683C10.3908 10.3683 12.0956 8.66353 12.0956 6.55877C12.0956 4.45401 10.3908 2.74924 8.28604 2.74924C6.18128 2.74924 4.47652 4.45401 4.47652 6.55877C4.47652 8.66353 6.18128 10.3683 8.28604 10.3683ZM15.7845 14.7637C16.0005 14.2839 16.5685 14.0652 17.0176 14.3394C17.9914 14.934 18.8229 15.742 19.4466 16.7071C20.0704 17.6723 20.4656 18.7624 20.6077 19.8947C20.6732 20.4165 20.2407 20.8445 19.7148 20.8445V20.8445C19.1887 20.8445 18.7704 20.4151 18.6832 19.8963C18.5548 19.1318 18.2715 18.3979 17.8471 17.7412C17.4226 17.0845 16.8699 16.5247 16.2255 16.0935C15.7884 15.801 15.5687 15.2433 15.7845 14.7637V14.7637ZM15.2179 4.20122C15.3791 3.63688 16.0028 3.3337 16.4868 3.66566C17.0328 4.04011 17.5056 4.51659 17.8775 5.07232C18.4547 5.93489 18.7626 6.94947 18.7622 7.98734C18.7626 9.29432 18.2743 10.5542 17.3932 11.5196C16.7545 12.2193 15.9428 12.7277 15.0487 12.9996C14.499 13.1667 14.0003 12.709 14.0003 12.1344V12.1344C14.0003 11.6483 14.3663 11.2502 14.8147 11.0626C15.2051 10.8992 15.5632 10.6619 15.8682 10.3611C16.3758 9.86058 16.7096 9.2105 16.8205 8.50632C16.9314 7.80215 16.8136 7.08096 16.4845 6.44863C16.283 6.06159 16.0089 5.72033 15.6796 5.44201C15.3157 5.13439 15.0871 4.65939 15.2179 4.20122V4.20122Z"
                    fill="white"
                />
            </Svg>
        </UnfocusedIconCircle>
    );
};