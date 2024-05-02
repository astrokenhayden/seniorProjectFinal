  function makeNewDate(date){
    let dateNew = ""; 
    const d = new Date(date); 
    const day = d.getDate(); 
    const month = d.getMonth(); 
    const year = d.getFullYear();
    dateNew = year + "-" + month + "-" + day;
    return new Date(dateNew);
  }
  fetch('/managementTimeOff').then(response => {
    if (!response.ok) {
      throw new Error('Network response was bad');
    }
    return response.json();
  }).then(data => {
    console.log(data);
    for (i in data) {
      let date = makeNewDate(data[i].date);
      if (data[i].approval === 1) {
        approvedList.push([data[i].email,data[i].date, data[i].reason]);
      } else if (data[i].approval === 0) {
        pendingList.push([data[i].email, data[i].date, data[i].reason]);
      } else if (data[i].approval === 3) {
        deniedList.push([data[i].email,data[i].date, data[i].reason]);
      }
    }
    //build all tables with bradley's build table response. This all needs to go into its own client.js file (how?)
    buildTable(pendingList, 'pendingg');
    buildTable(approvedList, 'approvedd');
    buildTable(deniedList, 'deniedd');
  }).catch(error => {
    console.error("Error: ", error);
  })
  var pendingList = [];
  var approvedList = [];
  var deniedList = [];
 ///removeTimeOff
  if (document.getElementById('pendingg')) {
    //moves to approved list and removes from pending
    function approveRequest(index) {
      var approvedRequest = pendingList[index];
      console.log(approvedRequest); 
      //use approveRequest to send fetch request
      fetch('/updateTimeOff', {
        method: 'POST',
        body: JSON.stringify({
          email: approvedRequest[0],
          date: approvedRequest[1],
          approval: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
        }).catch(error => console.error('Error:', error));

      approvedList.push(approvedRequest);
      pendingList.splice(index, 1);
      updateTable('pendingg', pendingList);
      updateTable('approvedd', approvedList);

    }

    //moves to denied list and removes from pending
    //Fetch response for updating on either of these requests 
    function denyRequest(index) {
      var denyRequest = pendingList[index];
      fetch('/updateTimeOff', {
        method: 'POST',
        body: JSON.stringify({
         email: denyRequest[0],
          date: denyRequest[1],
          approval: 3,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
        }).catch(error => console.error('Error:', error));
      deniedList.push(denyRequest);
      pendingList.splice(index, 1);
      updateTable('pendingg', pendingList);
      updateTable('deniedd', deniedList);
    }

    //deletes request from each list
    //Fetch response to remove from database in here 
    function deleteRequest(index, list) {
      var deleteRequest = list[index];

      fetch('/removeTimeOff', {
        method: 'POST',
        body: JSON.stringify({
          email: deleteRequest[0],
          date: deleteRequest[1],
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
        }).catch(error => console.error('Error:', error));

      list.splice(index, 1);
      if (list === approvedList) {
        updateTable('approvedd', approvedList);
      } else if (list === deniedList) {
        updateTable('deniedd', deniedList);
      }
      console.log(approvedList);
    }

    //moves request from pending to approved or denied list when clicked and makes delete button
    function updateTable(tableId, dataList) {
      var table = document.getElementById(tableId);
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      for (let i = 0; i < dataList.length; i++) {
        var row = table.insertRow(-1);
        for (var j = 0; j < dataList[i].length; j++) {
          var cell = row.insertCell(j);
          cell.textContent = dataList[i][j];
        }
        var moveTOR = row.insertCell(dataList[i].length);
        if (tableId === 'pendingg') {
          var approveButton = document.createElement('button');
          approveButton.textContent = 'Approve';
          approveButton.onclick = function () {
            approveRequest(i);
          };

          var denyButton = document.createElement('button');
          denyButton.textContent = 'Deny';
          denyButton.onclick = function () {
            denyRequest(i);
          };

          moveTOR.appendChild(approveButton);
          moveTOR.appendChild(denyButton);
        } else if (tableId === 'approvedd' || tableId === 'deniedd') {
          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.onclick = function () {
            if (tableId === 'approvedd') {
              deleteRequest(i, approvedList);
            } else {
              deleteRequest(i, deniedList);
            }
          };

          moveTOR.appendChild(deleteButton);
        }
      }
    }

    //builds the managers time off tables
    function buildTable(data, tableId) {
      var table = document.getElementById(tableId);
      for (let i = 0; i < data.length; i++) {
        var row = table.insertRow(-1);
        for (var j = 0; j < data[i].length; j++) {
          var cell = row.insertCell(j);
          cell.textContent = data[i][j];
        }

        var moveTOR = row.insertCell(data[i].length);
        if (tableId === 'pendingg') {
          var approveButton = document.createElement('button');
          approveButton.textContent = 'Approve';
          approveButton.onclick = function () {
            approveRequest(i);
          };
          var denyButton = document.createElement('button');
          denyButton.textContent = 'Deny';
          denyButton.onclick = function () {
            denyRequest(i);
          };
          moveTOR.appendChild(approveButton);
          moveTOR.appendChild(denyButton);
        } else if (tableId === 'approvedd' || tableId === 'deniedd') {
          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          if (tableId === 'approvedd') {
            deleteButton.onclick = function() { deleteRequest(i, approvedList); }
          } else {
            deleteButton.onclick =  function() { deleteRequest(i, deniedList); }
          }
          moveTOR.appendChild(deleteButton);
        }
      }
    }

    //calls the buildTable for each list
    buildTable(pendingList, 'pendingg');
    buildTable(approvedList, 'approvedd');
    buildTable(deniedList, 'deniedd');
  }    
