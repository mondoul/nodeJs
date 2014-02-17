
var todoList = require('./api/todolists');
var home = require('./home');

exports.register = function(app){
    
    app.get('/', home.index);
    
    app.get('/api/list', todoList.allList);
    app.post('/api/list', todoList.addList);   
    app.del('/api/list/:id', todoList.deleteList);
    app.get('/api/list/:id', todoList.getList);
    
    app.put('/api/item', todoList.updateItem);
    app.post('/api/item', todoList.addItem);
    app.del('/api/item', todoList.deleteItem);
    
};