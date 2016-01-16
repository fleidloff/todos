module.exports =    {
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
    reactdom: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/react-dom/dist/react-dom.js", "node_modules/react-dom/dist/react-dom.min.js"], dest: "dist/web/lib/"}
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
    purecss: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/purecss/build/grids-responsive-min.css"], dest: "dist/web/css/purecss/"}
        ]
    },
    fontawesome: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/font-awesome/css/font-awesome.min.css"], dest: "dist/web/css/font-awesome/"}
        ]
    },
    fonts: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/font-awesome/fonts/*"], dest: "dist/web/css/fonts/"}
        ]
    },
};
