define(function(){
        
    function todoSrvFactory($rootScope, $http){
        
        return {
            getTodoLists : function(){
                return $http({method: 'GET', url: '/api/list'});
            },
            addTodoList : function(listName){
                return $http(
                    {
                        method: 'POST', 
                        url: '/api/list', 
                        data : {name : listName } 
                    });
            },
            getTodoList : function(id){
                return $http(
                    {
                       method: 'GET',
                       url: '/api/list/'+id,
                    });
            },
            addTodoListItem : function(item){
                return $http(
                    {
                       method : 'POST',
                       url : '/api/item',
                       data : item
                    });
            }, 
            deleteList : function(listId){
                return $http({
                    method:'DELETE',
                    url : '/api/list/' + listId
                });
            },
            updateItem : function(item, listId){
                var body = {
                    item : item,
                    id : listId
                }
                return $http(
                    {
                       method: 'PUT',
                       url : '/api/item',
                       data: body
                    });
            },
            deleteItem : function(itemId, listId){
                return $http({
                    method:'DELETE',
                    url : '/api/item/' + listId + '/' + itemId
                });
            }
        };
    }

    todoSrvFactory.$inject = ['$rootScope', '$http'];
    
    return todoSrvFactory;

});