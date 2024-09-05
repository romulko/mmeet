import {PageContainer} from '../components/pageContainer/PageContainer';
import {TeamMember} from '../components/team/teamMember/TeamMember';
import {Section} from '../components/section/Section';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

export default function Team() {
    const {t} = useTranslation('team');

    return (
        <PageContainer title={t('title')}>
            <Section>
                <TeamMember
                    imageUrl="romanmalko"
                    name={t('romanmalko.name')}
                    description={t('romanmalko.role')}
                    linkedin="https://www.linkedin.com/in/romanmalko"
                />

                <br />
                <br />

                <TeamMember
                    imageUrl="wanted"
                    name="В пошуках СЕО"
                    description="mmeet в пошуках СЕО кому дотична ідея проєкта."
                />
            </Section>
        </PageContainer>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['team', 'footer'])),
    },
});
