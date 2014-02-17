define([
    'angular',
    './ng-enter',
    './draggable',
    './droppable'
], function (angular, ngEnter, draggable, droppable) {
    return angular.module('todoApp.directives', [])
                  .directive('ngEnter', ngEnter)
                  .directive('draggable', draggable)
                  .directive('droppable', droppable);
});