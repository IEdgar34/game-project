const { on } = require("events");
const { src, dest, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

function styles() {
    return src("src/sass/**/*.+(sass|scss)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
        .pipe(concat("style.min.css"))
        .pipe(browserSync.stream())
        .pipe(dest("src/css"));
}

function script() {
    return src(["src/js/**/*.js", "!src/js/index.min.js"])
        .pipe(concat("index.min.js"))
        .pipe(browserSync.stream())
        .pipe(dest("src/js"));
}

function server() {
    browserSync.init({
        server: {
            baseDir: "src",
        },
    });
}
function watching() {
    watch(["src/sass"], styles);
    watch(["src/js/index.js"], script);
    watch(["src/**/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.script = script;
exports.server = server;
exports.watching = watching;

exports.default = parallel(styles, script, server, watching);
