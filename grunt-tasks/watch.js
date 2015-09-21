module.exports = {
    js: {
        files: ["frontend/js/**/*.js"],
        tasks: ["js"],
        options: {
            spawn: false,
            livereload: true
        },
    },
    less: {
        files: ["frontend/less/**/*.less"],
        tasks: ["css"],
        options: {
            spawn: false,
            livereload: true
        },
    },
    backend: {
        files: ["backend/**/*.js"],
        tasks: ["backend"],
        options: {
            spawn: false,
            livereload: true
        },
    },
};
