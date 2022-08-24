import AdminSidebar from "./admin.sidebar";
import {useRouter} from 'next/router'

const AdminContent = (props, context) => {
    const router = useRouter();

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">{props.title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

AdminSidebar.getServerSideProps = async (ctx) => {
    return {context: ctx}
}

export default AdminContent
