import React, {useEffect} from 'react'
import useSwr from "swr";
import {useRouter} from "next/router";
import {logout} from "../../redux/features/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Api from "../../utils/api";
import Swal from "sweetalert2";
import {deleteCookie} from 'cookies-next';

const AdminAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const fetcher = url => Api.get(url).then(res => res.data);
    const {data, error} = useSwr("checkToken", fetcher);

    useEffect(() => {
        if (error && router.pathname !== '/login') {
            Swal.fire({
                icon: 'error',
                text: `Oppsss... Seems session has expired.`,
                showConfirmButton: true
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

                    router.replace("/login");
                }
            });
        }
    }, [error])
}

export default AdminAuth
