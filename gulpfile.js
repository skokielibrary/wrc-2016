var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');

// Static Server + watching scss/html files
gulp.task('serve', ['css', 'js'], function() {
  browserSync.init({
      server: "./dist"
  });

  gulp.watch("src/scss/*.scss", ['css']);
  gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/scss/*.scss")
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest("src/css"))
});

gulp.task('css', ['sass'], function(){
    return gulp.src(['bower_components/animate.css/animate.min.css', 'src/css/styles.css'])
      .pipe(concat('styles.css'))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src("bower_components/wow/dist/wow.min.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
})

gulp.task('default', ['serve']);
