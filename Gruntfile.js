module.exports = function (grunt) {

  // Configuración de Grunt
  var settings = {
    jscs: {
      options: {
        src: 'app.js',
        config: '.jscsrc',
        esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        fix: true, // Autofix code style violations when possible.
        requireCurlyBraces: ['if']
      }
    },
    watch: {
      format: {
        files: ['*.js', 'routes/*.js', 'model/*.js'], // observa cualquier cambio en archivos js
        tasks: ['jscs'], // ejecuta la compilación jscs
        options: {
          spawn: false // para que no se quede tostado
        }
      }
    }
  };

  // Cargamos configuración de Grunt
  grunt.initConfig(settings);

  // Cargamos plugins (1)
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Definimos tareas disponibles para grunt-cli (2)
  grunt.registerTask('default', ['watch', 'jscs']);

  //grunt.registerTask('production', ['less']);

};
