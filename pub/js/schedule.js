let empData = [];
let requestsOff = [];
let opArray = []; 
let hoursPerDay = []; 

const getEmployees = fetch('/getEmployees') //server side done
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was bad');
    }
    return response.json();
  }).then(data => {
    for(i in data) {
        //["Bradley", "Bossert", 0, "2024-01-04", 5, 600, 600, 600, 600, 700, 1000, null, 2200, 20000, 20000, 1600, 1600, 1700, null],
        empData.push([data[i].fname, data[i].lname, data[i].fullTime, data[i].startDate, data[i].daysPerWeek, convertTime2(data[i].monStart), convertTime2(data[i].tueStart), convertTime2(data[i].wedStart), convertTime2(data[i].thuStart), convertTime2(data[i].friStart), convertTime2(data[i].satStart), convertTime2(data[i].sunStart), convertTime2(data[i].monEnd), convertTime2(data[i].tueEnd), convertTime2(data[i].wedEnd), convertTime2(data[i].thuEnd), convertTime2(data[i].friEnd), convertTime2(data[i].satEnd), convertTime2(data[i].sunEnd), data[i].email]);
    }
  })
  .catch(error => {
    console.error('Error fetching employees:', error);
  });

const getManagementOff = fetch("/managementTimeOffFnameLname")
  .then(response => {
    if(!response.ok){
        throw new Error("not okay");
    } 
    return response.json()
    })
  .then(data => {
    if(!data || Object.keys(data).length === 0){
        console.log("Hello!");
        return; 
    }
    for(i in data){
    requestsOff.push([data[i].fname, data[i].lname, data[i].date]);
    }
    console.log("HI!"); 
  })
  .catch(error => {
    console.error('Error fetching employee time off:', error);
  });


const getOperatingTimes = fetch('/getOperatingTimes') //serverside done
  .then(response => response.json())
  .then(time => {
           opArray.push(time.sundayOpen, time.sundayClose, time.mondayOpen, time.mondayClose, time.tuesdayOpen, time.tuesdayClose, time.wednesdayOpen, time.wednesdayClose, time.thursdayOpen, time.thursdayClose, time.fridayOpen, time.fridayClose, time.saturdayOpen, time.saturdayClose);
           console.log("HI!"); 
  })
  .catch(error => {
    console.error('Error fetching operating times:', error);
  });


