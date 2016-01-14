import whatwg from "whatwg-fetch";
import dispatcher from "./dispatcher";
import session from "../util/session";

let authHeader = "";
let sessionIdHeader = "";


export default function(...params) {
    return new Promise((resolve, reject) => {
        if (typeof params[1] === "undefined") {
            params[1] = {};
        }
        if (typeof params[1].headers === "undefined") {
            params[1].headers = {

            };
        }
        sessionIdHeader = session.getItem("session-id") || ""; 
        if (sessionIdHeader && (typeof params[1].headers.Authorization === "undefined")) {
            params[1].headers["session-id"] = sessionIdHeader;
        }
        if (params[1].method === "post" || params[1].method === "delete" || params[1].method === "put") {
            params[1].headers.Accept = "application/json";
            params[1].headers["Content-Type"] = "application/json";
        }
        whatwg(...params).then(res => {
            if (res && res.status == 401) {
                var e = new Error("user is not logged in.");
                e.silent = true;
                dispatcher.trigger("goto:page", "login");
                reject(e);
            }

            if (res.headers.get("session-id")) {
                session.setItem("session-id", res.headers.get("session-id"));
            }

            return resolve(res);
        });
    });
};
