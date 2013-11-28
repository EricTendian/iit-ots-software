//download the initial html

var $ = require('cheerio');
var request = require('request');

function gotHTML(err, resp, html) {
  if (err) return console.error(err);
  var parsedHTML = $.load(html);
  var headings = [];
  var software = [];
  parsedHTML('tr.headrow').first().children().each(function () {
    headings.push($(this).text().trim().replace("\r",""));
  });
  console.log("-----------------------------");
  parsedHTML('tr:not(.headrow)').each(function() {
    $(this).children().each(function (i) {
      console.log($(this).text().trim().replace("\r",""));
      if (i==0) software.push();
      else if (i==1) software.push();
      else software.push();
    });
  });
}

var domain = 'http://www.iit.edu/ots/lab_software_master_new.php';
request(domain, gotHTML);

//now we load our database and input
//var Firebase = require('firebase');
//var db = new Firebase('https://iit-ots-software.firebaseio.com/');
//db.set(object);
