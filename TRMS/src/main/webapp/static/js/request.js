document.getElementById("employee_name").innerHTML = "Welcome " + localStorage.getItem("username") + "!!!";
var requests;
let title1 = localStorage.getItem("title");

if (title1 == "\"Benco\"") {
    document.getElementById("ben_co").style.display = 'block';
}

const idArray = [];
getRequests();
idList();

function getRequests() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        console.log("Current Ready State: " + this.readyState);

        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            requests = JSON.parse(this.responseText)
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
    let updateAmount = document.getElementById("cost").value;
    let managerDecision, bencoDecision, sup_ma_dec, sup_ben_dec, ma_ben_dec;

    managerDecision = decision;
    bencoDecision = decision;

    let title = localStorage.getItem("title");
    let index = idArray.indexOf(parseInt(rbID));

    // Limit maximum reimbursement amount to 1000
    if (updateAmount > 1000)
        updateAmount = 1000;
    else if (updateAmount == '')
        updateAmount = requests[index].amount;

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
    else if ((requests[index].head_approval == "" && (requests[index].sup_approval != "Reject")) && (title == "\"Benco\"")) {
        bencoDecision = "";
        alert("Reimbursement #" + rbID + " must waiting for approval from Manager " + requests[index].employee.head_name + "!");
    }

    // Prevent Manager update decision if decisions from Supervisor are blank
    if ((requests[index].sup_approval == "") && (title == "\"Manager\"")) {
        bencoDecision = "";
        alert("Reimbursement #" + rbID + " must waiting for approval from Supervisor " + requests[index].employee.sup_name + "!");
    }

    console.log(idArray);
    console.log(index);
    console.log(requests[index]);

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

    var finalupdate;

    if (title == "\"Supervisor\"")
        finalupdate = sup_updatedRequest;
    else if (title == "\"Manager\"")
        finalupdate = head_updatedRequest;
    else
        finalupdate = benco_updatedRequest;


    console.log(finalupdate);
    finalupdate = JSON.stringify(finalupdate);
    xhttp.send(finalupdate);
    console.log("Success!");
    // alert("Reimbursement # " + rbID + " is updated!");
    location.reload();
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
        console.log(count);
    };

    //step 3
    xhr.open("GET", url, true);

    //step 4
    xhr.send();

}



function userLogout(){
    // Clear local storage
    localStorage.removeItem("username");
    localStorage.removeItem("userLoginObj");
    localStorage.removeItem("title");
    localStorage.removeItem("employeeID");
}
