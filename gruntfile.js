module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt); 

    grunt.initConfig({
        clean: require("./grunt-tasks/clean"),
        webpack: require("./grunt-tasks/webpack"), 
        watch: require("./grunt-tasks/watch"), 
        copy: require("./grunt-tasks/copy"), 
        less: require("./grunt-tasks/less"), 
        eslint: require("./grunt-tasks/eslint"),
    });

    grunt.registerTask("lib", ["copy:react", "copy:sortablejs", "copy:fetch", "webpack:markdown", "webpack:preconditions"]);
    grunt.registerTask("backend", ["copy:backend"]);
    grunt.registerTask("js", ["clean:js", "eslint", "webpack:dev"]);
    grunt.registerTask("css", ["clean:less", "less"]);
    grunt.registerTask("prod", ["dev"]);
    grunt.registerTask("dev", ["clean:all", "js", "css", "copy:html", "lib", "backend", "watch"]);
    grunt.registerTask("default", ["dev"]);
};