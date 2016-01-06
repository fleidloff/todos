import whatwg from "whatwg-fetch";
import dispatcher from "./dispatcher";
let authHeader = "";


export default function(...params) {
    return new Promise((resolve, reject) => {
        if (typeof params[1] === "undefined") {
            params[1] = {};
        }
        if (typeof params.headers === "undefined") {
            params[1].headers = {

            };
        }
        if (typeof localStorage !== "undefined") {
            authHeader = localStorage.getItem("Authorization") || ""; 
            if (authHeader) {
                params[1].headers.Authorization = authHeader;
            }
        }
        if (params[1].method === "post" || params[1].method === "delete" || params[1].method === "put") {
            params[1].headers.Accept = "application/json";
            params[1].headers["Content-Type"] = "application/json";
        }
        whatwg(...params).then(res => {
            if (res && res.status == 401) {
                var e = new Error("user is not logged in.");
                e.public = true;
                reject(e);
            }

            return resolve(res);
        });
    });
};
