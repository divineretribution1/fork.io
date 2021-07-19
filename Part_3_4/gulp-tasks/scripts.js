const { src, dest } = require("gulp");
const { bs } = require("./serv.js");

function scripts() {
   return src("./src/js/script.js").pipe(dest("./dist/js")).pipe(bs.stream());
}

exports.scripts = scripts;
