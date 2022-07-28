import {useState} from "react";
import Link from "next/link";
import nookies from "nookies";
import Router from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../redux/features/auth';
import Head from "next/head";

const Login = () => {
    const dispatch = useDispatch();

    const [loginFields, setLoginFields] = useState({});
    const [progress, setProgress] = useState(false);
    const [message, setMessage] = useState({
        type: null,
        content: null,
        visible: false
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
        e.preventDefault();

        setProgress(true);

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginFields)
        }).then(res => {
            if (!res.ok) {
                throw Error(res);
            }

            setMessage({
                type: "success",
                content: "Login success",
                visible: true
            });

            return res.json();
        }).then(data => {
            if (data.token) {
                dispatch(setAuth({
                    isAuth: true,
                    access_token: data.token.access_token,
                    refresh_token: data.token.refresh_token,
                    user: data.user
                }))

                nookies.set(null, '__etc__', data.token.access_token);

                setLoginFields({});
                e.target.reset();

                window.location.href = '/';
                // Router.replace('/');
            }
        }).catch(err => {
            switch (err.message.status) {
                default:
                case 401:
                    setMessage({
                        type: "error",
                        content: "Invalid email & password",
                        visible: true
                    });
                    break
            }
        });

        setProgress(false)
    }

    function doCloseAlert(e) {
        setMessage({});
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/static/plugins/icheck-bootstrap/icheck-bootstrap.min.css" />
            </Head>
            <div>
                <div className="login-box">
                    <div className={`alert ${message.type == 'error' ? "alert-danger" : "alert-success"} alert-dismissible`}
                         style={{
                             display: message.visible ? "block" : "none"
                         }}>
                        <button type="button" className="close" onClick={doCloseAlert}>&times;</button>
                        <h5><i className="icon fas fa-ban"></i> Alert!</h5>
                        {message.content}
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

export default Login