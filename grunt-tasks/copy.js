module.exports =    {
    deploy: {
        files: [
            {expand: true, src: ["dist/web/**"], dest: "/home/fred/Dropbox/Public/todo"}
        ]
    },
    backend: {
        files: [
            {expand: true, cwd: "backend/", src: ["**/*.js"], dest: "dist/"}
        ]
    },
    html: {
        files: [
            {expand: true, flatten: true, src: ["frontend/index.html"], dest: "dist/web/"}
        ]
    },
    react: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/react/dist/react.js", "node_modules/react/dist/react.min.js"], dest: "dist/web/lib/"}
        ]
    },
    sortablejs: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/sortablejs/Sortable.js", "node_modules/sortablejs/Sortable.min.js"], dest: "dist/web/lib/"}
        ]
    },
    fetch: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/whatwg-fetch/fetch.js", "node_modules/sortablejs/Sortable.min.js"], dest: "dist/web/lib/"}
        ]
    },
};
