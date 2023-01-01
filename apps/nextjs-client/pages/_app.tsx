import { AppProps } from 'next/app';
import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-table/react-table.css';

import Alert from '../infrastructure/presentation/components/Alert/Alert';
import Header from '../infrastructure/presentation/components/Header/Header';
import ReduxStoreProvider from '../infrastructure/presentation/components/ReduxStoreProvider';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <ReduxStoreProvider>
      <div className="app-container bg-light">
        <Header />
        <div className="container pt-4 pb-4">
          <Component {...pageProps} />

          <Alert />
        </div>
      </div>
    </ReduxStoreProvider>
    // <>
    //   <Head>
    //     <title>Welcome to client!</title>
    //   </Head>
    //   <main className="app">
    //     <Component {...pageProps} />
    //   </main>
    // </>
  );
}

export default CustomApp;