function scheduleMe(){
//fill the arrays up 
Promise.all([getEmployees,getManagementOff,getOperatingTimes])
.then(()=>{
    console.log("All Arrays FILLED!"); 
    //part two

    let shiftsArray = [];
    var fullTime = [];
    var partTime = []; 
    var fullTimeShifts = [];
    var partTimeShifts = [];
    var unAssignedShifts = [];
    sortSenior(empData);
    sortSeniorShifts(empData); 
    var buildschedule = [
        ['First Name', 'Last Name' , 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Email'],
        ['', '', '', '', '', '', '', '', '','']
    ];
    var finalSchedule = [];
    addDates();
    shiftsArray = createShifts(document.getElementById('monHours').value, opArray[2], opArray[3]).sort((a, b) => a[0] - b[0]);
    schedule("Monday", buildschedule[1][3]);
    
    shiftsArray = createShifts(document.getElementById('tuesHours').value, opArray[2], opArray[3]).sort((a, b) => a[0] - b[0]);
    schedule("Tuesday", buildschedule[1][4]);

    shiftsArray = createShifts(document.getElementById('wedHours').value, opArray[4], opArray[5]).sort((a, b) => a[0] - b[0]);
    console.log(schedule("Wednesday", buildschedule[1][5]));

    shiftsArray = createShifts(document.getElementById('thurHours').value, opArray[6], opArray[7]).sort((a, b) => a[0] - b[0]);
    console.log(schedule("Thursday", buildschedule[1][6]));
   
    shiftsArray = createShifts(document.getElementById('friHours').value, opArray[8], opArray[9]).sort((a, b) => a[0] - b[0]);
    console.log(schedule("Friday", buildschedule[1][7]));
    
    shiftsArray = createShifts(document.getElementById('satHours').value, opArray[10], opArray[11]).sort((a, b) => a[0] - b[0]);
    console.log(schedule("Saturday", buildschedule[1][8]));
   
    shiftsArray = createShifts(document.getElementById('sunHours').value, opArray[0], opArray[1]).sort((a, b) => a[0] - b[0]);
 
    finalSchedule = schedule("Sunday", buildschedule[1][1]);
    
    createSchedule();

    //do a fetch? to send back to the db 
    //creating an obj array for json 
    let arraySend = [];
    for(i in finalSchedule){
        let oby = { email: finalSchedule[i][9], sunday: finalSchedule[i][2], monday: finalSchedule[i][3], tuesday: finalSchedule[i][4], wednesday: finalSchedule[i][5], thursday: finalSchedule[i][6], friday: finalSchedule[i][7], saturday: finalSchedule[i][8], weekStart: document.getElementById('sunDate').value};
      arraySend.push(oby);
    }

    //do a fetch?
    fetch("/postUserSchedule", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arraySend)
    });
    


//most senior employees are at the top of array
 function sortSenior(eArray){
    eArray.sort(function(f,l){
        var fDate = new Date(f[3]);
        var lDate = new Date(l[3]);
        return fDate-lDate;  //compares fDate and lDate
    });
    for (var i = 0; i < eArray.length; i++) {
        if (eArray[i][2] == 0) {
            fullTime.push(eArray[i]);
        } else if (eArray[i][2] == 1) {
            partTime.push(eArray[i]);
        }
    }
}

function sortSeniorShifts(eArray){
    eArray.sort(function(f,l){
        var fDate = new Date(f[3]);
        var lDate = new Date(l[3]);
        return fDate-lDate;  //compares fDate and lDate
    });
    for (var i = 0; i < eArray.length; i++) {
        if (eArray[i][2] == 0) {
            fullTimeShifts.push([eArray[i][0], eArray[i][1], "", "", "", "", "", "", "", eArray[i][19]]);
        } else if (eArray[i][2] == 1) {
            partTimeShifts.push([eArray[i][0], eArray[i][1], "", "", "", "", "", "", "", eArray[i][19]]);
        }
    }
}

function schedule(day, curDate){
    unAssignedShifts = [];
    var indexStart;
    var indexEnd;
    var indexShift;
    if(day === "Monday"){
        indexStart = 5; 
        indexEnd = 12;
        indexShift = 3; 
    }
    if(day === "Tuesday"){
        indexStart = 6; 
        indexEnd = 13;
        indexShift = 4;  
    }
    if(day === "Wednesday"){
        indexStart = 7; 
        indexEnd = 14;
        indexShift = 5;  
    }
    if(day === "Thursday"){
        indexStart = 8; 
        indexEnd = 15;
        indexShift = 6;  
    }
    if(day === "Friday"){
        indexStart = 9; 
        indexEnd = 16;
        indexShift = 7;  
    }
    if(day === "Saturday"){
        indexStart = 10; 
        indexEnd = 17;
        indexShift = 8;  
    }
    if(day === "Sunday"){
        indexStart = 11; 
        indexEnd = 18;
        indexShift = 2;  
    }

    //unshift pushes to the front of a array
    var shiftLength;
    for (let i = 0; i < shiftsArray.length; i++){
        let assigned = false;
        shiftLength = shiftsArray[i][1] - shiftsArray[i][0];
        if (shiftLength == 800 && !assigned){
            for (let j = 0; j < fullTime.length; j++){
                if (fullTime[j][4] >= 0 && fullTime[j][indexStart] <= shiftsArray[i][0] && fullTime[j][indexEnd] >= shiftsArray[i][1] && checkRoff(curDate, fullTime[j][0], fullTime[j][1]) === true){
                    //add sift to schedule for that employee for that day
                    if(fullTimeShifts[j][indexShift] == ""){
                    fullTimeShifts[j][indexShift] = convertTime(shiftsArray[i][0]) + "-" + convertTime(shiftsArray[i][1]);
                    fullTime[j][4]--;
                    assigned = true;
                    break;
                    }
                }
            }
        }
        
        if (!assigned) {
        for (let j = 0; j < partTime.length; j++){
            if (partTime[j][4] > 0 && partTime[j][indexStart] <= shiftsArray[i][0] && partTime[j][indexEnd] >= shiftsArray[i][1] && checkRoff(curDate, partTime[j][0], partTime[j][1]) === true){
                //add sift to schedule for that employee for that day
                if(partTimeShifts[j][indexShift] == ""){
                partTimeShifts[j][indexShift] = convertTime(shiftsArray[i][0]) + "-" + convertTime(shiftsArray[i][1]);
                partTime[j][4]--;
                assigned = true;
                break;
                }
            }
        }
    }
    if(!assigned){
        unAssignedShifts.push([curDate, convertTime(shiftsArray[i][0]) + "-" + convertTime(shiftsArray[i][1])]);
    }
    }

    var finalSchedule = [];
    for (let i = 0; i < fullTimeShifts.length; i++){
        finalSchedule.push(fullTimeShifts[i]);
    }
    for (let i = 0; i < partTimeShifts.length; i++){
        finalSchedule.push(partTimeShifts[i]);
    }
   
    return finalSchedule;
}
function makeNewDate(date){
    let dateNew = ""; 
    const d = new Date(date); 
    const day = d.getDate(); 
    const month = d.getMonth(); 
    const year = d.getFullYear();
    dateNew = year + "-" + month + "-" + day;
    return new Date(dateNew);
  }
function checkRoff(dates, fname, lname) {
    //need to check for DATE objects????
    for (var i = 0; i < requestsOff.length; i++) {
        if (Date(dates) === makeNewDate(requestsOff[i][2]) && fname === requestsOff[i][0] && lname === requestsOff[i][1]) {
            return false;
        }
    }
    return true;
}

function addDates() {
    var inputDate = new Date(document.getElementById("sunDate").value);
    for (var i = 1; i <= 7; i++) {
        var currentDate = new Date(inputDate);
        currentDate.setDate(inputDate.getDate() + i);
        buildschedule[1][i+1] = (currentDate.getMonth() + 1) + '-' + (currentDate.getDate()) + '-' + (currentDate.getFullYear());
    }
    console.log(buildschedule);
}

function createRow(rowData) {
    var row = document.createElement('tr');
    rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.contentEditable = true;
        cell.textContent = cellData;
        row.appendChild(cell);
    });
    return row;
}

