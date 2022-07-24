import '../styles/globals.css'
import {persistor, store} from '../redux/store';
import withRedux from 'next-redux-wrapper';
import {PersistGate} from 'redux-persist/integration/react';


function MyApp({Component, pageProps}) {
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
    );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
