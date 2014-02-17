define([
  'angular',
  'controllers',
  'services',
  'directives',
  'modules/underscore-module',
  'modules/ui.event',
  'animate'
], function (angular) {
  'use strict';

  var todoApp = angular.module('todoApp', [
    'todoApp.controllers',
    'todoApp.services', 
    'todoApp.directives', 
    'underscore',
    'ui.event',
    'ngAnimate'
  ]);

  return todoApp;
});