var parse = require("@textlint/markdown-to-ast").parse;
var walk = require('walk');
var path = require('path');
var fs = require('fs');

var walker;
var options = {};

walker = walk.walk(path.join(__dirname, '../src'), options);

walker.on('file', function (root, fileStats, next) {
  const fileFullPath = path.join(root, fileStats.name);
  fs.readFile(fileFullPath, 'utf8', function (err, content) {
    var AST = parse(content);
    console.log("🚀 ~ file: directory.js:13 ~ fileFullPath", AST)

    next();
  });
});

walker.on('errors', function (root, nodeStatsArray, next) {
  next();
});

walker.on('end', function () {
  console.log('all done');
});