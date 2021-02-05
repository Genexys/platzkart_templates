'use strict';

var postcss = require('gulp-postcss'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    cssnext = require('postcss-cssnext'),
    stylelint = require('stylelint'),
    configStyle = require('stylelint-config-standard'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    webpackStream = require(`webpack-stream`),
    webpackConfig = require(`./webpack.config.js`),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload;
var concat = require("gulp-concat");

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'app/*.pug',
        js: 'app/js/app.js',
        style: 'app/style/app.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: {
        html: 'app/**/*.pug',
        js: 'app/js/**/*.js',
        style: 'app/style/**/*.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "genexys"
};

gulp.task(`webserver`, function () {
    browserSync.init({
        server: `build/`,
        notify: false,
        open: true,
        cors: true,
        ui: false,
        host: "localhost",
        port: 9000,
    });

    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.watch.img, gulp.series('image:build', 'refresh'));
    gulp.watch(path.watch.html, gulp.series('html:build', 'refresh'));
    gulp.watch(path.watch.js, gulp.series('js:build', 'refresh'));
});

gulp.task(`refresh`, function (done) {
    browserSync.reload();
    done();
});


gulp.task('clean', function (cb) {
    return rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(webpackStream(webpackConfig))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

gulp.task(`concat-js-main`, function () {
    return gulp.src([`app/js/app.js`, `app/js/partials/**/*.js`])
        .pipe(concat(`main.readonly.js`))
        .pipe(gulp.dest(`build/js`));
});

gulp.task('style:build', function () {
    var plugins = [
        //autoprefixer({browsers: ['last 2 version']}),
        cssnano(),
        cssnext,
        // stylelint(configStyle),
    ];
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream());
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', gulp.series(
    'html:build',
    'js:build',
    'concat-js-main',
    'style:build',
    'fonts:build',
    'image:build'
));

//
// gulp.task('watch', function () {
//     watch([path.watch.html], function (event, cb) {
//         gulp.start('html:build');
//     });
//     watch([path.watch.style], function (event, cb) {
//         gulp.start('style:build');
//     });
//     watch([path.watch.js], function (event, cb) {
//         gulp.start('js:build');
//     });
//     watch([path.watch.img], function (event, cb) {
//         gulp.start('image:build');
//     });
//     watch([path.watch.fonts], function (event, cb) {
//         gulp.start('fonts:build');
//     });
// });


gulp.task(`default`, gulp.series(`build`, `webserver`));
