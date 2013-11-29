//download the initial html

var $ = require('cheerio');
var request = require('request');
var fs = require('fs');
var Firebase = require('firebase');

function gotHTML(err, resp, html) {
  if (err) return console.error(err);
  var parsedHTML = $.load(html);
  var locations = [];
  var software = {};
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
    software[i] = item;
  });
  write(software,"software.json","iit-ots-software");
}

function write(jsonobj, filename, firebase) {
  fs.writeFile(filename, JSON.stringify(jsonobj, null, 4), function(err) {
    if (err) console.log(err);
  });
  var db = new Firebase('https://'+firebase+'.firebaseio.com/');
  db.set(jsonobj);
  console.log("Written successfully.");
}

request('http://www.iit.edu/ots/lab_software_master_new.php', gotHTML);
