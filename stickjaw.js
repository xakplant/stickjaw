/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT (https://github.com/xakplant/stickjaw/blob/master/LICENSE)
 */
function stickjawXakpl(){                
    (function(){           
        var element = document.querySelectorAll('[data-proportion-h]');
        for(var i=0; i < element.length; i += 1){
            var elementProportion = element[i].getAttribute('data-proportion-h')
            var elementWidth = element[i].offsetWidth;
            element[i].style.height = elementProportion * elementWidth + 'px';
        }
    }());

    (function(){           
        var element = document.querySelectorAll('[data-proportion-w]');
        for(var i=0; i < element.length; i += 1){
            var elementProportion = element[i].getAttribute('data-proportion-w');
            var elementHeight = element[i].offsetHeight;
            element[i].style.width = elementProportion * elementHeight + 'px';
        }
    }());
    (function(){
        var element = document.querySelectorAll('[data-proportion-targer-h]');
        for(var i=0; i<element.length; i += 1){
            var elementProportion = element[i].getAttribute('data-proportion-targer-h');
            var targetId = element[i].getAttribute('data-proportion-target');
            var targetHeight = document.querySelector('#' + targetId).offsetHeight;
            element[i].style.height = targetHeight * elementProportion + 'px';
        }                     
    }());
    (function(){
        var element = document.querySelectorAll('[data-proportion-targer-w]');
        for(var i=0; i<element.length; i += 1){
            var elementProportion = element[i].getAttribute('data-proportion-targer-w');
            var targetId = element[i].getAttribute('data-proportion-target');
            var targetWidth = document.querySelector('#' + targetId).offsetWidth;
            element[i].style.width = targetWidth * elementProportion + 'px';
        }                     
    }());
}
stickjawXakpl();
(function(){
var target = document.body;
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
        stickjawXakpl();
  });    
});
var config = { attributes: true, childList: true, characterData: true, subtree: true };
observer.observe(target, config);
}());

/* Все боки родителями одного размера */
(function(){ 
    function fethChildStickjew(element){
       var s = element;
       for(var i=0; i < s.length; i += 1){
          arr[i] = s[i].offsetHeight;
        }
        function getMaxOfArray(numArray) {
          return Math.max.apply(null, numArray);
        }

        max = getMaxOfArray(arr);
        for(var i=0; i<s.length; i += 1){
              s[i].style.height = max + 'px';
        }
   }
               
   var sjParent = document.querySelectorAll('[data-parent-alo]');
   for(var j = 0; j < sjParent.length; j += 1){
       if(sjParent[j].getAttribute('data-parent-alo') === 'default'){
           var s = document.querySelectorAll('[data-parent-alo="default"] > *'), arr = [], max = 0;
           fethChildStickjew(s);                 
       }
       else{
           var childSelectorString = sjParent[j].getAttribute('data-parent-alo');
           var s = document.querySelectorAll('[data-parent-alo] > ' + childSelectorString), arr = [], max = 0;
           fethChildStickjew(s); 
       }
   }

}());