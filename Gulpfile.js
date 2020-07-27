"use strict";

// Load plugins
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const stripDebug = require("gulp-strip-debug");
const concat = require("gulp-concat");
const gih = require("gulp-include-html");
const imagemin = require("gulp-imagemin");

function images() {
  return gulp
    .src("./frontend/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"));
}

function css() {
  return gulp
    .src("frontend/scss/app/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css/"));
}

function cssVendor() {
  return gulp
    .src("frontend/scss/vendors/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssmin())
    .pipe(concat("vendors.css"))
    .pipe(gulp.dest("./dist/css/"));
}

function fonts() {
  return gulp
    .src(["./frontend/fonts/*.woff", "./frontend/fonts/*.woff2"])
    .pipe(gulp.dest("./dist/fonts"));
}

function jsVendor() {
  return gulp
    .src(["frontend/js/vendors/jquery-3.4.1.js", "frontend/js/vendors/*.js"])
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(concat("vendors.js"))
    .pipe(gulp.dest("./dist/js"));
}

function js() {
  return (
    gulp
      .src([
        "frontend/js/*.js",
        "frontend/js/app/*.js",
        "frontend/js/app/**/*.js",
      ])
      //.pipe(stripDebug())
      .pipe(uglify())
      .pipe(concat("main.js"))
      .pipe(gulp.dest("./dist/js"))
  );
}

function watchFiles() {
  gulp.watch("frontend/scss/vendors/*.scss", cssVendor);
  gulp.watch("frontend/scss/app/**/*.scss", css);
  gulp.watch("frontend/js/vendors/*.js", jsVendor);
  gulp.watch(["frontend/js/app/*.js", "frontend/js/app/**/*.js"], js);
  gulp.watch(
    ["./frontend/img/*.png", "./frontend/img/*.jpg", "./frontend/img/*.gif"],
    gulp.parallel(images, css)
  );
}

const compile = gulp.parallel(css, images, cssVendor, fonts, jsVendor, js);
const defaultTasks = gulp.series(
  gulp.parallel(images, cssVendor, fonts, jsVendor, css, js),
  watchFiles
);

exports.images = images;
exports.cssVendor = cssVendor;
exports.jsVendor = jsVendor;
exports.css = css;
exports.fonts = fonts;
exports.js = js;
exports.watch = watchFiles;
exports.compile = compile;
exports.default = defaultTasks;
