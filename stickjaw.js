/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT ()
 */
function stickjawXakpl(){
    $('[data-proportion-h]').height(function(){
        var proportion = $(this).attr('data-proportion-h');
        var width = $(this).outerWidth();
        var height = width * proportion;
        return height;

    });
    $('[data-proportion-w]').width(function(){
        var proportion = $(this).attr('data-proportion-w');
        var height = $(this).outerHeight();
        var width = height * proportion;
        return width;
    });

    $('[data-proportion-targer-h]').height(function(){
        var proportion = $(this).attr('data-proportion-targer-h');
        var tragetID = $(this).attr('data-proportion-target');
        var tHeight = $('#'+tragetID+'').outerHeight();
        var height = tHeight * proportion;
        return height;
    });
    $('[data-proportion-targer-w]').width(function(){
        var proportion = $(this).attr('data-proportion-targer-w');
        var tragetID = $(this).attr('data-proportion-target');
        var tWidth = $('#'+tragetID+'').outerWidth();
        var width = tWidth * proportion;
        return width;
    });
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
    var s = document.querySelectorAll('[data-parent-alo="yes"] > *'), arr = [], max = 0;
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

}());