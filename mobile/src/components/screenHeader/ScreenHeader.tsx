import React, {FC} from 'react';
import {View} from 'react-native';
import {ScreenHeaderWrapper, Title} from './Styles';
import {BackButton} from '../backButton';
import {Spacer} from '../spacer';
import {useNavigation} from '@react-navigation/native';
import {Box} from '../box';

interface Props {
    icon?: Element;
    title?: string;
    positioned?: boolean;
    backPressed?: () => void;
    rightContent?: any;
}

export const ScreenHeader: FC<Props> = ({
    icon,
    title,
    positioned,
    backPressed,
    rightContent,
}) => {
    const navigation = useNavigation();

    const backButtonPressHandler = () => {
        if (backPressed) {
            backPressed();
        }

        navigation.goBack();
    };

    const getContent = () => {
        return (
            <>
                <Box alignItems="center" justifyContent="space-between">
                    <BackButton onPress={backButtonPressHandler} />

                    {rightContent && rightContent}
                </Box>

                <Spacer hVariant="h2" />

                <Box dir="row">
                    {icon && (
                        <>
                            {icon}
                            <Spacer wVariant="h4" />
                        </>
                    )}

                    {title && <Title>{title}</Title>}
                </Box>
            </>
        );
    };

    if (positioned) {
        return <ScreenHeaderWrapper>{getContent()}</ScreenHeaderWrapper>;
    }

    return <View>{getContent()}</View>;
};
