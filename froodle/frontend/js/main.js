import React from "react";
import World from "./app/world";
import Page from "./app/page";
import Project from "./components/project/project";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/login/login";
import Notifications from "./components/notifications";
import ReactDOM from "react-dom";
import config from "../../../config";

window.DBG = config.app.debug ? true : false;
if (DBG) {
    window.console.debug = function (...params) {
        window.console.log("%c " + params.join("; "), "background: black; padding: 2px; color: white;");
    };
} else {
    window.console.debug = function() {};
}

ReactDOM.render(
    <World>

        <Page name="login">
            <Header key="Header" />
            <Notifications key="Notifications" />
            <Login />
            <Footer key="Footer" />
        </Page>

        <Page name="default">
            <Header key="Header" />
            <Notifications key="Notifications" />
            <Project key="Project" />
            <Footer key="Footer" />
        </Page>

    </World>,
    document.getElementById("content")
);
