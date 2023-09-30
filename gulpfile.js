const { src, dest, watch, series, parallel } = require('gulp');

//CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { Exception } = require('sass');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano')

//Imagenes
const squoosh = require('gulp-libsquoosh');

function css(done) {
    //compilar sass
    //pasos: 1-identificar archivo, 2-compilarla, 3-guardar el .css
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    
        done()
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(squoosh())
        .pipe(dest('build/img'))
}

function webpAvif() {
    return src('src/img/**/*.{png,jpg}')
    .pipe(squoosh({
        webp: {},
        avif: {},
    }))
    .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}
exports.css = css;
exports.dev = dev;
exports.webpAvif = webpAvif;
exports.imagenes = imagenes;
exports.default = series(imagenes,webpAvif,css,dev);

//series - se inicia una tarea, y hasta que finaliza, inicia la siguiente
//parallel - todas inician al mismo tiempo