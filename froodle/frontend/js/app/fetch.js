import whatwg from "whatwg-fetch";
import dispatcher from "./dispatcher";
import session from "../util/session";

let authHeader = "";
let sessionIdHeader = "";


export default function(...params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("timeout error");
        }, 3000);
        if (typeof params[1] === "undefined") {
            params[1] = {};
        }
        if (typeof params[1].headers === "undefined") {
            params[1].headers = {};
        }
        sessionIdHeader = session.getItem("x-session-id") || "";
        if (sessionIdHeader && (typeof params[1].headers.authorization === "undefined")) {
            params[1].headers["x-session-id"] = sessionIdHeader;
        }
        if (params[1].method !== "post" || params[1].method !== "delete" || params[1].method !== "put") {
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

            if (res.headers.get("x-session-id")) {
                session.setItem("x-session-id", res.headers.get("x-session-id"));
            }

            return resolve(res);
        }).catch(e => {
            reject(e);
        });
    });
};
