import React from "react";
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
            {this.renderLogout()} <a href="https://fortawesome.github.io/Font-Awesome/icons/">fa-icons</a>
        </div>;
    }
});
