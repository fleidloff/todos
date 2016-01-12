import React from "react";
import kc from "../shared/keycodes";

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
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem("Authorization", btoa(this.state.user + ":" + this.state.password));
            this.props.app.trigger("goto:page", null);
            dispatcher.trigger("start:app");    
        } else {
            this.props.app.trigger("app:error", "cannot login because no sessionStorage is available");
        }   
    },

    render() {
        return <div className="login">
            <form className="pure-form">
                    <input type="text" placeholder="User" onChange={this.onChange("user")} onKeyDown={this.onKeyDown} value={this.state.user} />
                    <input type="password" placeholder="Password" onChange={this.onChange("password")} onKeyDown={this.onKeyDown} value={this.state.password} />

                    <button onClick={this.login} type="submit" className="pure-button pure-button-primary">Sign in</button>
            </form>
        </div>;
    }
});
