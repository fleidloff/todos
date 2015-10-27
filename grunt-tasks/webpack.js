module.exports = {
    dev: {
        entry: "./frontend/js/main.js",
        output: {
            path: "dist/web/js",
            filename: "app.js",
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "whatwg-fetch": "fetch",
            "markdown": "markdown",
            "preconditions": "preconditions"
        },
        module: {
            loaders: [
                { 
                    loader: "babel-loader" 
                }
            ]
        }
    },
    preconditions: {
        entry: "./grunt-tasks/wrapper/preconditions.js",
        output: {
            path: "dist/web/lib",
            filename: "preconditions.js",
        },
        module: {
            loaders: [
                { 
                    loader: "babel-loader" 
                }
            ]
        }
    },
    markdown: {
        entry: "./grunt-tasks/wrapper/markdown.js",
        output: {
            path: "dist/web/lib",
            filename: "markdown.js",
        },
        module: {
            loaders: [
                { 
                    loader: "babel-loader" 
                }
            ]
        }
    }
};
