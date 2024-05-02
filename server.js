//Bradley Bossert && Kendra Hayden 

//Const variables for parsing, required libraries
const express = require('express'); 
const bcrypt = require('bcryptjs');
const session = require('express-session');
const mysql = require('mysql');
const bodyParser = require("body-parser");
var hbs = require('hbs');
const salt = bcrypt.genSaltSync(10);
const server = express(); 
hbs.registerPartials(__dirname + '/files', function (err) {});
server.set('view engine', 'hbs'); //to use hbs views -> help with a few issues

//Server Use 
server.use(bodyParser.urlencoded({extended: true}));4
server.use(bodyParser.json()); 
server.use(session({
    secret:"applesarebananas!",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}));

//Middleware Function to protect routes and not allow unathorized users to view it !! 
function reqLogin(req, res, next){
    if(!req.session.userEmail){
        return  res.render("response.hbs", {title: "General Error", type: "General Error", message: "You are not logged in!"});;
    }
    next(); 
}
function ifNull(val){
    if(val === ''){
        return null; 
    }
    else{
        return val;
    }
}
function gettingEmployeeTimeOff(req, res){
    const timeOff = "SELECT `date`, `approval`, `reason` FROM `timeOffRequests` WHERE email=?";
    var arrTimeOff = []; 
    connection.query(timeOff, [req.session.userEmail], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }
        if(resp.length > 0){

        for(col in resp){
           let curr = resp[col]; 
            if(curr.approval === 1){
                curr.approval = "Approved";
            }else{
                curr.approval = "Not Approved";
            }
            //TO DO CLEAN UP DATE
            var respObj = {date: curr.date, approval: curr.approval, reason: curr.reason}; 
            arrTimeOff.push(respObj); 
        }
    }
    }); 
    return arrTimeOff; 
}

function gettingAllDepts(req, res){
    var deptArray = []; 
    const getDept = "SELECT `deptName`, `deptID` FROM `deptList` WHERE domain = ?"; 
    connection.query(getDept, [req.session.domainName], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }
        if(resp.length > 0){
            for(col in resp){
                let curr = resp[col];
                var respObj = {deptName: curr.deptName, deptID: curr.deptID};
                deptArray.push(respObj);
            }
        }
    });
    return deptArray; 
}

function gettingEmployeeSchedule(req, res){
    const scheduleGrab = "SELECT `weekStart`, `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday` FROM `schedule` WHERE email = ?";
    let schedule = [];
    connection.query(scheduleGrab, [req.session.userEmail], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }
        if(resp.length > 0){
            for(col in resp){
                let curr = resp[col]; 
               let oby = {sunday: curr.sunday, monday: curr.monday, tuesday: curr.tuesday, wednesday: curr.wednesday, thursday: curr.thursday, friday: curr.friday, saturday: curr.saturday, sunday: curr.sunday, weekStart: curr.weekStart}
                schedule.push(oby); 
            }
        }
    });
    return schedule; 
}
 var connection = mysql.createConnection({
    host: "localhost",
    user: "password", //Not actual 
    password: "password", //Not actual
    database: "autoschedulingproject"
   });
  
   connection.connect(function(err) {
     if (err) throw err;
    console.log("Connected!");
   });



