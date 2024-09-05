import styled from 'styled-components';
import {FC} from 'react';
import Footer from './components/footer/Footer';
import Head from 'next/head';

interface Props {
    title?: string;
    children?: any;
}

export const PageContainer: FC<Props> = ({title, children}) => {
    return (
        <>
            {title && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}
            <Container>
                {title && <Title>{title}</Title>}

                {children}
            </Container>

            <Footer />
        </>
    );
};

const Container = styled.div`
    padding: 20px 20px 0 20px;
`;

const Title = styled.p`
    font-size: 26px;
    padding-bottom: 20px;
`;
