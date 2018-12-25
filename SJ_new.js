/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT (https://github.com/xakplant/stickjaw/blob/master/LICENSE)
 */
console.time('Парсинг');

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


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
    
    this.BreakPointBuffer = new Object();
    
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
    console.log(this);
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
                proportions: this.getProportions(e.getAttribute(this.cSelectors[method])),
                target: this.getTargetByElementmethod(e, method)
            } 
        }
        let i = dataModelArray.push(o);
        if(e.getAttribute(this.cSelectors[method]).includes('@')){
               this.getRubberElements(e, method, i);
        }
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
                    let p = o.proportions
                    this['method' + ob](o.elemet, p, o.target);
                } if (ob === 'alo' && ob !== 'hlw' && ob !== 'wlt') {
                    this['method' + ob](o.stack);
                }
                else {
                    this['method' + ob](o.elemet, o.proportions, o.target);
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
    e.style.height = v + 'px';
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
                this.updateBreakPointBuffer();
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
SJ.prototype.getProportions = function(s){
    let test = parseFloat(s);
    if(isNaN(test)){
        
        if(s.substr(-1) === ';'){
            console.log(s.substr(-1));
            s = s.substring(0, s.length - 1)
        }
        
        let p = this.parseProportions(s);
        let size = window.innerWidth;
        let kp = Object.keys(p);
        kp = kp.map((k, i, a)=>{
            return k.replace('@', '');
        }); 
        
        function psort(a, b) {
          a = parseFloat(a);
          b = parseFloat(b);
          if (a > b)return 1;
          if (a < b)return -1;
        }
        kp = kp.sort(psort);   
        kp = kp.filter( k => k < size);
        kp = kp[kp.length - 1];
    
        
        return p['@'+kp];
    } else {
        return test;
    }
}
SJ.prototype.parseProportions = function(s){
    let p = new Object();
    let pF = s.split(';');
    pF.map((i)=>{
       i = i.split(':');
       p[i[0]] = i[1];    
    });
    return p;
    
}
SJ.prototype.getRubberElements = function(e, m, i){
    let o;
    o = {
        elemet: e,
        method: m,
        proportions: this.getProportions(e.getAttribute(this.cSelectors[m])),
        target: this.getTargetByElementmethod(e, m),
        index: i
    };
    if(Array.isArray(this.BreakPointBuffer[m])){
        this.BreakPointBuffer[m].push(o);
    } else {
        this.BreakPointBuffer[m] = new Array();
        this.BreakPointBuffer[m].push(o);
    }
    
}
SJ.prototype.updateBreakPointBuffer = function(){
    let k = Object.keys(this.BreakPointBuffer);
    k.map((e)=>{   
        let arr = this.BreakPointBuffer[e];
        arr.map((i)=>{
            let newObj = new Object();
            let { elemet, method} = this.BreakPointBuffer[e][i.index -1]
            this.sj[e][i.index -1].proportions = this.getProportions(elemet.getAttribute(this.cSelectors[method]))
        });
    });
}
 

console.timeEnd('Парсинг');

