//download the initial html

var $ = require('cheerio');
var request = require('request');

function gotHTML(err, resp, html) {
  if (err) return console.error(err);
  var parsedHTML = $.load(html);
  var locations = [];
  var softwarelist = {};
  parsedHTML('tr.headrow').first().children().each(function (i) {
    if (i>1) locations.push($(this).text().trim().replace("\r",""));
  });
  parsedHTML('tr:not(.headrow)').each(function(i) {
    var item = {
      "software": "",
      "version": "",
      "labs": {}
    };
    $(this).children().each(function (j) {
      var text = $(this).text().trim().replace("\r","");
      if (j==0) item.software = text;
      else if (j==1) item.version = text;
      else {
        item.labs[locations[j-2]] = text=="X" ? true : false;
      }
    });
    softwarelist[i] = item;
  });

  //now we load our database and input
  var Firebase = require('firebase');
  var db = new Firebase('https://iit-ots-software.firebaseio.com/');
  db.set(softwarelist);
}

request('http://www.iit.edu/ots/lab_software_master_new.php', gotHTML);
process.exit();
