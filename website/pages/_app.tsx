import type {AppProps} from 'next/app';
import {createGlobalStyle} from 'styled-components';
import Head from 'next/head';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {appWithTranslation} from 'next-i18next';
import {GoogleAnalytics} from 'nextjs-google-analytics';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  #__next {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
  }
`;

export function MyApp({
    Component,
    pageProps: {session, ...pageProps},
}: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1"
                />
            </Head>

            <GlobalStyle />
            <GoogleAnalytics trackPageViews />
            <Component {...pageProps} />

            <ToastContainer
                hideProgressBar
                position="top-center"
                closeButton={false}
                autoClose={2000}
            />
        </>
    );
}

export default appWithTranslation(MyApp);
