import React from "react";
import kc from "../shared/keycodes";

export default React.createClass({
    getInitialState() {
        return {
            password: ""
        };
    },

    onChange(what) {
        return e => {
            this.setState({password: e.target.value});
        };
    },

    onKeyDown(e) {
        if (e.keyCode === kc.enter) {
            localStorage.setItem("Authorization", btoa(this.state.password));
            this.props.app.trigger("goto:page", null);
        }
    },

    render() {
        return <div>
            <input type="password" onKeyDown={this.onKeyDown} value={this.state.password} onChange={this.onChange("password")} />
        </div>;
    }
});
