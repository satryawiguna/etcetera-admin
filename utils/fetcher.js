import {useSelector} from "react-redux";

function UpdateOptions(options) {
    const {auth} = useSelector((state) => state.auth);
    const update = { ...options }

    if (auth.access_token) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${auth.access_token}`
        }
    }

    return update;
}

export default function fetcher(url, options) {
    return fetch(url, UpdateOptions(options));
}