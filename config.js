module.exports = {
    "app": {
        "port": 8080,
        "context": "/froodle"
    },
    "mongo": {
        "host": "mongodb://localhost:27017/",
        "db": "todos"
    },
    "frontend": {
        "path": "dist/web"
    },
    "api": {
        "version": "v1",
        "context": "/api"
    }
};
