// Carregar o GULP e os plugins necessários
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// Diretório dos arquivos para evitar repetição no futuro
var files = './assets/*';

// Nova tarefa para executar o jshint
gulp.task('lint', function(){
	gulp.src(files)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// Nova tarefa para executar concatenação de arquivos
// Renomear os arquivos para minificar com o uglify
// Copiar os novos arquivos para pasta de distribuição "dist"
gulp.task('dist', function(){
	gulp.src(files)
	.pipe(concat('./dist'))
	.pipe(rename('dist.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist'));
});

// Nova tarefa que vai executar quando executar o comando "gulp"
gulp.task('default', function(){
	gulp.run('lint', 'dist');
	gulp.watch(files, function(evento){
		gulp.run('lint', 'dist');
	});
});