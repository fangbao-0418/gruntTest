// 与 Grunt 有关的主要有三块代码：任务配置代码、插件加载代码、任务注册代码。

module.exports = function(grunt){
  // console.log(grunt.file.readJSON('package.json'));
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'dest',
          src: '**/*.js',
          dest: 'dest'
        }]
      }
      // build: {
      //   src: 'src/*.js',
      //   dest: 'build/'
      // }
    },
    clean: ['dest/*'],
    log: {
      foo: [1, 2, 3],
      bar: 'hello world',
      baz: false
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        tasks: ['uglify'],
        options: {
          interrupt: true,
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 8080,
          hostname: '*',
          base: 'src',
          // open: true, // 是否打开浏览器 默认false
          livereload: true // 根据watch文件重新刷新 默认false
          // onCreateServer: function(server, connect, options) {
          //   var io = require('socket.io').listen(server);
          //   io.sockets.on('connection', function(socket) {
          //     // do something with socket
          //   });
          // }
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: '**',
        timestamp: true, // 是够保留文件生成的时间
        // nonull: false,
        // flatten: true,
        dest: 'dest/',
        options: {
          process: function (content, srcpath) {
            /**
             * content 文件内容
             * srcpath 文件路径
             */
            console.log(srcpath);
            // return content.replace(/[sad ]/g, '_');
          },
        },
        tasks: ['uglify']
      },
    }
  })
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.registerTask('clean', ['clean']);
  grunt.registerTask('test', 'a test demo', function(){
    console.log('test');
  })
  // grunt.registerTask('uglify', 'uglify', function(target){
  //   console.log(this);
  // });
  grunt.registerTask('build', ['clear', 'copy']);
  grunt.registerTask('clear', ['clean']);
  grunt.registerTask('serve', 'open a serve', function(){
    grunt.task.run('connect:server:keepalive');
  })
  // grunt.registerTask('watch', ['watch']);
}
