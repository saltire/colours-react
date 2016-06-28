'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const less = require('gulp-less');


gulp.task('babel', () => {
    gulp.src('js/*.js')
        .pipe(babel({presets: ['es2015', 'react']}))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist'));
});

gulp.task('src', () => {
    gulp.src('src/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', () => {
    gulp.src(
        [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/react/dist/react.js',
            'node_modules/react-dom/dist/react-dom.js'
        ])
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('serve', () => {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('watch', () => {
    gulp.watch('js/*.js', ['babel']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch('src/*', ['src']);
});

gulp.task('build', ['babel', 'less', 'src', 'libs']);
gulp.task('default', ['serve', 'watch']);
