define(function() {
    
    return function() {
        return {
            link : function(scope, element){
                 var el = element[0];
                 
                 el.draggable = true;
                 
                 function isDragging(dragging){
                  scope.$apply(function(scope){
                      scope.$parent.toggleDrag();
                  });
                }
                 
                 el.addEventListener('dragstart',
                     function(e){
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('Text', this.id);
                        this.classList.add('drag');
                        isDragging(true);
                        return false;
                     },
                     false);
                 
                 el.addEventListener('dragend',
                     function(e){
                         this.classList.remove('drag');
                         isDragging(false);
                         return false;
                     },
                     false);
                }
        };
    };
});