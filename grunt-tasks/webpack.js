module.exports = {
    dev: {
        // webpack options
        entry: "./frontend/js/main.js",
        output: {
            path: "dist/web/js",
            filename: "app.js",
        },
        externals: {
            "react": "React",
            "whatwg-fetch": "fetch",
            "markdown": "Markdown"
        },
        module: {
            loaders: [
                { 
                    loader: "babel-loader" 
                }
            ]
        }
    },
    prod: {
        // webpack options
        entry: "./frontend/js/main.js",
        output: {
            path: "dist/web/js",
            filename: "app-prod.js",
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
