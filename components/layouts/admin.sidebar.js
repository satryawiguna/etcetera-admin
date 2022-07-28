import Link from "next/link";
import {useSelector} from "react-redux";

const AdminSidebar = (props, context) => {
    const {user} = useSelector((state) => state.auth);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link href="/">
                <a className="brand-link">
                    <h2 className="brand-text font-weight-light">
                        <strong>Etcetera</strong>
                        {' '}
                        Admin
                    </h2>
                </a>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        {/*<img*/}
                        {/*    src={`https://via.placeholder.com/160/FFFFFF/000000/?text=${user.email.charAt(0).toUpperCase() + user.email.charAt(1).toUpperCase()}`}*/}
                        {/*    className="img-circle elevation-2" alt="User Image"/>*/}
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">
                            {user.email}
                        </a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <Link href="/">
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-th"/>
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/product-category">
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-list"/>
                                    <p>
                                        Product Category
                                    </p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/product">
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-list"/>
                                    <p>
                                        Product
                                    </p>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

AdminSidebar.getInitialProps = async (ctx) => {
    return {context: ctx}
}

export default AdminSidebar
