import {PageContainer} from '../components/pageContainer/PageContainer';
import {Section} from '../components/section/Section';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps} from 'next';

export default function About() {
    const {t} = useTranslation('about');

    return (
        <PageContainer title={t('title')}>
            <Section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('section1', {
                            interpolation: {escapeValue: false},
                        }),
                    }}
                />
            </Section>

            <Section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('section2', {
                            interpolation: {escapeValue: false},
                        }),
                    }}
                />
            </Section>

            <Section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('section3', {
                            interpolation: {escapeValue: false},
                        }),
                    }}
                />
            </Section>

            <Section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('section4', {
                            interpolation: {escapeValue: false},
                        }),
                    }}
                />
            </Section>
        </PageContainer>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['about', 'footer'])),
    },
});
