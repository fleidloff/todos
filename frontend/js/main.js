import React from "react";
import App from "./app/app";
import Project from "./components/project/project";
import Header from "./components/header";
import Notifications from "./components/notifications";

React.render(
    <App render={app => {
        // todo: remove
        window.app = app;
        return <div>
            <Header app={app} /> 
            <Notifications app={app} />  
            <Project app={app} /> 
        </div>
    }}/>,
    document.getElementById("content")
);
