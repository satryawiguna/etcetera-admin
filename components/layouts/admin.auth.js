import React from 'react'
import useSwr from "swr";
import {useRouter} from "next/router";
import nookies from "nookies";
import {logout} from "../../redux/features/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Api from "../../utils/api";
import Swal from "sweetalert2";

const AdminAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const fetcher = url => Api.get(url).then(res => res.data);

    const {data, error} = useSwr("checkAuth", fetcher);

    if (error) {
        if (router.pathname !== '/login') {
            Swal.fire({
                icon: 'error',
                text: `Oppss... Seems sesion has expired.`,
                showConfirmButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    nookies.destroy(null, '__etcat__');
                    nookies.destroy(null, '__etcrt__');

                    dispatch(logout({
                        access_token: null,
                        refresh_token: null,
                        expires_in: null,
                        token_type: null,
                        user: {},
                        logged_at: null
                    }));

                    window.location.href = '/login';
                    // router.replace("/login");
                }
            });
        }
    }
}

export default AdminAuth
