import React from "react";

export default React.createClass({
    logout() {
        sessionStorage.setItem("Authorization", null);
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
