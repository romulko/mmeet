import {PageContainer} from '../components/pageContainer/PageContainer';
import {Loader} from '@googlemaps/js-api-loader';
import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Section} from '../components/section/Section';
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

export default function Statistic({locations}: {locations: any[]}) {
    const {t} = useTranslation('statistic');

    const googlemap = useRef(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            version: 'weekly',
        });

        loader.load().then(() => {
            if (!googlemap.current) {
                return;
            }

            const maps = window.google.maps;

            const map = new maps.Map(googlemap.current, {
                center: {lat: 40, lng: -3},
                zoom: 1,
                disableDefaultUI: true,
            });

            const markers = locations.map(location => {
                return new maps.Marker({
                    position: location,
                    map,
                    label: `${location.count}`,
                });
            });

            // new MarkerClusterer({markers, map});
        });
    });

    const count = locations
        .map(value => value.count)
        .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0,
        );

    return (
        <PageContainer title={t('title')}>
            <Section>{t('description').replace('{count}', count)}</Section>

            <Section>
                <MapStyled id="map" ref={googlemap} />
            </Section>
        </PageContainer>
    );
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const res = await fetch(`https://api.mmeet.app/statistic/locations`);
    const locations = await res.json();

    return {
        props: {
            locations,
            ...(await serverSideTranslations(locale!, ['statistic', 'footer'])),
        },
    };
};

const MapStyled = styled.div`
    height: 340px;
`;
