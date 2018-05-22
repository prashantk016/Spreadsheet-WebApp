import {computeAll,operate,operators,getter,regex,numb_regx,alph_regx} from './formulas.js';
import {delete_rc} from './delete_row_column.js';
import {exportTableToCSV} from './exportToCSV.js';
export var cellMap=new Map();
document.getElementById("export").addEventListener('click',exportTableToCSV);

/**
class to store the value of each cell
*/
class CellDetails{
    constructor(id){
        this.id=id;
        this.value="";
        this.calc_value="";
        this.visited=false;
    }
}

var table=document.getElementById("main-table");
for (var i=0; i<5; i++) {
    var rows = table.insertRow(-1);
    for (var j=0; j<5; j++) {
        var alphabet = String.fromCharCode("A".charCodeAt(0)+j-1);
        var inputchild=document.createElement("input");
        inputchild.classList.add("textbox")
        var check_div=document.createElement("div");
        check_div.id="check-div";
        let check=document.createElement("input");
        let checkLabel=document.createElement("label");
      
        check.setAttribute("type","checkbox");
        check.id=i||alphabet;
          checkLabel.innerText=check.id;
        check.setAttribute("class","delete");
        checkLabel.setAttribute("for",check.id);
        check_div.appendChild(check);
        check_div.appendChild(checkLabel);
        
        inputchild.id=alphabet+i;
        rows.insertCell(-1).appendChild(i&&j ? addListerners(inputchild) : check_div);
    }
};
document.getElementById("@").style.display="none";
var row_add=document.getElementById("row-add"),
    row_sub=document.getElementById("row-sub"),
    col_add=document.getElementById("col-add"),
    col_sub=document.getElementById("col-sub"),
    all_rows=document.getElementsByTagName("tr"),
    all_cols=all_rows[0].getElementsByTagName("td");

export {all_rows};
/**
add a row to the end of the table
*/
row_add.addEventListener('click',function(evt){
let row=table.insertRow(-1);
    for (var j=0; j<all_cols.length; j++) {
        let alphabet = String.fromCharCode("A".charCodeAt(0)+j-1);
        
        var inputchild=document.createElement("input");
        inputchild.classList.add("textbox")
        var check_div=document.createElement("div");
        check_div.id="check-div";
        let check=document.createElement("input");
        let checkLabel=document.createElement("label");
      
        check.setAttribute("type","checkbox");
        check.id=(all_rows.length-1)||alphabet;
        checkLabel.innerText=check.id;
        check.setAttribute("class","delete");
        checkLabel.setAttribute("for",check.id);
        check_div.appendChild(check);
        check_div.appendChild(checkLabel);
        
         inputchild.id=alphabet+(all_rows.length-1);
        row.insertCell(-1).appendChild((all_rows.length-1)&&j ? addListerners(inputchild) : check_div);
        
    }
    
      computeAll();
});
/**
add a column to the end of the table
*/   
col_add.addEventListener('click',function(evt){

    let rows=document.querySelectorAll("tr");
      let alphabet = String.fromCharCode("A".charCodeAt(0)+all_cols.length-1);

    Array.from(all_rows).forEach(function(column,index){
        var inputchild=document.createElement("input");
        inputchild.classList.add("textbox")
        var check_div=document.createElement("div");
        check_div.id="check-div";
        let check=document.createElement("input");
        let checkLabel=document.createElement("label");

        check.setAttribute("type","checkbox");
        check.id=index||alphabet;
        checkLabel.innerText=check.id;
        check.setAttribute("class","delete");
        checkLabel.setAttribute("for",check.id);
        check_div.appendChild(check);
        check_div.appendChild(checkLabel);
        inputchild.id=alphabet+index ;

        column.insertCell(-1).appendChild(index&&(all_cols.length-1) ?addListerners(inputchild) : check_div); 
    });
     computeAll();
});
/**
deletes the last row from the table
*/ 
row_sub.addEventListener('click',function(evt){
   
    if(all_rows.length!==1){
    let tbody=document.querySelector("tbody");
    let lastChild=tbody.removeChild(all_rows.item(all_rows.length-1));
        cellMap.delete(lastChild.firstChild.id);
    }
    computeAll();
});
/**
deletes the last column from the table
*/ 
col_sub.addEventListener('click',function(evt){
    if(all_cols.length!==1){
      Array.from(all_rows).forEach(function(row,index){
          let lastChild=row.removeChild(row.lastChild);
          cellMap.delete(lastChild.firstChild.id);
  }) ;}
    computeAll();
});

function addListerners(i){
    addListernerToInputs(i);
    return i;
}
/**
adding listners to each cell
*/ 
function addListernerToInputs(elm){
    elm.addEventListener('focus',function(evt){
        evt.target.value=cellMap.get(this.id).value||"";
   });
    elm.addEventListener('blur',function(evt){
        cellMap.get(this.id).value=this.value;
        if(this.value.includes(this.id) || this.value.includes(this.id.toLowerCase()))
            evt.target.focus();
       
        computeAll();
    });
    
    cellMap.set(elm.id,new CellDetails(elm.id));
}
