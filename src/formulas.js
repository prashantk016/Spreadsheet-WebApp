import {cellMap} from './table.js';
export const regex = /=(SUM|SUB|DIV|MUL|MIN|MAX)\(([A-z][0-9]+):([A-z][0-9]+)\)$/i;
export const alph_regx=new RegExp('([a-zA-z])','g');
export const numb_regx=new RegExp('([0-9]+)','g');
export const alph_regx1=/=([A-z][0-9])([*+-\/]([A-z][0-9]))+$/i;

/**
computes the value of each cell and stores them
*/
var computeAll = function() {
    var inputs=Array.from(document.getElementsByTagName("input"));
    for (let [ key, val ] of cellMap.entries()){
        val.visited=false;
    }
    inputs.forEach(function(elm) {
        try { 
            if(cellMap.get(elm.id).visited)
                elm.value=cellMap.get(elm.id).calc_value;
            else
                elm.value = getter(elm.id); 
        } catch(e) {
                console.log("Exception in computeAll: "+ e.message);
            } 
    });
};

/**
helper function to perform arithmethic operation
*/
var operators = {
    '+' : function(a, b) { return a + b; },
    '-' : function(a, b) { return a - b; },
    '*' : function(a, b) { return a * b; },
    '/' : function(a, b) { return a / b; },
    'min':function(a,b){return a>b?b:a},
    'max':function(a,b){return a>b?a:b},
};

/**
computes the value of each cell
if a valid formula has entered
*/
var getter = function(elmid) {
        let value = cellMap.get(elmid).value|| "";
        let result;
        if (regex.test(value)) {
        
            value=value.toUpperCase();
            let range=/([A-z][0-9]+):([A-z][0-9]+)/.exec(value);
            let operation=value.match(/(SUM|SUB|DIV|MUL|MIN|MAX)/)[0];
            let alph=value.substr(5).match(alph_regx);
            let numb=value.match(numb_regx).map(Number);
            alph.sort();
            numb.sort();
            switch(operation){
                case 'SUM':
                    console.log("in sum:");
                result=operate(alph,numb,operators['+']);
                    break;
                case 'SUB':
                    console.log("in sub:");
                   result= operate(alph,numb,operators['-']);
                    break;
                case 'DIV':
                    console.log("in div:");
                result=operate(alph,numb,operators['/']);
                    break;
                case 'MUL':
                    console.log("in mul:");
                result=operate(alph,numb,operators['*']);
                    break;
                     case 'MIN':
                    console.log("in mul:");
                result=operate(alph,numb,operators['min']);
                    break;
                     case 'MAX':
                    console.log("in mul:");
                result=operate(alph,numb,operators['max']);
                    break;
                default:
                    result="something wrong in getter switch";
                    break;
            }
          
            cellMap.get(elmid).calc_value=result;
            cellMap.get(elmid).visited=true;
            return result;
        } else if(alph_regx1.test(value)){

        result=eval_algebric(value.substr(1).toUpperCase());
            cellMap.get(elmid).calc_value=result;
            cellMap.get(elmid).visited=true;
            return result;
    
        }else { 
            let result= /^\d+\.\d+$/.test(value)? parseFloat(value):value;
            cellMap.get(elmid).calc_value=result;
            cellMap.get(elmid).visited=true;
            return result;
        }
    };
/**
performs the operation over a range of cells
*/
var operate=function(alph,numb,op){
    
    try{
    var a;
    if(!cellMap.get(alph[0]+numb[0]).visited)
        a=getter(alph[0]+numb[0]);
    else
        a=cellMap.get(alph[0]+numb[0]).calc_value;
  
    for(let m=alph[0];m.charCodeAt(0)<=alph[1].charCodeAt(0); m=String.fromCharCode(m.charCodeAt(0)+1)){
      let n=numb[0];
        do{
            let value;
             if(!cellMap.get(m+n).visited)
                value=getter(m+n);
            else
                value=cellMap.get(m+n).calc_value;
            if(value===null)
                 return "Invalid";
            
            if(/^\d+\.\d+$/.test(value) || /^-{0,1}\d+$/.test(value) || value===""){
                n++;
                console.log(a);
        
                if(value==="" || alph[0]+numb[0]==m+(n-1))
                    continue;
            
                a=op(parseFloat(a),parseFloat(value));
           
            }
            else{
                return "Invalid";
            }
        }while(n<=numb[1]);
    }
   
    return a;
    }
    catch(e){
        console.log("Invalid Range");
        return "Invalid Range";
    }
}

/**
evalutes the algebaric formula entered
evaluation is done in the order operands and operators are entered
*/
function eval_algebric(exp){
    let operands=exp.match(/[A-z][0-9]/ig)
    let ops=exp.match(/[+\-*\/]/g);
    do{
        let a=operands.shift();
        let b=operands.shift();
        if(cellMap.has(b))
        b=cellMap.get(b).calc_value;
        if(isNaN(a)){
            a=cellMap.get(a).calc_value;
            if(/^\d+\.\d+$/.test(a) || /^-{0,1}\d+$/.test(a)){
             a=parseFloat(a);
         }else
             return "Invalid Cell"
        }
        
            if(/^\d+\.\d+$/.test(b) || /^-{0,1}\d+$/.test(b)){
             b=parseFloat(b);
         }else
             return "Invalid Cell"
        
        let o=ops.shift();
        let operation=operators[o];
        operands.unshift(operation(a,b));
    }while(ops.length>0)
    return operands[0]  ;
}

export{computeAll,operate,operators,getter/*,delete_rc*/};