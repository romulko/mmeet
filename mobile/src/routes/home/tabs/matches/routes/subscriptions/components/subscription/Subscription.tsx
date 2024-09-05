import {
    Container,
    Duration,
    MonthLabel,
    Price,
    RoundedContainer,
} from './Styles';
import {FC} from 'react';
import {Spacer} from '../../../../../../../../components/spacer';
import {useTranslation} from 'react-i18next';

interface Props {
    count: number;
    price: number;
}

export const Subscription: FC<Props> = ({count, price}) => {
    const {t} = useTranslation();

    return (
        <Container>
            <RoundedContainer>
                <Duration>{count}</Duration>

                <MonthLabel>
                    {count === 1
                        ? t('subscriptions.month')
                        : t('subscriptions.months')}
                </MonthLabel>
            </RoundedContainer>

            <Spacer hVariant="h4" />

            <Price>
                {price}$/{t('subscriptions.mo')}
            </Price>
        </Container>
    );
};
