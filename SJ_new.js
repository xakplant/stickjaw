/*!
 * Stickjaw v1.0.0 (https://xakplant.ru/stickjaw)
 * Copyright 2018 Boris Cherepanov
 * Copyright 2018 Xakplant.ru
 * Licensed under MIT (https://github.com/xakplant/stickjaw/blob/master/LICENSE)
 */

var SJ = function(Object){
    this.selectors = {
       hlw : '[data-proportion-h]',
       wlh : '[data-proportion-w]',
       hlt : '[data-proportion-targer-h]',
       wlt : '[data-proportion-targer-w]',
       /*
       alo : '[data-parent-alo]'*/
    };
    this.tSelectors = {
        t : 'data-proportion-target',
       ht : '[data-proportion-target-oh]',
       wt : '[data-proportion-target-ow]',
    };
    
    this.getSelectorKeys();
    this.getCSelectors();
    this.getElements();
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
        let o = {
            elemet: e,
            methode: Methode,
            proportion: e.getAttribute(this.cSelectors[Methode]),
            target: this.getTargetByElementMethode(e, Methode)
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
