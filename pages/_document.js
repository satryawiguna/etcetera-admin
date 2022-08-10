import Document, {Html, Head, Main, NextScript} from "next/document";
import Script from 'next/script'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            page: ctx.asPath,
        };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"/>
                    <link rel="stylesheet" href="/static/plugins/fontawesome-free/css/all.min.css"/>
                    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
                    <link rel="stylesheet" href="/static/dist/css/adminlte.min.css"/>
                </Head>
                <body
                    className={this.props.page == '/login' || this.props.page == '/forgot-password' ? "hold-transition login-page" : "hold-transition sidebar-mini"}>
                <Main/>
                <NextScript/>
                <Script strategy="afterInteractive" src="/static/plugins/jquery/jquery.min.js"/>
                <Script strategy="afterInteractive" src="/static/plugins/bootstrap/js/bootstrap.bundle.min.js"/>
                <Script strategy="afterInteractive" src="/static/dist/js/adminlte.js"/>
                </body>
            </Html>
        )
    }
}