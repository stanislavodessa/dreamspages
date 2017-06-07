'use strict';

var gulp = require('gulp'),
	// googlecdn = require('gulp-google-cdn'),
	// wiredep = require('wiredep').stream, // Прописывает библиотеки в index.html

    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'), // Сжимает CSS

    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),

    spritesmith = require('gulp.spritesmith'), // Создает спрайты
    imagemin = require('gulp-imagemin'), // Сжимаем картинки
    pngquant = require('imagemin-pngquant'), // Сжимаем картинки для png

    watch = require('gulp-watch'),

	browserSync = require("browser-sync"),

    reload = browserSync.reload;


var path = {
    public: {
        html: '',
        js: 'js/',
        css: 'css/',
        img: 'img/',
        font: 'font/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*.*',
        mainJs: 'src/js/main.js',
        css: 'src/css/**/*.*',
        sass: 'src/sass/style.scss',
        img: 'src/img/**/*.*',
        font: 'src/font/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        // bootstrap: 'src/style/bootstrap.scss',
        css: 'src/css/**/*.*',
        sass: 'src/sass/style.scss',
        img: 'src/img/**/*.*',
        font: 'src/font/**/*.*'
    }
};

var config = {
    server: {
        baseDir: ""
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "DreamsPages"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('html', function () {
    gulp.src(path.src.html) 
		// .pipe(wiredep({
		//   optional: 'configuration',
		//   goes: 'here',
  //         'ignorePath': ''
		// }))
        .pipe(gulp.dest(path.public.html))
        .pipe(reload({stream: true}));
});


gulp.task('js', function () {
    // Основные файлы
    gulp.src(path.src.js) 
        .pipe(gulp.dest(path.public.js))
        .pipe(reload({stream: true}));

    // Главный файл main.js
    gulp.src(path.src.mainJs) 
        .pipe(gulp.dest(path.public.js))
        .pipe(reload({stream: true}));
});



/**
 * @desc Compiles scss -> CSS
 */

// // Bootstrap4
// gulp.task('bootstrap', () => {
//     return gulp.src('src/style/bootstrap.scss')
//         .pipe(sass({
//             sourceMap: true,
//             errLogToConsole: true
//         }))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest(path.public.css))
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(rename({
//             suffix: '.min',
//         }))
//         .pipe(gulp.dest(path.public.css))
//         .pipe(reload({stream: true}));
// });

gulp.task('style', function () {
    // Основные файлы css
    gulp.src(path.src.css) 
    .pipe(gulp.dest(path.public.css));

    // Главный файл main.scss
	gulp.src(path.src.sass) 
    .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false
        }))
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest(path.public.css))

    //Минимизация
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))    
    .pipe(gulp.dest(path.public.css))
    .pipe(reload({stream: true}));
});

gulp.task('img', function () {


    //gulp.src(path.public.img).pipe(rimraf());  // Удалим прежние картинки

    gulp.src(path.src.img) 
    // .pipe(imagemin({ //Сожмем их
    //     progressive: true, //сжатие .jpg
    //     svgoPlugins: [{removeViewBox: false}], //сжатие .svg
    //     interlaced: true, //сжатие .gif
    //     use: [pngquant()],
    //     optimizationLevel: 3 //степень сжатия от 0 до 7
    // }))
    .pipe(gulp.dest(path.public.img))
    .pipe(reload({stream: true}));

    // // Генерация спрайтов
    // var spriteData = gulp.src('src/img/sprite/*.png')
    // .pipe(spritesmith({
    //   imgName: 'sprite.png',
    //   cssName: 'sprite.css'
    // }))

    // spriteData.img
    //     .pipe(gulp.dest(path.public.css)); // путь, куда сохраняем картинку
        
    // spriteData.css
    //     //Минимизация
    //     .pipe(cleanCSS({compatibility: 'ie8'}))
    //     .pipe(rename({suffix: '.min'})) 
    //     .pipe(gulp.dest(path.public.css)); // путь, куда сохраняем стили

    // spriteData.pipe(reload({stream: true}));
});


gulp.task('font', function() {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.public.font))
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    // watch([path.watch.bootstrap], function(event, cb) {
    //     gulp.start('bootstrap:public');
    // });
    watch([path.watch.css], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img');
    });
    watch([path.watch.font], function(event, cb) {
        gulp.start('font');
    });
});

gulp.task('public', [
    'html',
    'js',
    // 'bootstrap',
    'style',
    'font',
    'img'
]);

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['public', 'webserver', 'watch']);