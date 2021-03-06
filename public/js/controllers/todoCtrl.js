define(['jquery'], function($){
    
    function todoController ($scope, todoSrv, _){
        
        $scope.allLists = [];
        $scope.listItems = [];
        $scope.newList = '';
        $scope.newItemStatus = false;
        $scope.newItemText = '';
        $scope.errorMsg = '';
        $scope.currentListId = '';
        $scope.dragging = false;
        
        $scope.$watch(function() { return $scope.currentListId; },
        function(newId, oldId){
            if (newId && newId != oldId){
                $scope.showList(newId);
            }
        });
        
        $scope.toggleDrag = function()
        {
            $scope.dragging = !$scope.dragging;
        }
        
        var init= function(){
            todoSrv.getTodoLists()
                .success(function(data, status){
                    $scope.allLists = data;
                    $scope.errorMsg = '';
                    if (data && data.length > 0) {
                        $scope.currentListId = _.first(data)._id;
                    }
                })
                .error(function(data, status){
                    $scope.infoMsg = '';
                    $scope.errorMsg = data;
                });
        };
    
        $scope.addList = function(){
            todoSrv.addTodoList($scope.newList)
                .success(function(data, status) {
                    if (data && data.length == 1) {
                        $scope.allLists.push(data[0]);
                        $scope.currentListId = data[0]._id;
                    }
                    $scope.errorMsg = '';
                    $scope.newList = '';
                    $scope.noList = false;
                })
                .error(function(data, status) {
                    $scope.errorMsg = data;
                });
        };
        
        $scope.changeListView = function(listId){
            $scope.currentListId = listId;
        }
        
        $scope.showList = function(id){
            todoSrv.getTodoList(id)
                .success(function(data) {
                    if (data && data.items && data.items.length > 0) {
                        $scope.listItems = data.items;
                    }
                    else
                    {
                        $scope.listItems = [];
                    }
                    $scope.errorMsg = '';
                })
                .error(function(data, status){
                   $scope.errorMsg = data; 
                });
        };
        
        $scope.addItem = function(){
          var todoListItem = {
            text : $scope.newItemText,
            checked : $scope.newItemStatus,
            listId : $scope.currentListId
          };
          todoSrv.addTodoListItem(todoListItem)
                .success(function(data, status){
                    $scope.listItems.push(data);
                    $scope.newItemText = '';
                    $scope.newItemStatus = false;
                })
                .error(function(data, status){
                    $scope.errorMsg = data; 
                });
        };
        
        $scope.saveItem = function(itemId){
            var updatedItem = _.find($scope.listItems, function(it){ return it._id == itemId; });
            todoSrv.updateItem(updatedItem, $scope.currentListId)
                .success(function(data, status){
                     $scope.errorMsg = '';
                }).error(function(data, status){
                        $scope.errorMsg = data; 
                });
        };
        
        $scope.deleteItem = function(itemId){
          todoSrv.deleteItem(itemId, $scope.currentListId)
            .success(function(data, status){
                $scope.listItems = _.reject($scope.listItems, function(it){ return it._id == itemId;});
                $scope.errorMsg = '';
            }).error(function(data, status){
                $scope.errorMsg = data;
            });
        };
        
        $scope.handleDrop = function(listId){
            //if (confirm('Deleting the list will delete its items. Are you sure ?')) {
            todoSrv.deleteList(listId) 
                .success(function(data, status){
                    $scope.allLists = _.reject($scope.allLists, function(it){ return it._id == listId;});
                    if ($scope.allLists.length > 0) $scope.currentListId = _.first($scope.allLists)._id;
                    else $scope.listItems = [];
                    $scope.errorMsg = '';
                })
                .error(function(data, status){
                    $scope.errorMsg = data;
                });
            //}
        };
        
        init();
    }
    
    todoController.$inject = ['$scope', 'todoSrv', '_'];
    
    return todoController;
    
});