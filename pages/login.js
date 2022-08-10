import {useState} from "react";
import Link from "next/link";
import Router from "next/router";
import {useDispatch} from 'react-redux';
import {login} from '../redux/features/authSlice';
import Head from "next/head";
import Api from "../utils/api";
import nookies from "nookies";

const Login = () => {
    const dispatch = useDispatch();

    const [loginFields, setLoginFields] = useState({});
    const [progress, setProgress] = useState(false);
    const [alert, setAlert] = useState({
        visible: false,
        type: null,
        title: null,
        message: null
    });

    function setValue(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setLoginFields({
            ...loginFields,
            [name]: value
        });
    }

    async function doLogin(e) {
        setProgress(true);

        try {
            e.preventDefault();

            await Api.post(`/login`, loginFields)
                .then(response => {
                    if (response.status !== 200) {
                        throw Error();
                    }

                    nookies.set(null, '__etcat__', response.data.token.access_token);
                    nookies.set(null, '__etcrt__', response.data.token.refresh_token);

                    var date = new Date();
                    var now = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());

                    dispatch(login({
                        access_token: response.data.token.access_token,
                        refresh_token: response.data.token.refresh_token,
                        expires_in: response.data.token.expires_in,
                        token_type: response.data.token.token_type,
                        user: response.data.user,
                        logged_at: now
                    }));

                    setLoginFields({});
                    e.target.reset();

                    window.location.href = '/';
                    // Router.replace('/');
                })
                .catch(error => {
                    setAlert({
                        visible: true,
                        type: "error",
                        title: "Error",
                        message: error.response.data.message
                    });
                });
        } catch (error) {
            setAlert({
                visible: true,
                type: "error",
                title: "Error",
                message: error.message
            });
        }

        setProgress(false);
    }

    function doCloseAlert() {
        setAlert({});
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/static/plugins/icheck-bootstrap/icheck-bootstrap.min.css"/>
            </Head>
            <div>
                <div className="login-box">
                    <div
                        className={`alert ${alert.type == 'error' ? "alert-danger" : "alert-success"} alert-dismissible`}
                        style={{
                            display: alert.visible ? "block" : "none"
                        }}>
                        <button type="button" className="close" onClick={doCloseAlert}>&times;</button>
                        <h5><i className="icon fas fa-ban"></i> {alert.title}</h5>
                        {alert.message}
                    </div>
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link href="/login">
                                <a className="h1">
                                    <b>Etcetera</b>Login
                                </a>
                            </Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            <form onSubmit={doLogin} method="post">
                                <div className="input-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        onChange={setValue}
                                        disabled={progress}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        onChange={setValue}
                                        disabled={progress}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember"/>
                                            <label htmlFor="remember">Remember Me</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block" disabled={progress}>
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <p className="mb-1">
                                <Link href="/forgot-password">
                                    <a>I forgot my password</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;