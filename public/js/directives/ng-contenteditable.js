define(function() {
    
    function ngContentEditable(){
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // view -> model
                elm.bind('blur', function(event) {
                    if ((event && event.which === 13) || !event) {
                        scope.$apply(function() {
                            ctrl.$setViewValue(elm.html());
                        });
                    }
                });
                

                // model -> view
                ctrl.$render = function() {
                    elm.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elm.html());
            }
        }
    }
    
    return ngContentEditable;
});