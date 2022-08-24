import {useState} from "react";
import Link from "next/link";

const ForgotPassword = () => {
    const [forgotPasswordFields, setForgotPasswordFields] = useState({});
    const [progress, setProgress] = useState(false);

    const msg = {
        type: null,
        content: null,
        visible: false
    };
    const [message, setMessage] = useState(msg);

    function setValue(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setForgotPasswordFields({
            ...forgotPasswordFields,
            [name]: value
        });
    }

    async function doRequestResetPassword(e) {
        e.preventDefault();

        setProgress(true);

        setProgress(false)
    }

    function doCloseAlert(e) {
        setMessage({});
    }

    return (
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
                    <div className="card-body">
                        <p className="login-box-msg">Request reset password</p>
                        <form onSubmit={doRequestResetPassword} method="post">
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
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={progress}>
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p className="mb-1 mt-2">
                            <Link href="/login">
                                <a>Back to Login</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    return { props: { isHome: false } };
}

export default ForgotPassword