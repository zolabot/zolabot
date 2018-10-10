var curd = require('./curdler.js');

console.log("Curdling Cheese...");

curd('Hello there this is a test sentence, lets see how this goes.').then((x) => {
  console.log(x);
  console.log(x.join(' '));
});
