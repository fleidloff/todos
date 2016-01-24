module.exports = {
    "app": {
        "port": 1080,
        "context": "/froodle",
        "debug": true
    },
    "server": {
        "context": ""
    },
    "mongo": {
        "host": "mongodb://localhost:27017/",
        "db": "todos",
        "config": {server:{auto_reconnect:true}}
    },
    "frontend": {
        "path": "froodle/dist/web"
    },
    "api": {
        "version": "v1",
        "context": "/api"
    },
    "user": {
        "authRequired": false
    }
};
