module.exports = function (grunt) {
    grunt.initConfig({
        apidoc: {
            all: {
                src: "app/",
                dest: "apidoc/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-apidoc');

    grunt.registerTask('default', ['apidoc']);
};
