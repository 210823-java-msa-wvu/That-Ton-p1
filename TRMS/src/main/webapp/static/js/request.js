document.getElementById("employee_name").innerHTML = "Welcome " + localStorage.getItem("username") + "!!!";
var requests, employees, emp_id, updateAmount, change;
let title1 = localStorage.getItem("title");

if (title1 == "\"Benco\"") {
    document.getElementById("ben_co").style.display = 'block';
}

const idArray = [], empArray = [];
getRequests();
idList();
employeeList();


function getRequests() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            requests = JSON.parse(this.responseText)
            console.log("Reimbursement lists");
            console.log(requests);

            const tableRow = document.getElementById("tableRow")
            tableRow.innerHTML = "";
            requests.forEach(res => {
                idArray.push(res.id);

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
            })
        }
    }

    let url = `http://localhost:8080/TRMS/reimbursements`

    //step 3
    xhttp.open("GET", url, true);

    //step 4
    xhttp.send();

}


function makeDecision(){

    let rbID = document.getElementById("re_id").value;
    let decision = document.getElementById("decision").value;
    updateAmount = document.getElementById("cost").value;
    let managerDecision, bencoDecision, sup_ma_dec, sup_ben_dec, ma_ben_dec;


    managerDecision = decision;
    bencoDecision = decision;

    let title = localStorage.getItem("title");
    let index = idArray.indexOf(parseInt(rbID));

    emp_id = requests[index].employee.employee_id;
    if (updateAmount == '' || decision == "Reject")
        updateAmount = requests[index].amount;

    change = updateAmount - requests[index].amount;

    // Limit maximum reimbursement amount to available reimbursement
    if (change >= requests[index].employee.available) {
        updateAmount = requests[index].employee.available + requests[index].amount;
        change = requests[index].employee.available;
    }


    // Prevent Manager & BenCo update decision if Supervisor's decision is reject
    if (requests[index].sup_approval == "Reject" && (title == "\"Manager\"" || title == "\"Benco\"")){
        managerDecision = "";
        bencoDecision = "";
        alert("You can't approve reimbursement #" + rbID + " because it is rejected by Supervisor " + requests[index].employee.sup_name + "!");
    }

    // Prevent BenCo update decision if Manager's decision is reject
    if (requests[index].head_approval == "Reject" && title == "\"Benco\""){
        bencoDecision = "";
        alert("You can't approve reimbursement #" + rbID + " because it is rejected by Head of Department " + requests[index].employee.head_name + "!");
    }

    // If all 3 types of decision are approve, but Supervisor later changes the decision to reject, then remove decisions from Manager and BenCo
    if ((decision == "Reject") && (title == "\"Supervisor\"") && (requests[index].head_approval != "") && (requests[index].benco_approval != "")) {
        sup_ma_dec = "";
        sup_ben_dec= "";
        alert("Removed Manager & BenCo approvals from reimbursement #" + rbID + "!");
    }
    else {
        sup_ma_dec = requests[index].head_approval;
        sup_ben_dec = requests[index].benco_approval;
    }

    // If all 3 types of decision are approve, but Manager later changes the decision to reject, then remove decisions from BenCo
    if ((decision == "Reject") && (title == "\"Manager\"") && (requests[index].benco_approval != "")) {
        ma_ben_dec= "";
        alert("Removed BenCo approval from reimbursement #" + rbID + "!");
    }
    else {
        ma_ben_dec = requests[index].benco_approval;
    }

    // Prevent BenCo update decision if decisions from Supervisor and Manager are blank
    if ((requests[index].head_approval == "") && (requests[index].sup_approval == "") && (title == "\"Benco\"")) {
        bencoDecision = "";
        alert("Reimbursement #" + rbID + " must waiting for approval from Supervisor " + requests[index].employee.sup_name + " and Manager " + requests[index].employee.head_name + "!");
    }
    else if ((requests[index].head_approval == "" && requests[index].sup_approval != "Reject") && (title == "\"Benco\"")) {
        bencoDecision = "";
        alert("Reimbursement #" + rbID + " must waiting for approval from Manager " + requests[index].employee.head_name + "!");
    }

    // Prevent Manager update decision if decision from Supervisor is blank
    if ((requests[index].sup_approval == "") && (title == "\"Manager\"")) {
        managerDecision = "";
        alert("Reimbursement #" + rbID + " must waiting for approval from Supervisor " + requests[index].employee.sup_name + "!");
    }

    // Prevent BenCo update amount if request is already got 3 approvals
    if (decision == "Approve" && requests[index].head_approval == "Approve" && requests[index].sup_approval == "Approve" && requests[index].benco_approval == "Approve") {
        updateAmount = requests[index].amount;
        alert("You already approved reimbursement #" + rbID + "!")
    }


    let xhttp = new XMLHttpRequest();
    let url = `http://localhost:8080/TRMS/reimbursements/`;
    xhttp.open("PUT", url + rbID, true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            console.log(this.responseText);

        }
    };

    var sup_updatedRequest = {
        "id" : rbID,
        "employee": {
            "employee_id": requests[index].employee.employee_id
        },
        "event_type": requests[index].event_type,
        "event_location": requests[index].event_location,
        "event_description": requests[index].event_description,
        "start_date": requests[index].start_date,
        "end_date": requests[index].end_date,
        "grade_type": requests[index].grade_type,
        "grade": requests[index].grade,
        "amount": requests[index].amount,
        "sup_approval": decision,
        "head_approval": sup_ma_dec,
        "benco_approval": sup_ben_dec
    }

    var head_updatedRequest = {
        "id" : rbID,
        "employee": {
            "employee_id": requests[index].employee.employee_id
        },
        "event_type": requests[index].event_type,
        "event_location": requests[index].event_location,
        "event_description": requests[index].event_description,
        "start_date": requests[index].start_date,
        "end_date": requests[index].end_date,
        "grade_type": requests[index].grade_type,
        "grade": requests[index].grade,
        "amount": requests[index].amount,
        "sup_approval": requests[index].sup_approval,
        "head_approval": managerDecision,
        "benco_approval": ma_ben_dec
    }

    var benco_updatedRequest = {
        "id" : rbID,
        "employee": {
            "employee_id": requests[index].employee.employee_id
        },
        "event_type": requests[index].event_type,
        "event_location": requests[index].event_location,
        "event_description": requests[index].event_description,
        "start_date": requests[index].start_date,
        "end_date": requests[index].end_date,
        "grade_type": requests[index].grade_type,
        "grade": requests[index].grade,
        "amount": updateAmount,
        "sup_approval": requests[index].sup_approval,
        "head_approval": requests[index].head_approval,
        "benco_approval": bencoDecision
    }

    if (title == "\"Supervisor\"") {
        console.log(sup_updatedRequest);
        sup_updatedRequest = JSON.stringify(sup_updatedRequest);
        xhttp.send(sup_updatedRequest);
        console.log("Success!");
        alert("Reimbursement # " + rbID + " is updated!");
        location.reload();
    }
    else if (title == "\"Manager\"") {
        console.log(head_updatedRequest);
        head_updatedRequest = JSON.stringify(head_updatedRequest);
        xhttp.send(head_updatedRequest);
        console.log("Success!");
        alert("Reimbursement # " + rbID + " is updated!");
        location.reload();
    }
    else {
        console.log(benco_updatedRequest);
        benco_updatedRequest = JSON.stringify(benco_updatedRequest);
        xhttp.send(benco_updatedRequest);
        console.log("Success!");
        alert("Reimbursement # " + rbID + " is updated!");
        if (decision == "Approve" && requests[index].head_approval == "Approve" && requests[index].sup_approval == "Approve")
            updateBalance();
        //location.reload();
    }

}

