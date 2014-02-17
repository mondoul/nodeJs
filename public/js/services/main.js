define(
    ['angular', './todoSrv'],
function(angular, todoSrvFactory) {
    return angular.module('todoApp.services', [])
                  .service('todoSrv', todoSrvFactory);
});