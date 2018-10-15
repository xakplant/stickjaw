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

const SJ_OHLT_SELECTOR = '[data-proportion-targer-oh]';
const SJ_OWLT_SELECTOR = '[data-proportion-targer-ow]';
const SJ_PROPORTION_TARGET_OH = '[data-proportion-target-oh]';
const SJ_PROPORTION_TARGET_OW = '[data-proportion-target-ow]';

const SJ_ALO_SELECTOR = '[data-parent-alo]';
var SJ_targetId, SJ_targetHeight, SJ_targetWidth, SJ_arr = [];
var SJ = function(Object){
    
    
    
    this.settings = Object;
    
    this.hlwRawSelector = SJ_HLW_SELECTOR;
    this.wlhRawSelector = SJ_WLH_SELECTOR;
    this.hltRawSelector = SJ_HLT_SELECTOR;
    this.wltRawSelector = SJ_WLT_SELECTOR;
    this.rawProportionTarget = SJ_PROPORTION_TARGET;
    
    this.ohltRawSelector = SJ_OHLT_SELECTOR;
    this.rawProportionTargetOH = SJ_PROPORTION_TARGET_OH;
    
    this.owltRawSelector = SJ_OWLT_SELECTOR;
    this.rawProportionTargetOW = SJ_PROPORTION_TARGET_OW;
    

    
    this.proportionTarget = this.rawProportionTarget.substring(1,this.rawProportionTarget.length-1);
    
    this.proportionTargetOH = this.rawProportionTargetOH.substring(1,this.rawProportionTargetOH.length-1);
    this.proportionTargetOW = this.rawProportionTargetOW.substring(1,this.rawProportionTargetOW.length-1);
    
    
    this.aloRawSelector = SJ_ALO_SELECTOR;
    this.switch = false;
    
    this.hystory = [];
    
    if(Object != undefined){
        if(Object.settings.writeHystory !== undefined && Object.settings.writeHystory === true){
         this.resizeWindow();
        }
    }
    
    this.Init(this.settings);
    
    if(Object != undefined){
        if(Object.settings.windowResize !== undefined && Object.settings.windowResize === true){
         this.resizeWindow();
        }
    }
    
    return this;
 
}


SJ.prototype.Init = function(obj){

    if(obj != undefined){
       
        if(obj.options != undefined){
            
            var keys = Object.keys(obj.options);
            

        
            SJ = this;
            
            for(var i = 0; i < keys.length; i += 1){
                    l = keys[i];

                if(obj.options[l] === true){
                   SJ[l]();
               }


            } 
        } else {
            this.hlw();
            this.wlh();
            this.hlt();
            this.wlt();
            this.ohlt();
            this.owlt();
            this.alo();
        }

       
                
    }/* Первый if */
    else{
        this.hlw();
        this.wlh();
        this.hlt();
        this.wlt();
        this.alo();
        this.ohlt();
        this.owlt();
    }/* Первый else */
    
}
SJ.prototype.hlwMethodElement = function(element, proportions) {
    element.style.height = element.offsetWidth * proportions + 'px';
}
SJ.prototype.hlwMethod = function(elementId, proportions) {
    if(elementId !== null){
        var element = document.getElementById(elementId);
        this.hlwMethodElement(element, proportions);
    }
}




SJ.prototype.hlw = function(){
    
    this.selector = this.hlwRawSelector.substring(1,this.hlwRawSelector.length-1);
    this.list = document.querySelectorAll(this.hlwRawSelector);
    this.event = 'hlw';

    this.length = this.list.length;
    for(var i=0; i < this.length; i += 1){        
        this.dadgerSelector = this.wlhRawSelector.substring(1,this.wlhRawSelector.length-1)
        this.list[i].getAttribute(this.dadgerSelector) != undefined ? console.error('Нельзя использовать ' + this.dadgerSelector) :  this.list[i].style.height = this.list[i].offsetWidth * this.list[i].getAttribute(this.selector) + 'px';
        
        this.writeHystory(this.list[i], this.event, this.list[i].getAttribute(this.selector), null);
        
    }
    
    return this;

}


SJ.prototype.wlhMethodElement = function(element, proportions) {
    element.style.width = element.offsetHeight * proportions + 'px';
}
SJ.prototype.wlhMethod = function(elementId, proportions) {
    if(elementId !== null){
        var element = document.getElementById(elementId);
        this.wlhMethodElement(element, proportions);
    }
}



