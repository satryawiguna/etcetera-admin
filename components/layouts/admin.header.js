import {deleteCookie} from 'cookies-next';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/features/authSlice";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

const AdminHeader = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    function doLogout() {
        Swal.fire({
            icon: 'info',
            text: `Are you sure to logout...?!`,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCookie('__etcat__');
                deleteCookie('__etcrt__');

                dispatch(logout({
                    access_token: null,
                    refresh_token: null,
                    expires_in: null,
                    token_type: null,
                    user: {},
                    logged_at: null
                }));

                router.replace('/login');
            }
        });
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
                    <a className="nav-link" href="#" role="button" onClick={() => doLogout()}>
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

export default AdminHeader;
