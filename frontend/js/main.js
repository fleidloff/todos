import React from "react";
import World from "./app/world";
import Project from "./components/project/project";
import Header from "./components/header";
import Footer from "./components/footer";
import Notifications from "./components/notifications";
import ReactDOM from "react-dom"; 
import config from "../../config";

window.PRECONDITIONS = true;
window.DBG = config.app.debug ? true : false; // todo: who reassigns DBUG when set?

ReactDOM.render(
    <World>
        <Header key="Header" /> 
        <Notifications key="Notifications" />  
        <Project key="Project" />
        <Footer key="Footer" />
    </World>,
    document.getElementById("content")
);
