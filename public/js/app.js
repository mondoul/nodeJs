define([
  'angular',
  'controllers',
  'services',
  'directives',
  'modules/underscore-module',
  'modules/ui.event'
], function (angular) {
  'use strict';

  var todoApp = angular.module('todoApp', [
    'todoApp.controllers',
    'todoApp.services', 
    'todoApp.directives', 
    'underscore',
    'ui.event'
  ]);

  return todoApp;
});