server.post("/addingDept", reqLogin, function(req, res){
    const {dept, deptCode, managerEmail} = req.body;
    const addDept = "INSERT INTO `deptList`(`deptName`, `deptID`, `domain`, `managerEmail`) VALUES (?,?,?,?)"; 
    connection.query(addDept, [dept, deptCode, req.session.domainName, managerEmail], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }
        return res.render("response.hbs", {title: "Added a new Dept", type: "Added a Dept",message: "You have added a new dept!"});
    });//query end
}); 
//Removing an Employee from the Database 
server.post("/removeEmployee", reqLogin, function(req, res) {
    console.log("recieved Post reuqest to remove employee"); 
    const {email, cdomain, fname, lname, dept} = req.body;
    const removeEmployeeDB = "DELETE FROM `userDB` WHERE email = ?"
    const removeEmployeeSchedule = "DELETE FROM `schedule` WHERE email = ?"
    const removeEmployeeEmployees = "DELETE FROM `employees` WHERE email = ?"
    connection.beginTransaction(function(error) {
        if (error) {
            throw error;
        }
        connection.query(removeEmployeeDB, [email], function(error, result) {
            if (error) {
                return connection.rollback(function() {
                    throw error;
                });
            }
            connection.query(removeEmployeeSchedule, [email], function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        throw error;
                    });
                }
            connection.query(removeEmployeeEmployees, [email], function(error, result) {
                if (error) {
                    return connection.rollback(function() {
                        throw error;
                    });
                }
                connection.commit(function(err) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    return res.render("response.hbs", { title: "Success", type: "Success", message: "You have removed an employee from the system!" });
                });
            });
        });
        });
    });
}); 

//Creating an employee
server.post("/createUser", function(req, res) { 
    console.log("Recieved Post request for createUser"); 
    //Getting values
    const { email, password, emptype, fname, lname, cdomain, dept, start, emphours } = req.body;
    
    //checking if employee already exists as a user
    //Assuming emails must be unique -> Don't need to check domain name 
    const checkEmail = "SELECT * FROM userDB WHERE email = ?";
    connection.query(checkEmail, [email], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }

        if (resp.length > 0) {
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }
    
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                console.error(err);
                return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
            }
            //Hash is now the password -> We need to insert 
            const insertNewEmployee = "INSERT INTO `employees`(`email`, `deptID`, `empType`, `empFullorPart`, `domain`, `startDate`) VALUES (?,?,?,?,?,?)";
            connection.query(insertNewEmployee, [email, dept, emptype, emphours, cdomain, start], function(err, resp) {
                if (err) {
                    console.error(err);
                    return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
                }

                const insertToUserDB = "INSERT INTO `userDB`(`email`, `password`, `acctType`, `fname`, `lname`, `domain`) VALUES (?,?,?,?,?,?)";
                connection.query(insertToUserDB, [email, hash, emptype, fname, lname, cdomain], function(err, resp) {
                    if (err) {
                        console.error(err);
                        return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."}); 
                    }
                    // Success message or any further action
                    res.render("response.hbs", {title: "Added Employee", type: "Success! ",message: "Employee was added successfully."});
                });
            });
        });
    });
});

//Creating a business 
server.post("/businessCreate", function(req, res){
    const { email, password, businessName, fname, lname, cdomain, productKey} = req.body;
    
    const checkEmail = "SELECT * FROM userDB WHERE email = ?";
    connection.query(checkEmail, [email], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }

        if (resp.length > 0) {
            return res.render("response.hbs", {title: "User already Created", type: "User already created",message: "There is already a business account with that email."});
        }
    
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                console.error(err);
                return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
            }
            //Hash is now the password -> We need to insert 
            const businessInsert = "INSERT INTO `businessList`(`domain`, `businessName`, `ownerEmail`, `productKey`) VALUES (?,?,?,?)"; 
            connection.query(businessInsert, [cdomain, businessName, email, productKey], function(err, resp) {
                if (err) {
                    console.error(err);
                    return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
                }

                const insertToUserDB = "INSERT INTO `userDB`(`email`, `password`, `acctType`, `fname`, `lname`,`domain`) VALUES (?,?,?,?,?,?)";
                connection.query(insertToUserDB, [email, hash, 0, fname, lname, cdomain], function(err, resp) { //acctType is always 0 as its a businessOwner account
                    if (err) {
                        console.error(err);
                        return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."}); 
                    }

                    // Success message or any further action
                    res.render("response.hbs", {title: "Added a new Business", type: "Success! ", message: "Business was created successfully. You may log in now."});
                });
                        });
        });
    });
}); 

