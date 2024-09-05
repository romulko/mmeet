import {PageContainer} from '../components/pageContainer/PageContainer';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export default function Terms() {
    return <PageContainer title="Intellectual Property"></PageContainer>;
}

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['footer'])),
    },
});
