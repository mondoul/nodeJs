var repo = require('../../domain/repository/todoRepository');

exports.allList = function(req, res, next){
    repo.getAllTodoLists(function(err, data) { 
        if (err) return next(err);
        res.send(data);
    });
};

exports.getList = function(req, res, next){
    var listId = req.params.id;
    
    repo.getTodoList(listId, function(err, data){
        if (err) return next(err);
        res.send(data);
    });
};

exports.deleteList = function(req, res, next){
  var listId = req.params.id;
  repo.deleteTodoList(listId, function(err, data){
      if (err) return next(err);
      res.send('done');    
  });
};

exports.addList = function(req, res, next){
    var listName = req.body.name;
    repo.addTodoList(listName, function(err, data){
        if (err) return next(err);
        res.send(data);
    });
};

exports.addItem = function(req, res, next){
    var newItem = req.body;
    repo.addItem(newItem, function(err, data){
        if (err) return next(err);
        res.send(data);
    });
};

exports.updateItem = function(req, res, next){
    var modifiedItem = req.body.item;
    var listId = req.body.id;
    repo.updateItem(listId, modifiedItem, function(err, data){
        if (err) return next(err);
        res.send(data);
    });
};

exports.deleteItem = function(req, res, next) {
    var itemId = req.body.itemId;
    var listId = req.body.listId;
    repo.deleteItem(listId, itemId, function(err, data) {
        if (err) return next(err);
        res.send('done');  
    });
};

exports.toggleItemStatus = function(req, res, next){
    var item = req.body.item;
    var listId = req.body.id;
    repo.update(listId, item, function(err, data){
        if (err) return next(err);
        res.send(data);    
    });
    
};