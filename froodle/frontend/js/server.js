const React = require("react");
const World = require("./app/world");
const Page = require("./app/page");
const Project = require("./components/project/project");
const Header = require("./components/header");
const Footer = require("./components/footer");
const Login = require("./components/login/login");
const Notifications = require("./components/notifications");
const ReactDOMServer = require("react-dom/server");
const config = require("../../../config");



const a = ReactDOMServer.renderToString(
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

    </World>  
);

console.log(a);
