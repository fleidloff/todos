import React from "react";
import World from "./app/world";
import Page from "./app/page";
import Project from "./components/project/project";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/login/login";
import Raw from "./components/raw/raw";
import Notifications from "./components/notifications";
import ReactDOM from "react-dom";
import config from "../../config";

window.DBG = config.app.debug ? true : false;

ReactDOM.render(
    <World>
    
        <Page name="login">
            <Header key="Header" />
            <Notifications key="Notifications" />
            <Login />
            <Footer key="Footer" />
        </Page>

        <Page name="raw">
            <Raw />
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
