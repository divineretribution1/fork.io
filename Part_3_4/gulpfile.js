const { parallel, series } = require("gulp");
const { scripts } = require("./gulp-tasks/scripts.js");
const { styles } = require("./gulp-tasks/styles.js");
const { serv } = require("./gulp-tasks/serv.js");
const { watcher } = require("./gulp-tasks/watcher.js");

function clean(cb) {
   cb();
}

exports.default = parallel(serv, watcher, series(styles, scripts));
