const { series, watch } = require("gulp");
const { scripts } = require("./scripts.js");
const browserSync = require("browser-sync").create();

function serv() {
   browserSync.init({
     
      server: {
         baseDir: "./",
      },
      browser: "google chrome",
   });
}

exports.serv = serv;
exports.bs = browserSync;