function updateBalance(){
    updateAmount = parseFloat(updateAmount);
    console.log(empArray);
    let index = empArray.indexOf(parseInt(emp_id));
    let awarded = employees[index].awarded + updateAmount;
    console.log(typeof awarded);
    let pending = employees[index].pending + change - updateAmount;
    console.log("Pending = " + employees[index].pending + " + " + change + " - " + updateAmount);

    let balance = 1000 - awarded - pending;
    console.log("Balance = " + 1000 + " - " + awarded + " - " + pending)

    let xhttp = new XMLHttpRequest();
    let url = `http://localhost:8080/TRMS/employees/`;
    xhttp.open("PUT", url + emp_id, true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            console.log(this.responseText);

        }
    };

    var balance_update = {
        "employee_id": emp_id,
        "first_name": employees[index].first_name,
        "last_name": employees[index].last_name,
        "sup_name": employees[index].sup_name,
        "head_name": employees[index].head_name,
        "dept_id": employees[index].dept_id,
        "available": balance,
        "awarded": awarded,
        "pending": pending
    }

    console.log(balance_update);
    balance_update = JSON.stringify(balance_update);
    xhttp.send(balance_update);
}

function idList() {
    let url = 'http://localhost:8080/TRMS/reimbursements';

    let count = 0;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 & this.status == 200) {
            // console.log(this.response)
            let requests = JSON.parse(this.responseText)
            // console.log(requests);

            const tableRow = document.getElementById("re_id")
            tableRow.innerHTML = "";
            requests.forEach(res => {

                const content = `
                        <option>${res.id}</option>
                `
                tableRow.innerHTML += content;
                count += 1;
            })
        }
    };

    //step 3
    xhr.open("GET", url, true);

    //step 4
    xhr.send();

}

function employeeList() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            employees = JSON.parse(this.responseText);
            // console.log("Employees lists");
            // console.log(employees);

            employees.forEach(res => {
                empArray.push(res.employee_id);
            });
        }
    }

    let url = `http://localhost:8080/TRMS/employees`

    //step 3
    xhttp.open("GET", url, true);

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
