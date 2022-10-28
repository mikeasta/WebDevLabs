const {src, dest, series, parallel} = require("gulp");
const less      = require("gulp-less");
const clean_css = require("gulp-clean-css");
const pug       = require("gulp-pug");
const babel     = require("gulp-babel");
const uglify    = require("gulp-uglify");
const fse       = require('fs-extra');

// Copying bin folder
try {
    console.log("Bin folder: ");
    fse.copySync("./src/bin", "./dist_gulp/bin", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

// Copying public folders
try {
    console.log("Public/images folder: ");
    fse.copySync("./src/public/images", "./dist_gulp/public/images", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

try {
    console.log("Public/json folder: ");
    fse.copySync("./src/public/json", "./dist_gulp/public/json", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

try {
    console.log("Routes folder: ");
    fse.copySync("./src/routes_webpack", "./dist_gulp/routes", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

try {
    console.log("App.mjs: ");
    fse.copySync("./src/app.mjs", "./dist_gulp/app.mjs", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

paths = {
    less: {
        src: "src/public/stylesheets/*.less",
        dest: "dist_gulp/public/stylesheets"
    },
    pug: {
        src: "src/views/*.pug",
        dest: "dist_gulp/views"
    },
    js: {
        src: "src/public/javascripts/*.js",
        dest: "dist_gulp/public/javascripts"
    }
}

function build_less()
{
    return src(paths.less.src)
        .pipe(less())
        .pipe(clean_css())
        .pipe(dest(paths.less.dest));
}

function build_pug()
{
    return src(paths.pug.src)
        .pipe(pug())
        .pipe(dest(paths.pug.dest));
}

function build_js()
{
    return src(paths.js.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(paths.js.dest));
}

exports.default = parallel(build_less, build_pug, build_js)