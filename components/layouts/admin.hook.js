import React, {Component} from 'react'
import AdminSidebar from "./admin.sidebar";
import AdminFooter from "./admin.footer";
import AdminHeader from "./admin.header";
import AdminContent from "./admin.content";
import AdminAuth from "./admin.auth";

export default class AdminHook extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <AdminAuth />
                <AdminHeader/>
                <AdminSidebar/>
                <AdminContent title={this.props.title}>
                    {this.props.children}
                </AdminContent>
                <AdminFooter/>
            </div>
        )
    }
}