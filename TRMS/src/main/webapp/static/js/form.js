async function addForm(){
    let url = 'http://localhost:8080/TRMS/reimbursements';

    let userurl = 'http://localhost:8080/TRMS/users';

    let eventType_input = document.getElementById("eventType").value;
    let location_input = document.getElementById("location").value;
    let description_input = document.getElementById("description").value;
    let start_time_input = document.getElementById("startTime").value;
    let end_time_input = document.getElementById("endTime").value;
    let gradingType_input = document.getElementById("gradingType").value;
    let grade_input = document.getElementById("grade").value;
    let cost_input = document.getElementById("cost").valueAsNumber;

    if(eventType_input == "UniversityCourses")
        cost_input = cost_input * 0.8;
    else if (eventType_input == "Seminars")
        cost_input = cost_input * 0.6;
    else if (eventType_input == "CertificationPrep")
        cost_input = cost_input * 0.75;
    else if (eventType_input == "Certification")
        cost_input = cost_input;
    else if (eventType_input == "TechnicalTraining")
        cost_input = cost_input * 0.9;
    else
        cost_input = cost_input * 0.3;

    if (cost_input > 1000)
        cost_input = 1000;

    let newForm;
    let userres = await fetch(userurl)
    let userdata = await userres.json()

        .then(userdata => {
                newForm = {
                "employee" : {"employee_id" : userdata.employee_id},
                "event_type" : eventType_input,
                "event_location" : location_input,
                "event_description" : description_input,
                "start_date" : start_time_input,
                "end_date" : end_time_input,
                "grade_type" : gradingType_input,
                "grade" : grade_input,
                "amount" : cost_input,
                "sup_approval" : false,
                "head_approval" : false,
                "benco_approval" : false
            }
        })
        .catch(err => console.log(err));

    console.log(newForm);

    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newForm),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// function getForm() {
//
//     let userurl = 'http://localhost:8080/TRMS/users';
//
//     let xhttp = new XMLHttpRequest();
//
//     xhttp.onreadystatechange = function () {
//         console.log("Current Ready State: " + this.readyState);
//
//         if (this.readyState == 4 && this.status == 200) {
//             //We have a successful and completed request and can now process the response.
//             console.log("Successful Call");
//
//             console.log(this.responseText);
//             let eventJson = JSON.parse(this.responseText);
//
//             console.log(eventJson);
//             //Inputting data into table
//             document.getElementById("reimbursementid").innerHTML = eventJson.id;
//             document.getElementById("employeeId").innerHTML = eventJson.employee_id;
//             document.getElementById("eventTypeTable").innerHTML = eventJson.event_type;
//             document.getElementById("locationTable").innerHTML = eventJson.event_location;
//             document.getElementById("descriptionTable").innerHTML = eventJson.event_description;
//             document.getElementById("startDate").innerHTML = eventJson.start_date;
//             document.getElementById("endDate").innerHTML = eventJson.end_date;
//             document.getElementById("gradeType").innerHTML = eventJson.grade_type;
//             document.getElementById("gradeTable").innerHTML = eventJson.grade;
//             document.getElementById("reimbursementAmount").innerHTML = "$" + eventJson.amount;
//             document.getElementById("supApproval").innerHTML = eventJson.sup_approval;
//             document.getElementById("headApproval").innerHTML = eventJson.head_approval;
//             document.getElementById("bencoApproval").innerHTML = eventJson.benco_approval;
//         }
//     }
//
//     let eventId = document.getElementById("EventIdInput").value;
//
//     let url = `http://localhost:8080/TRMS/reimbursements/` + eventId;
//
//     //step 3
//     xhttp.open("GET", url, true);
//
//     //step 4
//     xhttp.send();
//
// }

async function getEmployeeRequests() {
    let url = 'http://localhost:8080/TRMS/reimbursements/';

    let userurl = 'http://localhost:8080/TRMS/users';

    let eid, un;
    let userres = await fetch(userurl)
    let userdata = await userres.json()

        .then(userdata => {
            eid = userdata.employee_id;
            un = userdata.username;
        })
        .catch(err => console.log(err));

    console.log("Get all reimbursement requests from username " + un);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 & this.status == 200) {
            // console.log(this.response)
            let requests = JSON.parse(this.responseText)
            console.log(requests);

            if (this.responseText == "[]" || this.responseText == "{}") {
                document.getElementById("success").innerHTML = "No Requests to list"

            }

            const tableRow = document.getElementById("tableRow")
            tableRow.innerHTML = "";
            let count = 1;
            requests.forEach(res => {

                const content = `
                    <tr>
                        <th scope="row">${count}</th>
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
            })
        }
    };

    xhr.open("GET", url + eid, true);
    xhr.send();
}

// async function populateUsername() {
//     let url = 'http://localhost:8080/TRMS/users';
//
//     let res = await fetch(url)
//     let data = await res.json()
//
//         .then(data => {
//             document.getElementById("employee_name").innerHTML = "Welcome " + data.username + "!!!";
//         })
//         .catch(err => console.log(err));
//
// }
//
// populateUsername();

document.getElementById("employee_name").innerHTML = "Welcome " + localStorage.getItem("username") + "!!!";
