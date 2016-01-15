import React from "react";
import session from "../util/session";
import api from "../app/api";

export default React.createClass({
    logout(e) {
        e.preventDefault();
        this.props.app.trigger("user:logout");
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
