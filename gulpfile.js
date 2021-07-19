const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const cli = require('gulp-cli');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const { reload } = require('browser-sync');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');



gulp.task('sass-compile',function(){
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
})
// Таска для очистки папки dist
gulp.task('default', function () {
    return gulp.src('./dist/*css')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
    return gulp.src('./dist/css/main.css')
    .pipe(autoprefixer({
        overrideBrowserslist :['last 2 version'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'))
    
    
})
// таска для css-del
gulp.task('cleancss', (done) => {
    return gulp.src('./dist/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist'));
      done()
  });
//   таска для картинок

gulp.task('images', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
           
        }))
        .pipe(gulp.dest('dist/img'));
});

// Таска для JS
const allJs=[
    './src/js/main.js',
    './src/js/add.js'
];
gulp.task('scripts', function() {
    return gulp.src(allJs)
      .pipe(concat('./main.js'))
      .pipe(minify())
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.stream());
  });
  gulp.task('minify', function(done) {
    gulp.src('./src/js/main.js')
      .pipe(minify())
      .pipe(gulp.dest('dist/js'))
      done()
  });

//   Таска для Браузера
gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch('*.html').on('change', browserSync.reload)
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass-compile','styles','images'))
    gulp.watch('./src/**/*.js', gulp.series('scripts'))
   
});
gulp.task('build', gulp.series('default',gulp.parallel('sass-compile','scripts')));
gulp.task('dev', gulp.series('build','sync'))











