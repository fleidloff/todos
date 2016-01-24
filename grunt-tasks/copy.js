module.exports =    {
    backend: {
        files: [
            {expand: true, cwd: "froodle/backend/", src: ["**/*.js", "**/*.json"], dest: "froodle/dist/"}
        ]
    },
    html: {
        files: [
            {expand: true, flatten: true, src: ["froodle/frontend/index.html"], dest: "froodle/dist/web/"}
        ]
    },
    react: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/react/dist/react.js", "node_modules/react/dist/react.min.js"], dest: "froodle/dist/web/lib/"}
        ]
    },
    reactdom: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/react-dom/dist/react-dom.js", "node_modules/react-dom/dist/react-dom.min.js"], dest: "froodle/dist/web/lib/"}
        ]
    },
    sortablejs: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/sortablejs/Sortable.js", "node_modules/sortablejs/Sortable.min.js"], dest: "froodle/dist/web/lib/"}
        ]
    },
    fetch: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/whatwg-fetch/fetch.js", "node_modules/sortablejs/Sortable.min.js"], dest: "froodle/dist/web/lib/"}
        ]
    },
    purecss: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/purecss/build/grids-responsive-min.css"], dest: "froodle/dist/web/css/purecss/"}
        ]
    },
    fontawesome: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/font-awesome/css/font-awesome.min.css"], dest: "froodle/dist/web/css/font-awesome/"}
        ]
    },
    fonts: {
        files: [
            {expand: true, flatten: true, src: ["node_modules/font-awesome/fonts/*"], dest: "froodle/dist/web/css/fonts/"}
        ]
    },
};
