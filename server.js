var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var compression = require("compression");
var morgan      = require("morgan");
var PORT        = Number( process.env.PORT || 4000 );
var Counters    = require("./lib/Counters");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(compression());

function sendFile(name) {
  return function(req, res) {
    res.sendFile(__dirname + "/static/" + name);
  };
}

//app.get("/", sendFile("index.html"));
//app.get("/sitepoint-test.1.0.0.js", sendFile("sitepoint-test.1.0.0.js"));
//app.get("/sitepoint-test.1.0.0.css", sendFile("sitepoint-test.1.0.0.css"));

// [json] GET /api/v1/counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3}
// => ]
app.get("/api/v1/counters", function(req, res) {
  res.json(Counters.all())
});

// [json] POST {title: "bob"} /api/v1/counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.post("/api/v1/counter", function(req, res) {
  res.json(Counters.create(req.body.title));
})

// [json] DELETE {id: "asdf"} /api/v1/counter
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.delete("/api/v1/counter", function(req, res) {
  res.json(Counters.delete(req.body.id));
});

// [json] POST {id: "qwer"} /api/v1/counter/inc
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/inc", function(req, res) {
  res.json(Counters.inc(req.body.id));
});

// [json] POST {id: "zxcv"} /api/v1/counter/dec
// => [
// =>   {id: "zxcv", title: "steve", count: 2},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/dec", function(req, res) {
  res.json(Counters.dec(req.body.id));
});

app.get("*", sendFile("index.html"));
app.head("*", sendFile("index.html"));

app.listen(PORT, console.log.bind(null, "PORT: " + PORT));