server.get("/businessSignUp", function(req, res){
    res.render("businessCreation.hbs"); 
}); 
//Requesting Time off Employee Side
server.post("/requestTimeOffEmployee", function(req,res){
    const {startDate, reason} = req.body;
    const requestTimeOffQuery = "INSERT INTO `timeOffRequests`(`email`, `date`, `domain`, `deptid`, `reason`) VALUES (?,?,?,?,?)"; 
    connection.query(requestTimeOffQuery, [req.session.userEmail, startDate, req.session.domainName, req.session.deptid, reason], function(err, resp){
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
        return res.render("response.hbs", {title: "Submitted", type: "Submitted Time Off Request", message: "You have successfully submitted you time off request."});
    }); 
}); 
//FOR POST FETCH of the management time stuff
server.get("/managementTimeOffFnameLname", reqLogin, function(req, res){
    const timeOffALL = "SELECT `email`, `date` FROM `timeOffRequests` WHERE domain=? AND deptID = ? AND approval = 1";
    const employeeNames = "SELECT `fname`, `lname` FROM `userDB` WHERE email = ?";
    var arrTimeOff = []; 
   connection.query(timeOffALL, [req.session.domainName, req.session.deptid], function(err, resp) {
       if (err) {
           console.error(err);
           return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
       }
       if(resp.length > 0){
       var count = resp.length; 
        for(col in resp){
           let curr = resp[col];
           connection.query(employeeNames, [curr.email], function(err, resp2) {
            if (err) {
                console.error(err);
                return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
            }
            if(resp2.length > 0 ){
                let respObj = {fname: resp2[0].fname, lname: resp2[0].lname, date: curr.date}; 
                arrTimeOff.push(respObj);
            }
            count--;
            if(count === 0){
                console.log(arrTimeOff); 
                return res.json(arrTimeOff);
            } 
        }); 
        }
    }else{
        return res.json(arrTimeOff); 
    }
       
    }); 
}); 
server.get("/managementTimeOff", reqLogin, function(req, res){
    console.log("recieved request"); 
   const timeOffALL = "SELECT `email`, `date`, `approval`, `reason` FROM `timeOffRequests` WHERE domain=? AND deptID = ?";
   var arrTimeOff = []; 
   connection.query(timeOffALL, [req.session.domainName, req.session.deptid], function(err, resp) {
       if (err) {
           console.error(err);
           return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
       }
       if(resp.length > 0){
       
       for(col in resp){
          let curr = resp[col];
          
           let respObj = {email: curr.email, date: curr.date, approval: curr.approval, reason: curr.reason}; 
           arrTimeOff.push(respObj); 
       }
   }
   console.log(arrTimeOff); 
   return res.json(arrTimeOff);
   }); 
});
//Updating if it was approved or denied
function makeSQLDate(date){
     const dateObj = new Date(date); 
     return dateObj.toISOString().slice(0,10); 
}
server.post("/updateTimeOff", reqLogin, function(req, res){
    console.log("accessed update time off"); 
    const {email, date, approval} = req.body; 
    const updateTimeOff = "UPDATE `timeOffRequests` SET `approval`=?  WHERE email = ? AND date = ?"; 
    connection.query(updateTimeOff, [approval, email, makeSQLDate(date)], function(err, resp){
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
    });
});
server.post("/removeTimeOff", reqLogin, function(req, res){
    console.log("accessed removed time off"); 
    const {email, date} = req.body; 
    const deleteTimeOffQuery = "DELETE FROM `timeOffRequests` WHERE email = ? AND date = ?"; 
    connection.query(deleteTimeOffQuery, [email, makeSQLDate(date)], function(err, resp){
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
    });
}); 
server.get("/viewTimeOffManagement", reqLogin, function(req, res){
    res.render("managementTimeOff.hbs", {name: req.session.name, businessName: req.session.businessName}); 
}); 