function createSchedule() {
    // Remove existing table if it exists
    var existingTable = document.getElementById('mSchedule');
    if (existingTable) {
        existingTable.remove();
    }

    //add dates to the schedule
    //addDates();

    //create new table for next schedule
    var table = document.createElement('table');
    table.id = 'mSchedule';

    //add rows to the table
    buildschedule.forEach(function(rowData) {
        table.appendChild(createRow(rowData));
    });

    //add the table to the div
    var scheduleDiv = document.getElementById('scheduleDiv');
    if (scheduleDiv) {
        scheduleDiv.appendChild(table);
    }

    //add employees schedule to the table
    finalSchedule.forEach(function(employee) {
        var newRowData = employee;
        table.appendChild(createRow(newRowData));
    });

    var lineBreak = document.createElement('br');

    //add buttons to the div
    scheduleDiv.appendChild(lineBreak);
    scheduleDiv.appendChild(lineBreak);
}

function updateSchedule() {
    var rows = document.getElementById("mSchedule").getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            buildschedule[i][j] = cells[j].textContent;
        }
    }
    console.log(buildschedule);
}
 
}).catch(err => {
    return console.log(err); 
});

}


//Converting Time Functions
//If from BD Use converTime2 
function convertTime2(time){
    if(time === undefined || time === null){
        return null; 
    }
    //06:00:00 remove last bit, remove leading 0 and remove all : 
    time = time.replace(/^0/g, ''); //removes the 0 if leading
    time = time.replace(/\:/g, ''); //removes the : 
    time = time.replace(/00$/g, ''); //removes the seconds at the end 
    return time; 
}
//Convert Time from military to regular
//doesnt use minutes because shifts always start on hour and took out : because algorithm for shifts doesnt use :
function convertTime(time){
    var hours = time/100;
    var end = "am";
    if(hours > 12 && (hours - 12 != 12)){
        hours = hours -12;
        end = "pm";
    }else if (hours == 12){
        end = "pm";
    }
    if(hours == 0 || hours == 24){
        hours = 12;
    }
    var regTime = hours + end;
    return regTime;
}
 

