import React, {Component} from 'react'
import AdminSidebar from "./admin.sidebar";
import AdminFooter from "./admin.footer";
import AdminHeader from "./admin.header";
import AdminContent from "./admin.content";

export default class AdminHook extends Component {
    render() {
        return (
            <div>
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