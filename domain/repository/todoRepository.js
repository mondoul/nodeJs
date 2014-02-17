var mongo = require('mongoskin');
var db = mongo.db(process.env.IP + ':27017/todoDb', {safe : true});
var todoListCollection = db.collection('todoListCollection');

exports.getAllTodoLists = function(onResults){
    todoListCollection.find().toArray(onResults);
};

exports.getTodoList = function(id, onResults){
    todoListCollection.findOne({"_id": db.ObjectID.createFromHexString(id)}, onResults);
};

exports.addTodoList = function(name, onResults){
    todoListCollection.insert({ "name": name }, onResults);
};

exports.deleteTodoList = function(listId, onResult) {
    todoListCollection.remove({"_id" : db.ObjectID.createFromHexString(listId)}, onResult);
};

exports.addItem = function (item, onResult){
    if (!item) {
        onResult('Elément invalide');
    }
    var itemId = db.ObjectID();
    var newItem = {_id : itemId, text: item.text, checked:item.checked};
    todoListCollection.update(
        {_id: db.ObjectID.createFromHexString(item.listId)},
        {$push : {items : newItem}}, 
        function(err, data){
            if (err) throw err;
            onResult(err, newItem);
        });
};

exports.updateItem = function(listId, item, onResult){
    var updatedItem = {_id : db.ObjectID.createFromHexString(item._id), text: item.text, checked:item.checked};
    todoListCollection.update(
        {_id: db.ObjectID.createFromHexString(listId), "items._id":updatedItem._id},
        { 
            $set: { "items.$.text" : item.text, 
                    "items.$.checked" : item.checked}
        }, function(err, data){
             if (err) throw err;
            onResult(err, updatedItem);
        });
};

exports.toggleItem = function(listId, item, onResult){
    var updatedItem = {_id : db.ObjectID.createFromHexString(item.id), text: item.text, checked:item.checked};
    todoListCollection.update(
        {_id: db.ObjectID.createFromHexString(listId), "items._id":db.ObjectID.createFromHexString(item.id)},
        { 
            $set: { "item.checked" : item.checked}
        }, function(err, data){
             if (err) throw err;
            onResult(err, updatedItem);
        }
    );
};