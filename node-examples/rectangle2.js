// module.exports = function(x, y, callback) {
//     try {
//       if (x < 0 || y < 0) {
//         throw new Error('Rectangle dimensions should be greater than zero: l = '
//                          + x + ', and b = ' + y);
//       }
//       else
//         callback(null, {
//           perimeter: function () {
//             return (2*(x+y));
//           },
//           area: function () {
//             return (x*y);
//           }
//         });
//     }
//     catch (error) {
//       callback(error, null);
//     }
//   }
  module.exports = (x,y,callback) => {
    if (x <= 0 || y <= 0)
        setTimeout(() => 
            callback(new Error("Rectangle dimensions should be greater than zero: l = "
                + x + ", and b = " + y), 
            null),
            2000);
    else
        setTimeout(() => 
            callback(null, {
                perimeter: () => (2*(x+y)),
                area:() => (x*y)
            }), 
            2000);
}
