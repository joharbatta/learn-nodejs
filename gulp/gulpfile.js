var gulp = require('gulp')
var responsive = require('gulp-responsive')
var imagemin = require('gulp-imagemin');


// to run in terminal
// gulp it will run default

gulp.task('default', function () {
    return gulp
      .src('src/*')
      .pipe(
       responsive(
          {
            // '*.jpg': { width: 200 },
            // '*.png': { width: '50%' },
            '*':[{
              width: '20%',
              rename: { suffix: '@1x' }
            },
             {width: '40%', rename: {suffix: '@2x'}},
            {width: '60%', rename: {suffix: '@3x'}},
            {width: '80%', rename: {suffix: '@4x'}},
            {width: '100%', rename: {suffix: '@5x'}}
            // },{
            //   width: 600,
            //   rename: { suffix: '@2x' }
            // },
            // ,{
            //   width: 900,
            //   rename: { suffix: '@3x' }
            // }
          ]
          },
          {
            quality: 70,
            format: 'jpg',
            progressive: true,
            compressionLevel: 6,
            withMetadata: false
          },
          // {
          //   '*.jpg': [
          //     {
          //       width: 200,
          //       rename: { suffix: '-200px' }
          //     },
          //     {
          //       width: 500,
          //       rename: { suffix: '-500px' }
          //     },
          //     {
          //       width: 630,
          //       rename: { suffix: '-630px' }
          //     },
          //     {
          //       // Compress, strip metadata, and rename original image
          //       rename: { suffix: '-original' }
          //     }
          //   ]
          // }
        )
      )
      .pipe(gulp.dest('dist'))
      //   responsive({
      //     'background-*.jpg': {
      //       width: 700,
      //       quality: 50
      //     },
      //     'cover.png': {
      //       width: '50%',
      //       // convert to jpeg format
      //       format: 'jpeg',
      //       rename: 'cover.jpg'
      //     },
      //     // produce multiple images from one source
      //     'logo.png': [
      //       {
      //         width: 200
      //       },
      //       {
      //         width: 200 * 2,
      //         rename: 'logo@2x.png'
      //       }
      //     ]
      //   })
      // )
      // .pipe(gulp.dest('dist'))
  })

//terminal run
// gulp imagemin

  gulp.task('imagemin', () => (
    gulp.src('src/*')
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 50, progressive: true }),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ]))
      .pipe(gulp.dest('dist/images'))

  ))