const { src, dest } = require("gulp");
const { bs } = require("./serv.js");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
function styles() {
   return src("./src/styles/style.scss")
   .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
      .pipe(sourcemaps.write())
      .pipe(dest("./dist/css"))
      .pipe(bs.stream());
}

exports.styles = styles;