server.get("/viewAvalibility", reqLogin, function(req, res){ //NEED TO FIX TO POPULATE THE ARRAYS WITH ACTUAL DATA
    const employeesOfManagement = "SELECT `email` FROM `employees` WHERE deptID = ? AND domain = ?"; 
    const employeesNameOfManagement = "SELECT `fname`, `lname` FROM `userDB` WHERE email = ?"; 
    var empArray = [];  
    connection.query(employeesOfManagement, [req.session.deptid, req.session.domainName], function(err, resp) { //checking for availibility first 
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
        if(resp.length > 0){
            var count = resp.length; 
        for(col in resp){
               let curr = resp[col];

        connection.query(employeesNameOfManagement, [curr.email], function(err, resp2) {
            if (err) {
                console.error(err);
                return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
            }
            if(resp2.length > 0){
                var employeeObject = {email: curr.email, lastName: resp2[0].lname, firstName: resp2[0].fname};
                empArray.push(employeeObject); 
            }
            count--;
            if(count === 0){
                //remove the managers email 
                var removeManager = empArray.findIndex(({email}) => email === req.session.userEmail);
                empArray.splice(removeManager, 1); 
                res.render("employeeAvailability.hbs", {employees: empArray, businessName: req.session.businessName, name: req.session.name}); 
            }
         }); //curr.email
        } 
    }//resp.length
    }); //Connection query EmployeesofManagement
});

server.post("/submitAvalibility", function(req, res){
    const {employeeName, sundayStart, sundayEnd, mondayStart, mondayEnd, tuesdayStart, tuesdayEnd,
        wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, SaturdayStart, SaturdayEnd, daysPerWeek} = req.body;
        //Need to make it so that if any of the values are '' then make them NULL ?
        var flag = false; 
        const checkEmployee = "SELECT * FROM `empavail` WHERE email = ?";
        const deleteEmployee = "DELETE FROM `empavail` WHERE email = ?";
        const inputEmployeeAvail = "INSERT INTO `empavail`( `domain`, `email`, `deptID`, `daysPerWeek`, `sundayStart`, `sundayEnd`, `mondayStart`, `mondayEnd`, `tuesdayStart`, `tuesdayEnd`, `wednesdayStart`, `wednesdayEnd`,  `thursdayStart`, `thursdayEnd`, `fridayStart`, `fridayEnd`, `saturdayStart`, `saturdayEnd`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
   //check FIRST if the employee already has a schedule out there, then remove then submit this. ?
    connection.query(checkEmployee, [employeeName], function(err, resp) { //checking for availibility first 
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
        if (resp.length > 0) {
            connection.query(deleteEmployee, [employeeName], function(err, resp) { //checking for availibility first 
                if (err) {
                    console.error(err);
                    return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
                }
            }); 
        }
    }); //No need to return or render a new view if these pass, just if the actual update of the db happens that the account holder wants to see
    connection.query(inputEmployeeAvail, [req.session.domainName, employeeName, req.session.deptid, daysPerWeek, ifNull(sundayStart), ifNull(sundayEnd), ifNull(mondayStart), ifNull(mondayEnd), ifNull(tuesdayStart), ifNull(tuesdayEnd),
        ifNull(wednesdayStart), ifNull(wednesdayEnd), ifNull(thursdayStart), ifNull(thursdayEnd), ifNull(fridayStart), ifNull(fridayEnd), ifNull(SaturdayStart), ifNull(SaturdayEnd)], function(err, resp) { //checking for availibility first 
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
            return res.render("response.hbs", {title: "Changed Employee Avail", type: "Changed Employee Avail",message: "You have successfully updated an employee availibility"});
    }); 
    
}); //END POST

