import React from "react";
import kc from "../shared/keycodes";
import session from "../../util/session";
import api from "../../app/api";

export default React.createClass({
    getInitialState() {
        return {
            user: "",
            password: ""
        };
    },

    onChange(what) {
        return e => {
            this.setState({[what]: e.target.value});
        };
    },

    onKeyDown(e) {
        if (e.keyCode === kc.enter) {
            this.login();
        }
    },
    login() {
            // todo: we run into problems because chrome replaces the state before the sessionStorage is filled up
            const user = this.state.user + "";
            const password = this.state.password + "";
            session.removeItem("session-id");
            api.user.login(btoa(user + ":" + password)).then(() => {
                this.props.app.trigger("goto:page", null);
                this.props.app.trigger("start:app");
            });
    },

    render() {
        return <div className="login">
            <form autoComplete="off" className="pure-form" id="froodle-login">
                    <input autoComplete="off" id="user" type="text" placeholder="User" onChange={this.onChange("user")} onKeyDown={this.onKeyDown} value={this.state.user} />
                    <input autoComplete="off" id="password" type="password" placeholder="Password" onChange={this.onChange("password")} onKeyDown={this.onKeyDown} value={this.state.password} />

                    <button onClick={this.login} type="submit" className="pure-button pure-button-primary">Sign in</button>
            </form>
        </div>;
    }
});
