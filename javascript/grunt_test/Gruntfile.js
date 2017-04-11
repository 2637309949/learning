module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            index: {
                src: ['dist/**/*'],
                filter: 'isFile',
            },
        },
        jshint: {
            src: {
                options: {
                    '-W015': true,
                },
                src: 'src/**/*.js',
                filter: 'isFile'
            },
            test: {
                options: {
                    '-W015': true,
                },
                src: 'test/**/*.js',
                filter: 'isFile'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.main %>.concat.js',
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.main %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'dist/<%= pkg.main %>.concat.js',
                dest: 'dist/<%= pkg.main %>.min.js'
            }
        },
        copy: {
            backup: {
                files: [{
                    expand: true,
                    src: ['docs/README.md'],
                    rename: function () {
                        return 'docs/BACKUP.txt';
                    }
                }]
            },
            template: {
                files: [{
                    expand: true,
                    cwd: 'templates/css/',
                    src: '**/*.css',
                    dest: 'dist/css/',
                    filter: function (dest) {
                        var cwd = this.cwd,
                            src = dest.replace(new RegExp('^' + cwd), '');
                            dest = grunt.task.current.data.files[0].dest;
                        return (!grunt.file.exists(dest + src));
                    }
                }]
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Test task(s).
  grunt.registerTask('test', ['jshint', 'qunit']);
  // Default task(s).
  grunt.registerTask('default', ['clean', 'qunit', 'jshint', 'concat', 'uglify', 'copy']);
}