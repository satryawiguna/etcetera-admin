import nookies from "nookies";
import Router from "next/router";
import {useDispatch} from "react-redux";
import {setAuth} from "../../redux/features/auth";

const AdminHeader = () => {
    const dispatch = useDispatch();

    function doLogout() {
        dispatch(setAuth({
            isAuth: false,
            access_token: null,
            refresh_token: null,
            user: {}
        }))

        nookies.destroy(null, '__etc__');

        window.location.href = '/login';
        // Router.replace('/login');
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                        className="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#" role="button" onClick={doLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default AdminHeader
