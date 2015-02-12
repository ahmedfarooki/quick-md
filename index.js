var marked = require("marked"),
    http   = require("http"),
    exec   = require("child_process").exec,
    fs     = require("fs");

var port = 3000;

//var file = 'README.md';
var file = '../node-markitondemand/README.md';

var style   = fs.readFileSync('style.css', 'utf8');
var content = fs.readFileSync(file, 'utf8');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var tableStart =          '<div class="table">'; 
tableStart = tableStart + '  <div class="head"> ' + file + ' </div>';
tableStart = tableStart + '  <div class="body">';

var tableEnd   =          '  </div>'; 
tableEnd = tableEnd     + '</div>';

var app = http.createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(style);
  res.write(tableStart);
  res.end(marked(content));
  res.write(tableEnd);
  process.exit(0);
});

app.listen(port);
console.log("Running on port: " + port);

exec('open http://localhost:' + port + '/', function(err, stdout) {
  if (err) {
    console.error("Something bad happened");
  }
  console.log(stdout);
});

