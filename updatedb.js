//download the initial html
var html = "";
http.get("http://www.iit.edu/ots/lab_software_master_new.php", function(res) {
  res.on('data', function(data) {
    html = data;
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
  process.exit(1);
});

//pass the html into cheerio for parsing
var cheerio = require('cheerio'),
    $ = cheerio.load(html);

//now we load our database and input
var Firebase = require('firebase');
var db = new Firebase('https://iit-ots-software.firebaseio.com/');
//db.set(object);
