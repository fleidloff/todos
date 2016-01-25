module.exports = {
    js: {
        files: ["froodle/frontend/js/**/*.js"],
        tasks: ["js"],
        options: {
            spawn: false,
            livereload: true
        },
    },
    less: {
        files: ["froodle/frontend/less/**/*.less"],
        tasks: ["css"],
        options: {
            spawn: false,
            livereload: true
        },
    },
    backend: {
        files: ["froodle/backend/**/*.js", "reveal/**/*.js"],
        tasks: ["backend"],
        options: {
            spawn: false,
            livereload: true
        },
    },
};
