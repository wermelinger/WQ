var modRewrite = require('connect-modrewrite');
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost',
            },
            server: {
                options: {
                    middleware: function (connect) {
                        return [
                            modRewrite (['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg$ /index.html [L]']),
                            mountFolder(connect, 'app')
                        ];
                    }        
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server', ['connect:server']);

};