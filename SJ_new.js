/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT (https://github.com/xakplant/stickjaw/blob/master/LICENSE)
 */
console.time('SJ');

var SJ = function(Object){
    this.selectors = {
       hlw : '[data-proportion-h]',
       wlh : '[data-proportion-w]',
       hlt : '[data-proportion-targer-h]',
       wlt : '[data-proportion-targer-w]',
       alo : '[data-parent-alo]'
    };
    this.tSelectors = {
        t : 'data-proportion-target',
       ht : '[data-proportion-target-oh]',
       wt : '[data-proportion-target-ow]',
    };
    
    this.getSelectorKeys();
    this.getCSelectors();
    this.getElements();
    
    this.init();
    this.windowResize();
    console.log(this);
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
SJ.prototype.createDataModel = function(NodeList, Methode){
   let dataModelArray = new Array();
    NodeList.forEach((e)=>{
        
        let o;
        if(Methode === 'alo'){
            o = {
                stack: this.getAloStack(e),
                context: e
            }
        } else {
           o = {
                elemet: e,
                methode: Methode,
                proportion: e.getAttribute(this.cSelectors[Methode]),
                target: this.getTargetByElementMethode(e, Methode)
            } 
        }
        
        
        
        
        dataModelArray.push(o);
    });
    return dataModelArray;
}
SJ.prototype.getTargetByElementMethode = function(el, Methode){
    if(Methode === 'hlt' || Methode === 'wlt'){
        return document.getElementById(el.getAttribute(this.tSelectors['t']));
    }
    if(Methode === 'hlP'){
        return document.getElementById(el.getAttribute(this.tSelectors['ht']));
    }
    if(Methode === 'wlP'){
        return document.getElementById(el.getAttribute(this.tSelectors['wt']));
    }
}
SJ.prototype.getAloStack = function(e){   
    return Array.from(e.children);   
}
SJ.prototype.init = function(){
    let obj = Object.keys(this.sj);
    obj.map((ob)=>{
        this.sj[ob].map((o, i)=>{
            if('methode' + ob in this){
                if (ob === 'hlw' || ob === 'wlt') {
                    this['methode' + ob](o.elemet, o.proportion, o.target);
                } if (ob === 'alo' && ob !== 'hlw' && ob !== 'wlt') {
                    this['methode' + ob](o.stack);
                }
                else {
                    this['methode' + ob](o.elemet, o.proportion, o.target);
                }
                
            } else {
                console.error('methode' + ob + ' not support');
            }
        });
    });
}
/* Height like width */
SJ.prototype.methodehlw = function(e, p){
    e.style.height = e.offsetWidth * p + 'px';
}
/* Height like target */
SJ.prototype.methodehlt = function(e, p, t){
    let th = t.offsetHeight;
    e.style.height = th * p + 'px';
}
/* Height like target */
SJ.prototype.methodewlt = function(e, p, t){
    let th = t.offsetWidth;
    e.style.width = th * p + 'px';
}
/* Width like height */
SJ.prototype.methodewlh = function(e, p){
    e.style.width = e.offsetHeight * p + 'px';
}
/* All in One */
SJ.prototype.methodealo = function(s){
    let max = Math.max.apply(null, s.map((e)=> { return e.offsetHeight }));
    s.map((e) => { e.style.height = max + 'px'; } );
}
SJ.prototype.windowResize = function(){
    window.addEventListener('resize', ()=>{this.init();}, false);    
}



console.timeEnd('SJ');