server.post("/operationHours", function(req, res){
    const {sundayOpen, sundayClose, mondayOpen, mondayClose, tuesdayOpen, tuesdayClose, wednesdayOpen, wednesdayClose, thursdayOpen, thursdayClose, fridayOpen, fridayClose, saturdayOpen, saturdayClose} = req.body;
    const inputOperatingHours = "INSERT INTO `OperatingHours`( `domain`, `sundayOpen`, `sundayClose`, `mondayOpen`, `mondayClose`, `tuesdayOpen`, `tuesdayClose`, `wednesdayOpen`, `wednesdayClose`,  `thursdayOpen`, `thursdayClose`, `fridayOpen`, `fridayClose`, `saturdayOpen`, `saturdayClose`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
    const deleteTimeOffQuery = "DELETE FROM `OperatingHours` WHERE ?"; 
    connection.query(deleteTimeOffQuery, [req.session.domainName], function(err, resp){
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
    });
    connection.query(inputOperatingHours, [req.session.domainName, ifNull(sundayOpen), ifNull(sundayClose), ifNull(mondayOpen), ifNull(mondayClose), ifNull(tuesdayOpen), ifNull(tuesdayClose),
        ifNull(wednesdayOpen), ifNull(wednesdayClose), ifNull(thursdayOpen), ifNull(thursdayClose), ifNull(fridayOpen), ifNull(fridayClose), ifNull(saturdayOpen), ifNull(saturdayClose)], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
            return res.render("response.hbs", {title: "Changed Operating Hours", type: "Changed Operating Hours",message: "You have successfully updated the operating hours"});
    }); 

});
server.post("/setHoursPerDay", reqLogin, function(req, res){
    const { sundayDate, sunday, monday, tuesday, wednesday, thursday, friday, saturday } = req.body; 
    const setHours = "INSERT INTO hoursPerDay(domain, deptID, weekDate, sundayHours, mondayHours, tuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; 
    connection.query(setHours, [req.session.domainName, req.session.deptID, sundayDate, sunday, monday, tuesday, wednesday, thursday, friday, saturday], function(err, resp){
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
        res.render("success.hbs", {title: "Success", message: "Hours per day set successfully!"});
    });
});
server.post("/getHoursPerDay", reqLogin, function(req, res){
    const date = req.query.date;
    const getHours = "SELECT `sundayHours`, `mondayHours`, `tuesdayHours`, `wednesdayHours`, `thursdayHours`, `fridayHours`, `saturdayHours` FROM `hoursPerDay` WHERE domain = ? AND weekDate = ? "; 
    connection.query(getHours, [req.session.domainName, makeSQLDate(date)], function(err, resp){
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
        if(resp.length > 0){
            let respObj = {sundayHours: curr.sundayHours, mondayHours: curr.mondayHours, tuesdayHours: curr.tuesdayHours, wednesdayHours: curr.wednesdayHours, thursdayHours: curr.thursdayHours, fridayHours: curr.fridayHours, saturdayHours: curr.saturdayHours};
            console.log("hours" + respObj);
            return res.json(respObj);
        }
    });
}); 
server.get("/getOperatingTimes", reqLogin, function(req, res){
    const getOperatingTimes = "SELECT `sundayOpen`, `sundayClose`, `mondayOpen`, `mondayClose`, `tuesdayOpen`, `tuesdayClose`, `wednesdayOpen`, `wednesdayClose`, `thursdayOpen`, `thursdayClose`, `fridayOpen`, `fridayClose`, `saturdayOpen`, `saturdayClose` FROM `OperatingHours` WHERE domain = ?";
    var opArray = []; 
    connection.query(getOperatingTimes, [req.session.domainName], function(err, resp){
        if(err){
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
        }
        if(resp.length > 0){
            let curr = resp[0]; 
                 let respObj = {sundayOpen: curr.sundayOpen, sundayClose: curr.sundayClose, mondayOpen: curr.mondayOpen, mondayClose: curr.mondayClose, tuesdayOpen: curr.tuesdayOpen, tuesdayClose: curr.tuesdayClose, wednesdayOpen: curr.wednesdayOpen, wednesdayClose: curr.wednesdayClose, thursdayOpen: curr.thursdayOpen, thursdayClose: curr.thursdayClose, fridayOpen: curr.fridayOpen, fridayClose: curr.fridayClose, saturdayOpen: curr.saturdayOpen, saturdayClose: curr.saturdayClose}; 
                console.log(respObj); 
                    return res.json(respObj); 

        }
    });  
});

server.get("/getSchedule", reqLogin, (req, res) =>{
    res.render("Mschedule.hbs", {name: req.session.name, businessName: req.session.businessName});
}); 
//Empoyee availability for schedule(fetch)
//Not actually getting information from anywhere ? No table 
/**
 * var empData = [
    ["Bradley", "Bossert", 0, "2024-01-04", 5, 600, 600, 600, 600, 700, 1000, null, 2200, 20000, 20000, 1600, 1600, 1700, null],
 */
