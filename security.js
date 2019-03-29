'use strict';
class SJs {
    constructor(obj = null) {
        this.runData = obj;

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
         this.BreakPointBuffer = {};
         this.run();
         window.sjs = this;
         return this;
    }

    run() {
        const obj = this.runData;
        if(obj !== null){
            // Собираем список методов, которые будут доступны будут исполняться

            // Проверяем какой тип options
            const type = (Array.isArray(obj.options)) ? 'array' : typeof obj.options;
            
            switch (type){
                case 'object':
                    this.selectors = this.seletionsOfMethods(obj.options);
                    break;
                case 'undefined':
                    break;
                case 'array':
                    this.printErrorOfType('WRONG_TYPE_OPTIONS');
                    break;
                default:
                    this.printErrorOfType('WRONG_TYPE_OPTIONS');
                    break;
            }

            this.getSelectorKeys();
            this.getCSelectors();

            // Сбор элементов
            window.addEventListener('DOMContentLoaded', ()=>this.getElements());
            window.addEventListener('DOMContentLoaded', ()=> this.init());


            // Использовать пересчёт размеров на window.onresize

            if(obj.settings.windowResize === true){
                this.windowResizeToggle = false;
                this.windowResize();
            }

            // TODO запись истории

        }
    }
    
    // Инициализация. Назначение новых рамеров элементам
    init() {
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
                    this.printErrorOfType('METHOD_NOT_DEFINED', ob);
                }
            });
        });
    }


    // Делает отбор методов перечисленных в obj.options
    seletionsOfMethods(options) {
        let nSelectors = {};
        let consKey = Object.keys(options);
        consKey.map((k)=>{
            if(options[k] === true){
                let o = new Object();
                o[k] = this.selectors[k];
                nSelectors = Object.assign(nSelectors, o);
            }
        });
        return nSelectors;
    }

    // Возвращает ключи доступных методов
    getSelectorKeys() {
        this.selectorsKeys = Object.keys(this.selectors);
        return this;
    }

    // Возвращает объект (метод:селектор) без скобок
    getCSelectors() {
        this.cSelectors = new Object();
        this.cValues = new Array();
        this.selectorsKeys.forEach((n)=>
            {         
                this.cSelectors[n] = this.selectors[n].substring(1,this.selectors[n].length-1);
                this.cValues.push(this.cSelectors[n]);
            });   
        return this;
    }

    // Печатает ошибки
    printErrorOfType(errorType, text = undefined) {
        const thisErrors = {
            WRONG_TYPE_OPTIONS : 'Wrong type options variable. The Options variable must be an object.',
            METHOD_NOT_DEFINED : `Method ${text} not support`
        };
        console.error(thisErrors[errorType]);
    } 

    // Сбор элементов
    getElements() {
        this.sj = {};
        this.selectorsKeys.forEach(
            (n)=>{
                this.sj[n] = this.createDataModel(document.querySelectorAll(this.selectors[n]), n);   
            }
        );
    }

    // Создаём модель данных для приложения
    createDataModel(NodeList, method) {
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

    // Парсим пропорции элемента
    parseProportions(s) {
        let p = new Object();
        let pF = s.split(';');
        pF.map((i)=>{
        i = i.split(':');
        p[i[0]] = i[1];    
        });
        return p;
    }

    // Получает данные для ALO метода
    getAloStack(e){
        if(e.getAttribute(this.cSelectors.alo) === 'default'){
            return Array.from(e.children);  
        } else {
            return Array.from(e.querySelectorAll(e.getAttribute(this.cSelectors.alo)));
        }
    }

    // Получаем пропорции в данный элемент
    getProportions(s) {
        let test = parseFloat(s);
        if(isNaN(test)){
            
            if(s.substr(-1) === ';'){
                s = s.substring(0, s.length - 1)
            }
            
            let p = this.parseProportions(s);
            let size = window.outerWidth;
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

    // Получаем целевой элемент в зависимоти от метода и элемента
    getTargetByElementmethod(el, method) {
        switch(method){
            case 'hlt':
                return document.getElementById(el.getAttribute(this.tSelectors['t']));
                break;
            case 'wlt':
                return document.getElementById(el.getAttribute(this.tSelectors['t']));
                break;
            case 'hlP':
                return document.getElementById(el.getAttribute(this.tSelectors['ht']));
                break;
            case 'wlP':
                return document.getElementById(el.getAttribute(this.tSelectors['wt']));
                break;
            case 'ohlt':
                return document.getElementById(el.getAttribute(this.tSelectors['oht']));
                break;
            case 'owlt':
                return document.getElementById(el.getAttribute(this.tSelectors['owt']));
                break;
        }
    }

    // Получаем элеменеты у которых меняются пропорции от размера экрана
    getRubberElements(e, m, i) {
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

    //--------------------- METHODES

    /* Height like width */
    methodhlw(e, p, m) {
        if(p === 'u'){
            e.style.height = '';
            return;
        } 
        let v = e.offsetWidth * p;
        e.style.height = v + 'px';
    }

    /* Height like target */
    methodhlt(e, p, t, m) {
        if(p === 'u'){
            e.style.height = '';
            return;
        } 
        let th = t.offsetHeight;
        e.style.height = th * p + 'px';
    }

    /* Width like height */
    methodwlh(e, p, m) {
        if(p === 'u'){
            e.style.width = '';
            return;
        } 
        e.style.width = e.offsetHeight * p + 'px';
    }

    /* Width like target */
    methodwlt(e, p, t, m) {
        if(p === 'u'){
            e.style.width = '';
            return;
        } 
        let th = t.offsetWidth;
        e.style.width = th * p + 'px';
    }

    /* All like One */
    methodalo(s, m) {
        let max = Math.max.apply(null, s.map((e)=> { return e.offsetHeight }));
        s.map((e) => { e.style.height = max + 'px'; } );
    }


    // !--------------------- METHODES

    // ---------------------- WINDOW RESIZE

    windowResize() {
        window.addEventListener('resize', ()=>{       
            if(this.windowResizeToggle === false){
               this.windowResizeToggle = true;
                setTimeout(()=>{
                    this.updateBreakPointBuffer();
                    this.init();
                    this.windowResizeToggle = false;
                }, 100);
                
            }   
        }, false); 
    }

    updateBreakPointBuffer() {
        let k = Object.keys(this.BreakPointBuffer);
        k.map((e)=>{   
            let arr = this.BreakPointBuffer[e];
            arr.map((i, idx)=>{
                let newObj = new Object();
                let { elemet, method} = this.BreakPointBuffer[e][idx];            
                this.sj[e][i.index -1].proportions = this.getProportions(elemet.getAttribute(this.cSelectors[method]))
            });
        });
    }

    // !--------------------- WINDOW RESIZE

    loop(arr) {
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

}