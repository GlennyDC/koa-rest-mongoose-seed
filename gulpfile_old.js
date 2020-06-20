/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const del = require('del');
const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const cleanDist = () => del(['./dist/**/*']);

const transpileTs = () =>
  tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('./dist'));

const copyGraphQLFiles = () =>
  gulp.src('./src/schema/**/*.gql').pipe(gulp.dest('./dist/schema'));

exports.default = function () {
  gulp.watch(
    'src/**/*',
    { ignoreInitial: false },
    gulp.series(cleanDist, gulp.parallel(transpileTs, copyGraphQLFiles)),
  );
};
