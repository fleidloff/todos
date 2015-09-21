import React from "react";
import app from "./util/dispatcher";
import backend from "./util/backend";
import Project from "./components/project/project";
import Header from "./components/header";
import Notifications from "./components/notifications";

React.render(
    <Header app={app} />,
    document.getElementById("header")
);
React.render(
    <Notifications app={app} />,
    document.getElementById("notifications")
);
React.render(
    <Project app={app} />,
    document.getElementById("content")
);

// todo: remove
window.app = app;
app.trigger("show:message", "Hello, World!");
app.on("app:error", e => {
    // todo: remove console.log here
    console.log(e);
    app.trigger("show:message", "Ooops, something went wrong...", "warning");
});
