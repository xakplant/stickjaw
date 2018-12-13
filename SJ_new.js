/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT (https://github.com/xakplant/stickjaw/blob/master/LICENSE)
 */
console.time('Парсинг');


var SJ = function(obj = null){
    
    
    
    
    this.selectors = {
       hlw : '[data-proportion-h]',
       wlh : '[data-proportion-w]',
       hlt : '[data-proportion-targer-h]',
       wlt : '[data-proportion-targer-w]',
       ohlt: '[data-proportion-targer-oh]',
       owlt: '[data-proportion-targer-ow]',
       alo : '[data-parent-alo]'
    };
    this.tSelectors = {
        t : 'data-proportion-target',
       ht : 'data-proportion-target-oh',
       wt : 'data-proportion-target-ow',
       oht: 'data-proportion-target-oh',
       owt: 'data-proportion-target-ow',
    };
    
    if(obj !== null){
        
        if (obj.options == undefined) {
            this.getSelectorKeys();
            this.getCSelectors();
            window.addEventListener('DOMContentLoaded', ()=> { this.getElements(); });
            window.addEventListener('load', ()=> { this.init(); });
        } else {
            let nSelectors = {};
            let consKey = Object.keys(obj.options);
            consKey.map((k)=>{
                if(obj.options[k] === true){
                    let o = new Object();
                    o[k] = this.selectors[k];
                    nSelectors = Object.assign(nSelectors, o);
                }
            });
            this.selectors = nSelectors;
            this.getSelectorKeys();
            this.getCSelectors();
            window.addEventListener('DOMContentLoaded', ()=> { this.getElements(); });
            window.addEventListener('load', ()=> { this.init(); });
        }
        
        if(obj.settings == undefined){
            
        } else {
            this.windowResizeToggle = false;
            this.windowResize();
        }

        
    }
    
    return this;
}
SJ.prototype.getSelectorKeys = function(){
    
    this.selectorsKeys = Object.keys(this.selectors);
    return this;
}
SJ.prototype.getCSelectors = function(){
    this.cSelectors = new Object();
    this.cValues = new Array();
    this.selectorsKeys.forEach((n)=>
        {         
            this.cSelectors[n] = this.selectors[n].substring(1,this.selectors[n].length-1);
            this.cValues.push(this.cSelectors[n]);
        });   
    return this;
}
SJ.prototype.getElements = function(){
    this.sj = {};
    this.selectorsKeys.forEach(
        (n)=>{
            this.sj[n] = this.createDataModel(document.querySelectorAll(this.selectors[n]), n);   
        }
    );
    return this;
}
SJ.prototype.createDataModel = function(NodeList, method){
   let dataModelArray = new Array();
    NodeList.forEach((e)=>{
        let o;
        if (method === 'alo') {
            o = {
                stack: this.getAloStack(e),
                context: e
            }
        } else {
           o = {
                elemet: e,
                method: method,
                proportion: e.getAttribute(this.cSelectors[method]),
                target: this.getTargetByElementmethod(e, method)
            } 
        }
        dataModelArray.push(o);
    });
    return dataModelArray;
}
SJ.prototype.getTargetByElementmethod = function(el, method){
    if(method === 'hlt' || method === 'wlt'){
        return document.getElementById(el.getAttribute(this.tSelectors['t']));
    }
    if(method === 'hlP'){
        return document.getElementById(el.getAttribute(this.tSelectors['ht']));
    }
    if(method === 'wlP'){
        return document.getElementById(el.getAttribute(this.tSelectors['wt']));
    }
    if(method === 'ohlt'){
        return document.getElementById(el.getAttribute(this.tSelectors['oht']));
    }
    if(method === 'owlt'){
        return document.getElementById(el.getAttribute(this.tSelectors['owt']));
    }
    return this;
}
SJ.prototype.getAloStack = function(e){
    if(e.getAttribute(this.cSelectors.alo) === 'default'){
        return Array.from(e.children);  
    }  
}
SJ.prototype.init = function(){
    let obj = Object.keys(this.sj);
    obj.map((ob)=>{
        this.sj[ob].map((o, i)=>{
            if(ob === 'ohlt' || ob === 'owlt'){
                ob = ob.replace(/^o/, '');
            }
            if('method' + ob in this){
                if (ob === 'hlt' || ob === 'wlt') {
                    this['method' + ob](o.elemet, o.proportion, o.target);
                } if (ob === 'alo' && ob !== 'hlw' && ob !== 'wlt') {
                    this['method' + ob](o.stack);
                }
                else {
                    this['method' + ob](o.elemet, o.proportion, o.target);
                }
                
            } else {
                console.error('method' + ob + ' not support');
            }
        });
    });
    return this;
}
/* Height like width */
SJ.prototype.methodhlw = function(e, p, m){
    let v = e.offsetWidth * p;
    e.style.height = v * p + 'px';
}
/* Height like target */
SJ.prototype.methodhlt = function(e, p, t, m){
    let th = t.offsetHeight;
    e.style.height = th * p + 'px';
}
/* Width like height */
SJ.prototype.methodwlh = function(e, p, m){
    e.style.width = e.offsetHeight * p + 'px';
}
/* Width like target */
SJ.prototype.methodwlt = function(e, p, t, m){
    let th = t.offsetWidth;
    e.style.width = th * p + 'px';
}
/* All like One */
SJ.prototype.methodalo = function(s, m){
    let max = Math.max.apply(null, s.map((e)=> { return e.offsetHeight }));
    s.map((e) => { e.style.height = max + 'px'; } );
}
SJ.prototype.windowResize = function(){
    window.addEventListener('resize', ()=>{       
        if(this.windowResizeToggle === false){
           this.windowResizeToggle = true;
            setTimeout(()=>{
                console.time('wr');
                this.init();
                this.windowResizeToggle = false;
                console.timeEnd('wr');
            }, 100);
            
        }   
    }, false);    
}
SJ.__proto__.loop = function(arr){
    let loop = new SJ();
    arr.map((e)=>{
       let {method: m, currentTarget: eId, proportion: p, target: tId} = e;
        if('method' + m in loop){
            if (m === 'hlw' || m === 'wlt') {
                    loop['method' + m](document.querySelector(eId), p, document.querySelector(tId));
                
            } else {
                    loop['method' + m](document.querySelector(eId), p, document.querySelector(tId));
            }
        }
    });
}
/* Element, Method, Value */
/*SJ.prototype.sjEventListener = function(e, m, v){
    let SjElementEvent = new CustomEvent('SjElementEvent', { detail: {
        element: e,
        methode: m,
        value: v
    } });
    e.addEventListener('SjElementEvent', ()=>{ console.log(SjElementEvent); });
    e.dispatchEvent(SjElementEvent);
}*/
 

console.timeEnd('Парсинг');

