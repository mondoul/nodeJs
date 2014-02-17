define([
    'angular',
    './todoCtrl'
], function (angular, todoController) {
    return angular.module('todoApp.controllers', ['todoApp.services'])
                  .controller('todoCtrl', todoController);
});