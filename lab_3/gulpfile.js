const {src, dest, series, parallel} = require("gulp");
const less      = require("gulp-less");
const clean_css = require("gulp-clean-css");
const pug       = require("gulp-pug");
const babel     = require("gulp-babel");
const uglify    = require("gulp-uglify");
const fse       = require('fs-extra');

// Copying public folders
try {
    console.log("Public/certificate folder: ");
    fse.copySync("./public/certificate", "./dist_gulp/public/certificate", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}


try {
    console.log("Routes folder: ");
    fse.copySync("./routes", "./dist_gulp/routes", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}


// Utils folder import
try {
    console.log("Utils folder: ");
    fse.copySync("./utils", "./dist_gulp/utils", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}


// App file import
try {
    console.log("Server.js: ");
    fse.copySync("./server.js", "./dist_gulp/server.js", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}


// Database import
try {
    console.log("Database.json: ");
    fse.copySync("./database.json", "./dist_gulp/database.json", { overwrite: true });
    console.log('Success!');
} catch (err) {
    console.error(err)
}

paths = {
    less: {
        src: "public/less/*.less",
        dest: "dist_gulp/public/less"
    },
    pug: {
        src: "public/views/*.pug",
        dest: "dist_gulp/views"
    },
    js: {
        src: "public/scripts/*.js",
        dest: "dist_gulp/public/scripts"
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