SJ.prototype.wlh = function(){
    this.selector = this.wlhRawSelector.substring(1,this.wlhRawSelector.length-1);
    this.list = document.querySelectorAll(this.wlhRawSelector);
    this.event = 'wlh';
    
    this.length = this.list.length;
    for(var i=0; i < this.length; i += 1){       
        this.dadgerSelector = this.hlwRawSelector.substring(1,this.hlwRawSelector.length-1) 
        this.list[i].getAttribute(this.dadgerSelector) != undefined ? console.error('Нельзя использовать ' + this.dadgerSelector) : this.list[i].style.width = this.list[i].offsetHeight * this.list[i].getAttribute(this.selector) + 'px';
        
        this.writeHystory(this.list[i], this.event, this.list[i].getAttribute(this.selector), null);
    }
    
    return this;

}

SJ.prototype.hltMethod = function(curentElement, proportions, targetElement) {
    element = document.getElementById(curentElement);
    targetHeight = document.getElementById(targetElement).offsetHeight;
    element.style.height = targetHeight * proportions + 'px';
}
SJ.prototype.hlt = function(){
    this.selector = this.hltRawSelector.substring(1,this.hltRawSelector.length-1);
    this.list = document.querySelectorAll(this.hltRawSelector);
    this.event = 'hlt';
    
    this.length = this.list.length;
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute(this.proportionTarget);        
        SJ_targetHeight = document.querySelector('#' + SJ_targetId).offsetHeight;
        this.list[i].style.height = SJ_targetHeight * this.list[i].getAttribute(this.selector) + 'px';
        
        this.writeHystory(this.list[i], this.event, this.list[i].getAttribute(this.selector), document.querySelector('#' + SJ_targetId));
        
    }
    return this;
}



SJ.prototype.wltMethod = function(curentElement, proportions, targetElement) {
    element = document.getElementById(curentElement);
    targetHeight = document.getElementById(targetElement).offsetWidth;
    element.style.width = targetHeight * proportions + 'px';
}
SJ.prototype.wlt = function(){
    this.selector = this.wltRawSelector.substring(1,this.wltRawSelector.length-1);
    this.list = document.querySelectorAll(this.wltRawSelector);
    this.event = 'wlt';
    
    this.length = this.list.length;
    
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute(this.proportionTarget);
        SJ_targetWidth = document.querySelector('#' + SJ_targetId).offsetWidth;
        this.list[i].style.width = SJ_targetWidth * this.list[i].getAttribute(this.selector) + 'px';
        
        this.writeHystory(this.list[i], this.event, this.list[i].getAttribute(this.selector), document.querySelector('#' + SJ_targetId));
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
                
                SJ.writeHystory(s[i], 'alo', max + 'px', null);
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
SJ.prototype.ohlt = function() {
    this.selector = this.ohltRawSelector.substring(1,this.ohltRawSelector.length-1);
    this.list = document.querySelectorAll(this.ohltRawSelector);
    this.event = 'ohlt'
    
    this.length = this.list.length;
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute(this.proportionTargetOH);        
        SJ_targetHeight = document.querySelector('#' + SJ_targetId).offsetHeight;
        this.list[i].style.height = SJ_targetHeight * this.list[i].getAttribute(this.selector) + 'px';
        
        this.writeHystory(this.list[i], this.event, this.list[i].getAttribute(this.selector), document.querySelector('#' + SJ_targetId));
        
    }
    return this;
}

SJ.prototype.owlt = function(){
    this.selector = this.owltRawSelector.substring(1,this.owltRawSelector.length-1);
    this.list = document.querySelectorAll(this.owltRawSelector);
    this.event = 'owtl'
    
    this.length = this.list.length;
    
    for(var i=0; i < this.length; i += 1){
        SJ_targetId = this.list[i].getAttribute(this.proportionTargetOW);
        SJ_targetWidth = document.querySelector('#' + SJ_targetId).offsetWidth;
        this.list[i].style.width = SJ_targetWidth * this.list[i].getAttribute(this.selector) + 'px';
        
        this.writeHystory(this.list[i], this.event, this.list[i].getAttribute(this.selector), document.querySelector('#' + SJ_targetId));
    }
    return this
}
SJ.prototype.loop = function(object){
    if(object != null){
        object.map(function(element){
            var strFn = element.method + 'Method';
            SJ[strFn](element.currentTarget, element.proportion, element.target);
        });
        
    } else {
       this.Init(this.settings); 
    }
    
}


// Settings section
SJ.prototype.resizeWindow = function(){

    SJ_windowObject = this.settings;
    function SJ_windowListenFunction(){
        SJ.Init(SJ_windowObject);
    }    
    window.addEventListener('resize', SJ_windowListenFunction, SJ, SJ_windowObject);
}


SJ.prototype.writeHystory = function(sj_element, sj_methode, sj_proportion, sj_target){
    
    if(this.settings.settings.writeHystory !== undefined && this.settings.settings.writeHystory === true){
        this.hystory.push(
            {
                element: sj_element,
                methode: sj_methode,
                proportion: sj_proportion,
                target: sj_target
            }
        );
    }
}
