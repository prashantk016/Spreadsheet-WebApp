import {all_rows,cellMap} from './table.js';
import {computeAll} from './formulas.js';
var del=document.getElementById("delete");
del.addEventListener('click',delete_rc);
/**
deletes every cell from a column
by iterating over tr
*/
function delete_col(col){
    
    let col_id=col.id;
    let pos=col_id.charCodeAt(0)-64;
    let td_obj=col.parentNode.parentNode.parentNode;
    
    Array.from(all_rows).forEach(function(item,index){
       let all_inputs=item.querySelectorAll("input");
        for(var i=pos;i<all_inputs.length;i++){
            console.log("i:"+i);
            if(pos==i)
            {   
                let toRemove=all_inputs[pos].parentNode;
                while(toRemove.tagName!="TD"){
                   toRemove=toRemove.parentNode;
               };
                
                if(cellMap.has(all_inputs[pos].id))
                    cellMap.delete(all_inputs[pos].id);
                
                item.removeChild(toRemove);
                
            }
            else{
           let old_id=all_inputs[i].id; 
            let new_id=String.fromCharCode(63+i)+index;
                if(index==0){
                    all_inputs[i].id=new_id.charAt(0);
                    let label=all_inputs[i].parentNode.querySelector("label");
                    label.innerHTML=new_id.charAt(0);
                    label.setAttribute("for",new_id.charAt(0));
                }
                else{
                    all_inputs[i].id=new_id;
                    var c=cellMap.get(old_id);
                    c.id=new_id;
                    cellMap.delete(old_id);
                    cellMap.set(new_id,c);
                }
        }
        }
        
    });
}
/**
deletes a selected row completely
*/
function delete_row(row){
    
    let row_id=row.id;
    let pos=row_id.charCodeAt(0);
    let tr_obj=row.parentNode.parentNode.parentNode;
    let tbody_obj=tr_obj.parentNode;
    for(let x in Array.from(tr_obj.childNodes)){
        if(cellMap.has(x.id))
            cellMap.delete(x.id);
    }
     tbody_obj.removeChild(tr_obj);
   
    for(let j=row_id;j<all_rows.length;j++){
        let all_inputs=all_rows[j].getElementsByTagName("input");
        for(let i=0;i<all_inputs.length;i++){
           let old_id=all_inputs[i].id; 
            let new_id=String.fromCharCode(64+parseInt(i))+j;
             if(i==0){
                all_inputs[i].id=j;
                let label=all_inputs[i].parentNode.querySelector("label");
                label.innerHTML=j;
                label.setAttribute("for",j);
            }
            else{
                all_inputs[i].id=new_id;
                var c=cellMap.get(old_id);
                c.id=new_id;
                cellMap.delete(old_id);
                cellMap.set(new_id,c);
            }
        } 
    }
    
}
/**
main delete row/column controller method
*/
function delete_rc(evt){
    var checkedValue = document.querySelectorAll('.delete:checked');
    
    if(checkedValue.length<1)
        alert("Select atleast one row or column");
    else if(checkedValue.length>1)
        alert("Select only one row or one column");
    else{
        
        if(parseFloat(checkedValue[0].id)){
            delete_row(checkedValue[0]);
        }
        else{
            delete_col(checkedValue[0]);
        }
        computeAll(); 
    }
    console.log("");
}

var del=document.getElementById("delete");
del.addEventListener('click',delete_rc);

export{delete_row,delete_col,delete_rc};
