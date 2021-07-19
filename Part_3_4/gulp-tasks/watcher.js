const { watch, series } = require("gulp");
const { scripts } = require("./scripts.js");
const { styles } = require("./styles.js");
const { bs } = require("./serv.js");

function watcher() {
   watch("*.html").on("change", bs.reload);
   watch("./src/js/*.js").on("change", series(scripts, bs.reload));
   watch("./src/styles/*.scss").on("change", series(styles, bs.reload));
}

exports.watcher = watcher;
