document.querySelectorAll(".popup").forEach(function(element) {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            var popupWindow = this.nextElementSibling;
            popupWindow.style.display = "block";
        });
    });
    
    document.querySelectorAll(".closeButton").forEach(function(element) {
        element.addEventListener("click", function() {
            var popupWindow = this.parentElement;
            popupWindow.style.display = "none";
        });
    });

var scheduleArray = ["weekdate", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
fetch("/scheduleEmployee")
.then(response=>{
    if (!response.ok) {
      throw new Error('Network response was bad');
    }
    return response.json();
  })
.then(data => {
console.log(data); 
	for(i in data){
	scheduleArray.push([data[i].weekStart, data[i].sunday, data[i].monday, data[i].tuesday, data[i].wednesday, data[i].thursday, data[i].friday, data[i].saturday]); 
         console.log(scheduleArray); 
}
 console.log(scheduleArray); 

}).catch(error =>{
	console.log(error); 
}); 

console.log(scheduleArray); 



function showSchedule(array) {
    var table = document.createElement('table');

    array.forEach(function(rowData) {
        var row = document.createElement('tr');
        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    var schDiv = document.getElementById('schDiv');
    schDiv.appendChild(table);
}

//fake just for testing DELETE LATER
var scheduleArray = [
    ["weekdate", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["9", "10", "11", "12", "13", "14", "15", "16"]
];

//callfunction
showSchedule(scheduleArray);