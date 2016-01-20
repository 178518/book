var gulp = require("gulp"),
    deploy = require("gulp-gh-pages");

gulp.task('deploy', function () {
    gulp.src("_book/**/*.*")
        .pipe(deploy({
            remoteUrl: "https://github.com/178518/book"
        }))
        .on("error", function(err){
            console.log(err)
        })
});