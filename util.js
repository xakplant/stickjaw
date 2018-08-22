/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT (https://github.com/xakplant/stickjaw/blob/master/LICENSE)
 */
const SJ_HLW_SELECTOR = '[data-proportion-h]';
const SJ_WLH_SELECTOR = '[data-proportion-w]';
const SJ_HLT_SELECTOR = '[data-proportion-targer-h]';
const SJ_WLT_SELECTOR = '[data-proportion-targer-w]';
const SJ_PROPORTION_TARGET = '[data-proportion-target]';
const SJ_ALO_SELECTOR = '[data-parent-alo]';
var SJ_targetId, SJ_targetHeight, SJ_targetWidth, SJ_arr = [];
var SJ = function(Object){
    
    this.settings = Object;
    
    this.hlwRawSelector = SJ_HLW_SELECTOR;
    this.wlhRawSelector = SJ_WLH_SELECTOR;
    this.hltRawSelector = SJ_HLT_SELECTOR;
    this.wltRawSelector = SJ_WLT_SELECTOR;
    this.rawProportionTarget = SJ_PROPORTION_TARGET;
    this.proportionTarget = this.rawProportionTarget.substring(1,this.rawProportionTarget.length-1);
    this.aloRawSelector = SJ_ALO_SELECTOR;
    this.switch = false;
    
    this.Init(this.settings);
    
    if(Object != undefined){
        if(Object.settings.windowResize !== undefined && Object.settings.windowResize === true){
         this.resizeWindow();
        }
    }
    
    
   
    
}

SJ.prototype.Init = function(obj){
    if(obj != undefined){
        console.log('SJ options mode');
        

       var keys = Object.keys(obj.options);
        
        SJ = this;
        for(var i = 0; i < keys.length; i += 1){
            l = keys[i];
            SJ[l]();
        }
                
    }/* Первый if */
    else{
        this.hlw();
        this.wlh();
        this.hlt();
        this.wlt();
        this.alo();
    }/* Первый else */
}

SJ.prototype.hlw = function(){
    
    this.selector = this.hlwRawSelector.substring(1,this.hlwRawSelector.length-1);
    this.list = document.querySelectorAll(this.hlwRawSelector);


    this.length = this.list.length;
    for(var i=0; i < this.length; i += 1){
        if(this.list[i].switch !== true){
            this.list[i].style.height = this.list[i].offsetWidth * this.list[i].getAttribute(this.selector) + 'px';
            this.list[i].switch = true;
        } else {
            console.log(new Error('ошибка в Stickjaw hlw из-за вызова ' + this.event + ' в элементе: '));
            console.log(this.list[i]);
        }
    }
    this.event = 'hlw';
    return this;

}
SJ.prototype.wlh = function(){
    this.selector = this.wlhRawSelector.substring(1,this.wlhRawSelector.length-1);
    this.list = document.querySelectorAll(this.wlhRawSelector);

    this.length = this.list.length;
    for(var i=0; i < this.length; i += 1){
        if(this.list[i].switch !== true){
            this.list[i].style.width = this.list[i].offsetHeight * this.list[i].getAttribute(this.selector) + 'px';
            this.list[i].switch = true;
        } else {
            console.log(this.list[i]);
            console.log(new Error('ошибка в Stickjaw wlh из-за вызова ' + this.event + ' в элементе: '));
            
        }
    }
    this.event = 'wlh';
    return this;

}
SJ.prototype.hlt = function(){
    this.selector = this.hltRawSelector.substring(1,this.hltRawSelector.length-1);
    this.list = document.querySelectorAll(this.hltRawSelector);
    this.length = this.list.length;
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute(this.proportionTarget);        
        SJ_targetHeight = document.querySelector('#' + SJ_targetId).offsetHeight;
        this.list[i].style.height = SJ_targetHeight * this.list[i].getAttribute(this.selector) + 'px';
    }
    return this;
}
SJ.prototype.wlt = function(){
    this.selector = this.wltRawSelector.substring(1,this.wltRawSelector.length-1);
    this.list = document.querySelectorAll(this.wltRawSelector);
    this.length = this.list.length;
    
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute(this.proportionTarget);
        SJ_targetWidth = document.querySelector('#' + SJ_targetId).offsetWidth;
        this.list[i].style.width = SJ_targetWidth * this.list[i].getAttribute(this.selector) + 'px';
    }
    return this
}
SJ.prototype.alo = function(){
    this.selector = this.aloRawSelector.substring(1,this.aloRawSelector.length-1);
    this.list = document.querySelectorAll(this.aloRawSelector);
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
               var s = document.querySelectorAll( this.aloRawSelector +' > ' + childSelectorString), max = 0;
               fethChildStickjew(s); 
           }
        } 
    return this;
}
SJ.prototype.resizeWindow = function(){
    
    var SJ = this;
    SJ_windowObject = this.settings;
    function SJ_windowListenFunction(){
        SJ.Init(SJ_windowObject);
    }    
    window.addEventListener('resize', SJ_windowListenFunction, SJ, SJ_windowObject);
}