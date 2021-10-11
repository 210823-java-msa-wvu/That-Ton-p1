
var employeeInfo, current_rb;
var eid = localStorage.getItem("employeeID");
var currentPending;
employee();

document.getElementById("employee_name").innerHTML = "Welcome " + localStorage.getItem("username") + "!!!";

async function addForm(){
    let url = 'http://localhost:8080/TRMS/reimbursements';

    let eventType_input = document.getElementById("eventType").value;
    let location_input = document.getElementById("location").value;
    let description_input = document.getElementById("description").value;
    let start_time_input = document.getElementById("startTime").value;
    let end_time_input = document.getElementById("endTime").value;
    let gradingType_input = document.getElementById("gradingType").value;
    let grade_input = document.getElementById("grade").value;
    let cost_input = document.getElementById("cost").valueAsNumber;



    if(eventType_input == "UniversityCourses")
        current_rb = cost_input * 0.8;
    else if (eventType_input == "Seminars")
        current_rb = cost_input * 0.6;
    else if (eventType_input == "CertificationPrep")
        current_rb = cost_input * 0.75;
    else if (eventType_input == "Certification")
        current_rb = cost_input;
    else if (eventType_input == "TechnicalTraining")
        current_rb = cost_input * 0.9;
    else
        current_rb = cost_input * 0.3;

    if (current_rb >= employeeInfo.available)
        current_rb = employeeInfo.available;

    let newForm = {
        "employee": {"employee_id": eid},
        "event_type": eventType_input,
        "event_location": location_input,
        "event_description": description_input,
        "start_date": start_time_input,
        "end_date": end_time_input,
        "grade_type": gradingType_input,
        "grade": grade_input,
        "amount": current_rb,
        "sup_approval": "",
        "head_approval": "",
        "benco_approval": ""
    }

    console.log(newForm);

    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newForm),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    updateBalance();
    document.getElementById("evMessageBox").innerHTML = "Successfully submitted!";
    document.getElementById("newRequest").reset();
    employee();
}


function updateBalance(){

    let balance;
    let awarded = employeeInfo.awarded;
    let pending;

    pending = currentPending + current_rb;
    console.log("Pending = " + currentPending + " + " + current_rb);
    balance = 1000 - pending - awarded;
    console.log("Balance = " + "1000 - " + pending + " - " + awarded);

    console.log(employeeInfo);

    let xhttp = new XMLHttpRequest();
    let url = `http://localhost:8080/TRMS/employees/`;
    xhttp.open("PUT", url + eid, true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            console.log(this.responseText);

        }
    };

    var balance_update = {
        "employee_id": eid,
        "first_name": employeeInfo.first_name,
        "last_name": employeeInfo.last_name,
        "sup_name": employeeInfo.sup_name,
        "head_name": employeeInfo.head_name,
        "dept_id": employeeInfo.dept_id,
        "available": balance,
        "awarded": awarded,
        "pending": pending
    }

    console.log(balance_update);
    balance_update = JSON.stringify(balance_update);
    xhttp.send(balance_update);
}


function getMyBalance() {
    let xhttp = new XMLHttpRequest();
    let eid = localStorage.getItem("employeeID");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            let employeeJson = JSON.parse(this.responseText);
            document.getElementById("available_rb").innerHTML = "$" + employeeJson.available;
            document.getElementById("pending_rb").innerHTML = "$" + employeeJson.pending;
            document.getElementById("awarded_rb").innerHTML = "$" + employeeJson.awarded;
            document.getElementById("total_rb").innerHTML = "$" + (employeeJson.awarded + employeeJson.pending + employeeJson.available);
        }
    }

    let url = `http://localhost:8080/TRMS/employees/`

    //step 3
    xhttp.open("GET", url + eid, true);

    //step 4
    xhttp.send();

}


function getEmployeeRequests() {
    let url = 'http://localhost:8080/TRMS/reimbursements/';

    document.getElementById("evMessageBox").innerHTML = "";

    let eid = localStorage.getItem("employeeID");
    let un = localStorage.getItem("username");

    console.log("Get all reimbursement requests from username " + un);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 & this.status == 200) {
            // console.log(this.response)
            let requests = JSON.parse(this.responseText)
            console.log(requests);

            const tableRow = document.getElementById("tableRow")
            tableRow.innerHTML = "";
            let count = 1;
            requests.forEach(res => {

                const content = `
                    <tr>
                        <th scope="row">${res.id}</th>
                        <td>${res.employee.first_name + " " + res.employee.last_name}</td>
                        <td>${res.event_type}</td>
                        <td>${res.event_location}</td>
                        <td>${res.event_description}</td>
                        <td>${res.start_date}</td>
                        <td>${res.end_date}</td>
                        <td>${res.grade_type}</td>
                        <td>${res.grade}</td>
                        <td>${"$"+res.amount}</td>
                        <td>${res.sup_approval}</td>
                        <td>${res.head_approval}</td>
                        <td>${res.benco_approval}</td>
                    </tr>

                `
                tableRow.innerHTML += content;
                count += 1;
                if(res.benco_approval == "Approve") {
                    alert("Congratulation! Your request #" + res.id + " is approved!!!");
                }
            })
        }
    };

    xhr.open("GET", url + eid, true);
    xhr.send();
}


function employee() {
    let xhttp = new XMLHttpRequest();
    let eid = localStorage.getItem("employeeID");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            employeeInfo = JSON.parse(this.responseText);
            // console.log("Employees lists");
            console.log(employeeInfo);
            console.log(employeeInfo.available);
            currentPending = employeeInfo.pending
            console.log(currentPending);
        }
    }

    let url = `http://localhost:8080/TRMS/employees/`

    //step 3
    xhttp.open("GET", url + eid, true);

    //step 4
    xhttp.send();

}


function userLogout(){
    // Clear local storage
    localStorage.removeItem("username");
    localStorage.removeItem("userLoginObj");
    localStorage.removeItem("title");
    localStorage.removeItem("employeeID");
}