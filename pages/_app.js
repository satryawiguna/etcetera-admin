import '../styles/globals.css'
import {wrapper, persistor} from '../redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useEffect} from "react";


function MyApp({Component, pageProps}) {
    useEffect(() => {
        document.body.className = pageProps.isHome ? "hold-transition sidebar-mini" : "hold-transition login-page";
    });

    return (
        <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
    );
}

export default wrapper.withRedux(MyApp);
