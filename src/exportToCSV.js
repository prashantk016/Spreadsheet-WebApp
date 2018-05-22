function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {type: "text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
/**
Travers every cell and fetches its value to form a comma 
separated string
*/
function exportTableToCSV() {
    var csv = [];
    var rows = document.querySelectorAll("#main-table tr");
  
    for (var i = 1; i < rows.length; i++) {
        var row=[], cols = rows[i].querySelectorAll("td");
        var input = rows[i].getElementsByTagName("input");
        for (var j = 1; j < input.length; j++) {
            row.push(input[j].value); 
        }
        csv.push(row.join(","));          
    }
    downloadCSV(csv.join("\n"), "data.csv"); 
}
export{exportTableToCSV};
