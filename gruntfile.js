module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        clean: require("./grunt-tasks/clean"),
        webpack: require("./grunt-tasks/webpack"),
        watch: require("./grunt-tasks/watch"),
        copy: require("./grunt-tasks/copy"),
        less: require("./grunt-tasks/less"),
        eslint: require("./grunt-tasks/eslint"),
        symlink: require("./grunt-tasks/symlink"),
    });

    grunt.registerTask("lib", ["copy:react", "copy:reactdom", "copy:purecss", "copy:fontawesome", "copy:fonts", "copy:sortablejs", "copy:fetch", "webpack:markdown"]);
    grunt.registerTask("backend", ["copy:backend"]);
    grunt.registerTask("js", ["clean:js", "eslint", "webpack:dev"]);
    grunt.registerTask("css", ["clean:less", "less"]);
    grunt.registerTask("prod", ["build"]);
    grunt.registerTask("build", ["clean:all", "symlink", "js", "css", "copy:html", "lib", "backend"]);
    grunt.registerTask("dev", ["build", "watch"]);
    grunt.registerTask("default", ["dev"]);
};
