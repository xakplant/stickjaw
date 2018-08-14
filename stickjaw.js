/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT (https://github.com/xakplant/stickjaw/blob/master/LICENSE)
 */
var Stickjaw, SJ_targetId, SJ_targetHeight, SJ_targetWidth,  SJ_arr = [], SJ_h, SJ_w, SJ_hlt, SJ_wlt, SJ_alo;

Stickjaw = function(selector){
    this.rawSelector = selector;
    this.selector = this.rawSelector.substring(1,this.rawSelector.length-1);
    this.list = document.querySelectorAll(this.rawSelector);
    this.length = this.list.length;
}
Stickjaw.prototype.hlw = function(){
    for(var i=0; i < this.length; i += 1){
        this.list[i].style.height = this.list[i].offsetWidth * this.list[i].getAttribute(this.selector) + 'px';
    }
    this.event = 'hlw';
    return this;
}
Stickjaw.prototype.wlh = function(){
    for(var i=0; i < this.length; i += 1){
        this.list[i].style.width = this.list[i].offsetHeight * this.list[i].getAttribute(this.selector) + 'px';
    }
    this.event = 'wlh';
    return this;
}
Stickjaw.prototype.hlt = function(){
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute('data-proportion-target');
        SJ_targetHeight = document.querySelector('#' + SJ_targetId).offsetHeight;
        this.list[i].style.height = SJ_targetHeight * this.list[i].getAttribute(this.selector) + 'px';
    }
    return this;
}
Stickjaw.prototype.wlt = function(){
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute('data-proportion-target');
        SJ_targetWidth = document.querySelector('#' + SJ_targetId).offsetWidth;
        this.list[i].style.width = SJ_targetWidth * this.list[i].getAttribute(this.selector) + 'px';
    }
    return this;
}
Stickjaw.prototype.fetchChildMaxStyleHeigh = function(selectors){
    var s = selectors;
   for(var i=0; i < s.length; i += 1){
      SJ_arr[i] = s[i].offsetHeight;
    }
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }

    max = getMaxOfArray(arr);
    for(var i=0; i<s.length; i += 1){
          s[i].style.height = max + 'px';
    }
}
Stickjaw.prototype.alo = function(){
    function fethChildStickjew(element){
           var s = element;
           for(var i=0; i < s.length; i += 1){
              SJ_arr[i] = s[i].offsetHeight;
            }
            function getMaxOfArray(numArray) {
              return Math.max.apply(null, numArray);
            }

            max = getMaxOfArray(SJ_arr);
            for(var i=0; i<s.length; i += 1){
                  s[i].style.height = max + 'px';
            }
       }
        var sjParent = this.list;
        for(var j = 0; j < sjParent.length; j += 1){
           if(sjParent[j].getAttribute(this.selector) === 'default'){
               var s = document.querySelectorAll('['+this.selector+'="default"] > *'), max = 0;
               fethChildStickjew(s);                 
           }
           else{
               var childSelectorString = sjParent[j].getAttribute(this.selector);
               var s = document.querySelectorAll( this.rawSelector +' > ' + childSelectorString), max = 0;
               fethChildStickjew(s); 
           }
        } 
    return this;
}
Stickjaw.prototype.resizeWindow = function(){
    
    var SJ_windowObject = this;    
    function SJ_windowListenFunction(){
        SJ_windowObject[SJ_windowObject.event]();
    }    
    window.addEventListener('resize', SJ_windowListenFunction, SJ_windowObject);
}



SJ_h = new Stickjaw('[data-proportion-h]');
SJ_h.hlw().resizeWindow();

SJ_w = new Stickjaw('[data-proportion-w]');
SJ_w.wlh();


SJ_hlt = new Stickjaw('[data-proportion-targer-h]');
SJ_hlt.hlt();

SJ_wlt = new Stickjaw('[data-proportion-targer-w]');
SJ_wlt.wlt();

SJ_alo = new Stickjaw('[data-parent-alo]'),
SJ_alo.alo();