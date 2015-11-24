module.exports = {
    "app": {
        "port": 3100,
        "context": "/nodejs/froodle"
    },
    "mongo": {
        "host": "mongodb://fleidlof_mongoadmin:iebeTh1ach@localhost:20811/",
        "db": "todos",
        config: {
            server: {auto_reconnect:true}, 
            auth:{authdb:"admin"}
        }
    },
    "frontend": {
        "path": "dist/web"
    },
    "api": {
        "version": "v1",
        "context": "/api"
    }
};
