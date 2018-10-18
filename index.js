var curd = require('./curdler.js');
var Mastodon = require('mastodon-api');
var striptags = require('striptags');
var http = require('http');

const M = new Mastodon({
  access_token: process.env.MACCESS_TOKEN,
  client_id: process.env.MCLIENT_ID,
  cleint_secret: process.env.MCLIENT_SECRET,
  timeout_ms: 60*1000,
  api_url: 'https://botsin.space/api/v1/',
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const postCheese = callback => {
  M.get('timelines/public', {local: process.env.LOCAL}).then(resp => {

    var sent = striptags(resp.data[0].content);
    curd(sent).then((x) => {
      
      if (x.length > 0)
      {
        var result = sent;
        x.forEach((x) => {
          result = result.replace(x[0], x[1]);
        });

        M.post('statuses', {status: result, in_reply_to_id: resp.data[0].id}, (e, d, r) => console.log(result));
      }
      callback();
    });
  });
}

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('cheese');
  res.end();
}).listen(process.env.PORT || 8080);


const doSomething = async () => {
  await sleep(600000);
  postCheese(doSomething);
}

console.log("Curdling Cheese...");


postCheese(() => console.log("it works"));
doSomething();
