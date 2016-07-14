var express = require('express');

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
storage.add('shits');

var app = express();
app.use(express.static('public'));

app.get('/items/', function(req, res) {
    res.json(storage.items);
});


//app.post
app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});
//app.put
app.put('/items', jsonParser, function(req, res){
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.edit(req.body.name);
    res.status(201).json(item);
});
//app.delete
app.delete('/items', jsonParser, function(req, res){
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.delete(req.body.name);
    res.status(201).json(item);
});



app.listen(process.env.PORT || 8080, function (){
	console.log('servers is running on port' + 8080)
});