server.post("/postUserSchedule", reqLogin, (req,res) =>{
    const pushSchedule = "INSERT INTO `schedule`(`weekStart`, `domain`, `email`, `deptID`, `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"; 
    console.log(req.body); 
    for(i in req.body){
        connection.query(pushSchedule, [req.body[i].weekStart, req.session.domainName, req.body[i].email, req.session.deptid,req.body[i].sunday,req.body[i].monday,req.body[i].tuesday,req.body[i].wednesday, req.body[i].thursday,req.body[i].friday,req.body[i].saturday], function(err, resp){
            if (err) {
                console.error(err);
                return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
            }
        });
    }
});
server.get('/getEmployees', reqLogin, (req, res) => {
    var dataArray = [];
    const empData = "SELECT `email`, `daysPerWeek`, `sundayStart`, `sundayEnd`, `mondayStart`, `mondayEnd`, `tuesdayStart`, `tuesdayEnd`, `wednesdayStart`, `wednesdayEnd`, `thursdayStart`, `thursdayEnd`, `fridayStart`, `fridayEnd`, `saturdayStart`, `saturdayEnd` FROM `empavail` WHERE deptID = ? AND domain=?";
    const fNameLNameQuery = "SELECT `fname`, `lname` FROM `userDB` WHERE email = ?"; 
    const grabStartDateAndFullStatus = "SELECT `empFullorPart`, `startDate` FROM `employees` WHERE email = ?";
    connection.query(empData, [req.session.deptid, req.session.domainName], function(err, resp) {
        if (err) {
            console.error(err);
            return res.render("response.hbs", {title: "500 Error", type: "500 Error ",message: "The server malfunctioned."});
        }
        if(resp.length > 0){
            var count = resp.length; 
            for(col in resp){
                let curr = resp[col];
                connection.query(fNameLNameQuery, [curr.email], function(err, resp2){
                    if (err) {
                        console.error(err);
                        return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
                    }
                    if(resp2.length > 0)
                    {
                        connection.query(grabStartDateAndFullStatus, [curr.email], function(err, resp3){
                            if (err) {
                                console.error(err);
                                return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
                            }
                            if(resp2.length > 0)
                            {
                                let typeOfEmployment = 1;
                                if(resp3[0].empFullorPart === "full"){
                                        typeOfEmployment = 0;
                                }
                            var respObj = {email: curr.email, startDate: resp3[0].startDate, fullTime: typeOfEmployment, fname: resp2[0].fname, lname: resp2[0].lname, daysPerWeek: curr.daysPerWeek, monStart: curr.mondayStart, tueStart: curr.tuesdayStart, wedStart: curr.wednesdayEnd, thuStart: curr.thursdayStart, friStart: curr.fridayStart, satStart: curr.saturdayStart, sunStart: curr.sundayStart, monEnd: curr.mondayEnd, tueEnd: curr.tuesdayEnd, wedEnd: curr.wednesdayEnd, thuEnd: curr.thursdayEnd, friEnd: curr.fridayEnd, satEnd: curr.saturdayEnd, sundayEnd: curr.sundayEnd};
                            dataArray.push(respObj);
                            }
                    
                    count--;
                    if(count === 0){
                        console.log(dataArray);
                        return res.json(dataArray); 
                    }
                });
             }
            });
            }
        }
    });
});

