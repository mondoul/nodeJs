define([
    'angular',
    './ng-enter'
], function (angular, ngEnter) {
    return angular.module('todoApp.directives', [])
                  .directive('ngEnter', ngEnter);
});