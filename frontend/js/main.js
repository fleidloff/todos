import React from "react";
import App from "./app/app";
import Project from "./components/project/project";
import Header from "./components/header";
import Notifications from "./components/notifications";

React.render(
    <App>
        <Header key="Header" /> 
        <Notifications key="Notifications" />  
        <Project key="Project" />
    </App>,
    document.getElementById("content")
);
