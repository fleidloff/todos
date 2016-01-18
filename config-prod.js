module.exports = {
    "app": {
        "port": 3100,
        "context": "/froodle",
        "debug": false
    },
    "server": {
        "context": "/nodejs"
    },
    "mongo": {
        "host": "mongodb://fleidlof_mongoadmin:iebeTh1ach@localhost:20811/",
        "db": "todos",
        "config": {
            "server": {"auto_reconnect":true},
            "auth":{"authdb":"admin"}
        }
    },
    "frontend": {
        "path": "dist/web"
    },
    "api": {
        "version": "v1",
        "context": "/api"
    },
    "user": {
        "authRequired": true
    }
};
