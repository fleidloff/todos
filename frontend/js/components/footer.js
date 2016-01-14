import React from "react";
import session from "../util/session";
import api from "../app/api";

export default React.createClass({
    logout(e) {
        e.preventDefault();
        api.user.logout();
        session.removeItem("session-id");
        this.props.app.trigger("goto:page", "login");
        this.props.app.trigger("show:message", "logged out.", "info", true);
    },
    renderLogout() {
        if (this.props.app.model.pageName !== "login") {
            return <a href="" onClick={this.logout}>logout</a>
        }
    },
    render() {
        return <div className="footer">
            {this.renderLogout()}
        </div>;
    }
});