server.get("/home", function(req, res){
    console.log("Recieve POST request to go home"); 
    //need to get the values for EMP Schedule Admin depts, management home stuff 
    switch (req.session.accountType) {
        case 1: //Management Account
            res.render("managementHome.hbs", { name: req.session.name, businessName: req.session.businessName }); 
            break;
        case 0: //Owner/Admin account
            let deptArr = gettingAllDepts(req, res); 
            res.render("adminHome.hbs", { name: req.session.name, deptList: deptArr, businessName: req.session.businessName }); 
            break;
        case 2: //Employee
            var empSchedule = gettingEmployeeSchedule(req,res);
            var arr = gettingEmployeeTimeOff(req, res); 
            res.render("employeeHome.hbs", { name: req.session.name, employeeSchedule: empSchedule, businessName: req.session.businessName, timeOff: arr}); 
            break;
        default: //Defaults to login screen if they are not logged in. 
            res.redirect("/"); 
            break; 
    }
}); 
    server.post("/login", function(req, res) {
        console.log("Recieved POST request for login"); 
        const {email, password} = req.body;
        const checkPass = "SELECT password FROM userDB WHERE email = ?";
        connection.query(checkPass, [email], function(err, resp) {
            if (err) {
                console.error(err);
                return res.render("response.hbs", {title: "500 Error", type: "500 Error! ",message: "Error was on behalf of the server. Sorry."});
            }
    
            if (resp.length === 0) {
                return  res.render("response.hbs", {title: "General Error", type: "General Error",message: "That was an incorrect email or password."});
            }
       
            const emp = resp[0]; 
            const passwordBcrypt = bcrypt.compareSync(password, emp.password); 
            if(passwordBcrypt){
                const grabInfo = "SELECT `email`, `acctType`, `fname`, `lname`, `domain` FROM `userDB` WHERE email = ?";
                connection.query(grabInfo, [email], function(err, resp) {
                    if (err) {
                        console.error(err);
                        return res.render("response.hbs", { title: "500 Error", type: "500 Error! ", message: "Error was on behalf of the server. Sorry." });
                    }
                    const emp = resp[0]; 
                
                        // Retrieve business name using the domain
                        const grabInfo2 = "SELECT `businessName` FROM `businessList` WHERE domain = ?";
                        connection.query(grabInfo2, [emp.domain], function(err, resp2) {
                            if (err) {
                                console.error(err);
                                return res.render("response.hbs", { title: "500 Error", type: "500 Error! ", message: "Error was on behalf of the server. Sorry." });
                            }
                            const emp2 = resp2[0]; 
                            const grabInfo3 = "SELECT `deptID` FROM `employees` WHERE email = ?";
                            connection.query(grabInfo3, [email], function(err, resp4) {
                                if (err) {
                                    console.error(err);
                                    return res.render("response.hbs", { title: "500 Error", type: "500 Error! ", message: "Error was on behalf of the server. Sorry." });
                                }
                                if(resp4.length > 0){
                                const employee = resp4[0]; 
                                req.session.deptid = employee.deptID; 
                        
                               
                           
                            req.session.userEmail = emp.email; 
                            req.session.name = emp.fname; 
                            req.session.accountType = emp.acctType; // 0 admin, 1 manager, 3 employee
                            req.session.domainName = emp.domain;
                            req.session.businessName = emp2.businessName;
                            req.session.deptid = employee.deptID; 
                            }else{
                                req.session.userEmail = emp.email; 
                                req.session.name = emp.fname; 
                                req.session.accountType = emp.acctType; // 0 admin, 1 manager, 3 employee
                                req.session.domainName = emp.domain;
                                req.session.businessName = emp2.businessName;
                                req.session.deptid = null; 
                            }
                            res.redirect("/home"); //This will send them to the right home
                        });
                        });
                    });
                //Sending them to the correct redirect nerd
            }else{
                return res.render("response.hbs", {title: "General Error", type: "General Error",message: "That was an incorrect email or password."});
            }
        }); //Ending connection query
        
            
    }); 
    //Logging out, need to destroy session 
   server.get("/loggout", function(req, res, next){
    console.log("Recieved GET request for logout");
    if(req.session.userEmail){
        req.session.destroy(function(){
            res.redirect('/'); 
        
        }); 
    } else {
        res.redirect('/');
    }
   }); 

server.get("/", function(req, res){
	res.render("index.hbs");
}); 
server.use(express.static("./pub")); 

server.listen(3000, function() {
	console.log("Server is now running on port 3000."); //This callback happens once the server is ready.
});
