var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

app.use(jsonParser);

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');


app.use(express.static('public'));

app.get('/items/', function(req, res) {
    res.json(storage.items);
});

//app post
app.post('/items', jsonParser, function (req, res) {

    if (req.body) {
        var item = storage.add(req.body.name);
        res.status(201).json(item);
    } else {
        res.sendStatus(400);
    }
});
//app.put
app.put('/items/:id', function (req, res) {

    var id = parseInt(req.params.id);
    var name = req.body.name;

    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id === id) {
            storage.items[i].name = name;
            res.status(201).json(storage.items);
        }
    }
});
//app.delete
app.delete('/items/:id', function (req, res) {

    var id = parseInt(req.params.id);
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id === id) {
            storage.items.splice(i, 1);
            res.status(201).json(storage.items);
        }
    }
});

app.listen(process.env.PORT || 8080, function (){
	console.log('servers is running on port' + 8080)
});