require('dotenv').config();
var fs = require('fs');
var Dict = require('oxford-dictionary');

var config = {
  app_id : process.env.ODID,
  app_key : process.env.ODKEY,
  source_land : 'eng'
};

var dict = new Dict(config);

function isNoun(word, callback)
{
  noun = undefined;
  var lookup = dict.find(word);

  lookup.then(function(res) {
    noun = res.results.some((x) => { 
      return x.lexicalEntries[0].lexicalCategory == 'Noun';
    });
    if (noun) {
      getRandomLine(callback);
    }
    else {
      callback(word);
    }
  },
  function(error) {
    callback(word);
    return false;
  });
}

function getRandomLine(call){
  var lines = fs.readFileSync('cheeses').toString().split("\n");
  var line = lines[Math.floor(Math.random()*lines.length)];
  console.log(line);
  call(line);
}

function curdle(s)
{
  var proms = s.split(/[ ]+/).map((x) => {
    return new Promise((r, j) => isNoun(x, r));
  });
  return Promise.all(proms);
}


module.exports = curdle;