function createShifts(hoursPerDay, openTime, closeTime){ 
    if(openTime === null){
        return [];
    }
    openTime = convertTime2(openTime); 
    closeTime = convertTime2(closeTime); 
    closeTime = Number(closeTime);
    openTime = Number(openTime);
    hoursPerDay = Number(hoursPerDay);  
    var shifts = [];
    var busyStart = 1000; // 10am
    var busyEnd = 1900; // 7pm
    var morningStartSlow = openTime;
    var morningEndSlow = 1000;
    var nightStartSlow = 1900;
    var nightEndSlow = closeTime;
    var tempStart = openTime;
    var tempEnd = closeTime;
    var hoursForBusyTime = Math.round(hoursPerDay * 0.7);
    var hourForSlowTime = hoursPerDay - hoursForBusyTime; 
    var hoursForMorning = Math.round((hourForSlowTime/((busyStart/100-openTime/100)+(closeTime/100-busyEnd/100)))*(busyStart/100-openTime/100));
    var hoursForNight = hourForSlowTime-hoursForMorning;
    var temp = 800;
    var subM =busyStart-tempStart;
    var subMT = (tempStart+temp)-busyStart;
    while (hoursForMorning != 0){
        if((hoursForMorning*100-subM) >= 0 && (hoursForBusyTime - (subMT/100) >= 0)){
            shifts.push([tempStart, tempStart+temp]);
            hoursForMorning = hoursForMorning - (subM/100);
            hoursForBusyTime = hoursForBusyTime - (subMT/100); 
            hoursPerDay = hoursPerDay - (temp/100);
        }else if(hoursForBusyTime - (subMT/100) < 0){
            temp = temp -100;
        }else {
            tempStart = tempStart + 100;
        }
        subM =busyStart-tempStart;
        subMT = (tempStart+temp)-busyStart;
    }          

    temp = 800;
    var subN = tempEnd-busyEnd;
    var subNT = busyEnd-(tempEnd-temp);
    while (hoursForNight != 0){
        if((hoursForNight*100-subN) >= 0 && (hoursForBusyTime-(subNT/100) >= 0)){
            shifts.push([tempEnd-temp, tempEnd]);
            hoursForNight = hoursForNight - (subN/100);
            hoursForBusyTime = hoursForBusyTime - (subNT/100); 
        }else if(hoursForBusyTime-(subNT/100) < 0){
           temp = temp - 100;
        }else {
            tempEnd = tempEnd - 100;
        }
        subN =tempEnd-busyEnd;
        subNT = busyEnd-(tempEnd-temp);
    }

    var subB;
    var exHours = 0;
    while(hoursForBusyTime !=0){
        if(hoursForBusyTime >= 12){
            if (hoursForBusyTime-12 <= 4){
                exHours = Math.floor((hoursForBusyTime-12)/2);
                hoursForBusyTime = hoursForBusyTime - 12;
                shifts.push([busyStart, busyStart+600 + (exHours*100)]);
                shifts.push([busyEnd-(600+(exHours*100)), busyEnd]);
            }else{
                hoursForBusyTime = hoursForBusyTime - 12;
                shifts.push([busyStart, busyStart+600]);
                shifts.push([busyEnd-600, busyEnd]);
            }
        }else if(hoursForBusyTime >= 4 && hoursForBusyTime <= 8){
            shifts.push([busyStart+100, busyStart+100+(hoursForBusyTime*100)]);
            hoursForBusyTime = 0;
        }else if(hoursForBusyTime >= 8 && hoursForBusyTime <= 11){
            let tempBT = Math.floor(hoursForBusyTime/2);
            hoursForBusyTime = hoursForBusyTime - tempBT;
            shifts.push([busyStart+100, busyStart+100+(tempBT*100)]);
            shifts.push([busyEnd-100-(hoursForBusyTime*100), busyEnd-100]);
        }else {
            
            for (let i = shifts.length - 1; i >= 0 && hoursForBusyTime > 0; i--) {
                const len = shifts[i][1] - shifts[i][0];
                let addHours = 0;
                if (len < 600 && hoursForBusyTime >= 3) {
                    addHours = 3;
                } else if (len < 700 && hoursForBusyTime >= 2) {
                    addHours = 2;
                } else if (len < 800 && hoursForBusyTime >= 1) {
                    addHours = 1;
                }
                shifts[i][1] += addHours * 100;
                hoursForBusyTime -= addHours;
            }
            if (hoursForBusyTime <= 3 && shifts.every(shift => shift[1] - shift[0] === 800)) {
                var startTemp = shifts[shifts.length-1][0];
                shifts[shifts.length-1][0] = shifts[shifts.length-1][0]+400;
                shifts.push([startTemp, startTemp+400+(hoursForBusyTime*100)]);
                hoursForBusyTime = 0;
            }
        }
    }
    
    return shifts;
}
 