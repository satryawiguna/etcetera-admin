import '../styles/globals.css'
import {persistor, wrapper} from '../redux/store';
import {PersistGate} from 'redux-persist/integration/react';


function MyApp({Component, pageProps}) {
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
    );
}

export default wrapper.withRedux(MyApp)
